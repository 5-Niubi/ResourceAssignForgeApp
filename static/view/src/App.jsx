// @ts-nocheck
import React, { createContext, useEffect, useState } from "react";
import { invoke, view } from "@forge/bridge";
import { Route, Router, Routes, useNavigate } from "react-router";
import { LeftSidebar, Main, PageLayout, Content } from "@atlaskit/page-layout";
import HomeSideBar from "./components/side-nav/HomeSideBar";
import ProjectListHome from "./pages/projects/ProjectsListHome";
import AppFrame from "./components/common/AppFrame";
import SchedulePage from "./pages/schedule";
import ResourcesPage from "./pages/resources";
import ProjectSideBar from "./components/side-nav/ProjectSideBar";
import Spinner from "@atlaskit/spinner";
import StartUpPage from "./pages/startup/StartUpPage";
import { ToastContainer, toast } from "react-toastify";
import TestModal from "./pages/TestModal";
import EstimationPage from "./pages/schedule/estimation";
import LoadingModalWithThread from "./components/LoadingModalWithThread";
import { STORAGE, THREAD_STATE_DEFAULT } from "./common/contants";
import Toastify from "./common/Toastify";
import MorePage from "./pages/more";
import { useEffectOnlyOnUpdate } from "./common/effects";

export const ThreadLoadingContext = createContext({ state: [] });
export const AppContext = createContext({
	subscription: {},
});

function App() {
	// Enable auto change theme Dark/light mode within Jira
	view.theme.enable();

	const [history, setHistory] = useState();
	const [historyState, setHistoryState] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const threadState = useState(THREAD_STATE_DEFAULT);
	const [threadStateValue, setThreadStateValue] = threadState;
	const [appContextState, setAppContextState] = useState({});
	// Check authenticate every time reload page
	useEffect(function () {
		invoke("getIsAuthenticated").then(function (res) {
			if (res.isAuthenticated) {
				getSubscription();
				getThreadStateInfo();
			} else {
				setIsAuthenticated(false);
			}
		});
	}, []);

	function getSubscription() {
		invoke("getCurrentSubscriptionPlan")
			.then(function (res) {
				console.log(res);
				setAppContextState((prev) => ({ ...prev, subscription: res }));
			})
			.catch(() => {});
	}

	function getThreadStateInfo() {
		let threadInfoRaw = localStorage.getItem(STORAGE.THREAD_INFO);
		let threadInfo = JSON.parse(threadInfoRaw);
		if (threadInfo) {
			setThreadStateValue({
				threadId: threadInfo.threadId,
				threadAction: threadInfo.threadAction,
				isModalOpen: true,
			});
		}
		invoke("getThreadStateInfo")
			.then(function (res) {
				console.log(res);
				setThreadStateValue({
					threadId: res[0].threadId,
					threadAction: res[0].threadAction,
					isModalOpen: true,
				});
			})
			.catch((error) => {
				Toastify.error(error);
			});
	}

	// --- Config React Router ---
	useEffect(() => {
		view.createHistory().then((newHistory) => {
			setHistory(newHistory);
		});
	}, []);

	useEffect(() => {
		if (!historyState && history) {
			setHistoryState({
				action: history.action,
				location: history.location,
			});
		}
	}, [history, historyState]);

	useEffect(() => {
		if (history) {
			history.listen((location, action) => {
				setHistoryState({
					action,
					location,
				});
			});
		}
	}, [history]);
	// --- / ---
	return (
		<>
			{isAuthenticated ? (
				<AppContext.Provider value={appContextState}>
					<ThreadLoadingContext.Provider value={{ state: threadState }}>
						<PageLayout>
							{history && historyState ? (
								<Content>
									<LeftSidebar>
										<div style={{ height: "100vh" }}>
											<Router
												navigator={history}
												navigationType={historyState.action}
												location={historyState.location}
											>
												<Routes>
													{/* Path with * take effect in all route after current */}
													<Route
														path="/"
														element={<HomeSideBar rootPath="/" />}
													>
														<Route></Route>
														<Route
															path="/projects"
															element={<HomeSideBar rootPath="/" />}
														></Route>
														<Route
															path="/resources"
															element={<HomeSideBar rootPath="/" />}
														></Route>
														<Route
															path="/skills"
															element={<HomeSideBar rootPath="/" />}
														></Route>
														<Route
															path="/more"
															element={<HomeSideBar rootPath="/" />}
														></Route>
													</Route>
													<Route
														path="/:projectId/*"
														element={<ProjectSideBar rootPath="/:projectId/" />}
													></Route>
												</Routes>
											</Router>
										</div>
									</LeftSidebar>
									<Main testId="main" id="main">
										<AppFrame>
											<Router
												navigator={history}
												navigationType={historyState.action}
												location={historyState.location}
											>
												<Routes>
													<Route path="/" element={<ProjectListHome />}></Route>
													<Route
														path="/startup"
														element={<StartUpPage />}
													></Route>

													<Route
														path="/resources"
														element={<ResourcesPage />}
													></Route>
													<Route
														path="/skills"
														element={<div>Skills</div>}
													></Route>
													<Route path="/more" element={<MorePage />}></Route>
													<Route path="/modals" element={<TestModal />}></Route>

													<Route path="/:projectId">
														<Route path="" element={<SchedulePage />}></Route>
														<Route
															path="estimation"
															element={<EstimationPage />}
														></Route>
														<Route
															path="schedule"
															element={<SchedulePage />}
														></Route>
														<Route
															path="tasks"
															element={<div>Tasks Page of</div>}
														></Route>
														<Route
															path="reports"
															element={<div>Reporsts Page</div>}
														></Route>
													</Route>
												</Routes>
												{threadStateValue.isModalOpen ? (
													<LoadingModalWithThread state={threadState} />
												) : (
													""
												)}
											</Router>
										</AppFrame>
									</Main>
								</Content>
							) : (
								<Spinner interactionName="load" />
							)}
						</PageLayout>
					</ThreadLoadingContext.Provider>
				</AppContext.Provider>
			) : (
				<>
					<StartUpPage />
				</>
			)}
			<ToastContainer />
		</>
	);
}

export default App;
