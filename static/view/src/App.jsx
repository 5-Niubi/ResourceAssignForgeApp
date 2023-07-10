// @ts-nocheck
import React, { useEffect, useState } from "react";
import { invoke, router, view } from "@forge/bridge";
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
import { ToastContainer } from "react-toastify";
import TestModal from "./pages/TestModal";
import EstimationPage from "./pages/schedule/estimation";

function App() {
	// Enable auto change theme Dark/light mode within Jira
	view.theme.enable();

	const [history, setHistory] = useState();
	const [historyState, setHistoryState] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	// Check authenticate every time reload page
	useEffect(function () {
		// invoke("getIsAuthenticated").then(function (res) {
		// 	if (!res.isAuthenticated) {
		// 		setIsAuthenticated(false);
		// 	}
		// });
	}, []);

	// // Set this app context to storage
	useEffect(() => {
		invoke("setContextToGlobal").then().catch();
	}, []);

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
												element={
													<HomeSideBar rootPath="/" />
												}
											>
												<Route></Route>
												<Route
													path="/projects"
													element={
														<HomeSideBar rootPath="/" />
													}
												></Route>
												<Route
													path="/resources"
													element={
														<HomeSideBar rootPath="/" />
													}
												></Route>
												<Route
													path="/settings"
													element={
														<HomeSideBar rootPath="/" />
													}
												></Route>
											</Route>
											<Route
												path="/:projectId/*"
												element={
													<ProjectSideBar rootPath="/:project/" />
												}
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
											<Route
												path="/"
												element={<ProjectListHome />}
											></Route>
											<Route
												path="/startup"
												element={<StartUpPage />}
											></Route>

											<Route
												path="/resources"
												element={<ResourcesPage />}
											></Route>
											<Route
												path="/settings"
												element={<div>Settings</div>}
											></Route>
											<Route
												path="/modals"
												element={<TestModal/>}
											></Route>

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
													element={
														<div>Tasks Page of</div>
													}
												></Route>
												<Route
													path="reports"
													element={
														<div>Reporsts Page</div>
													}
												></Route>
											</Route>
										</Routes>
									</Router>
								</AppFrame>
							</Main>
						</Content>
					) : (
						<Spinner interactionName="load" />
					)}
				</PageLayout>
			) : (
				<StartUpPage />
			)}
			<ToastContainer />
		</>
	);
}

export default App;
