// @ts-nocheck
import React, { useEffect, useState } from "react";
import { invoke, router, view } from "@forge/bridge";
import { Route, Router, Routes } from "react-router";
import ProjectFromNetPage from "./pages/ProjectFromNetPage";

import { LeftSidebar, Main, PageLayout, Content } from "@atlaskit/page-layout";
import HomeSideBar from "./components/side-nav/HomeSideBar";
import ProjectListHome from "./pages/resources/projects/ProjectsListHome";
import AppFrame from "./components/common/AppFrame";

function App() {
  // Enable auto change theme Dark/light mode within Jira
  view.theme.enable();

  const [history, setHistory] = useState();
  const [historyState, setHistoryState] = useState();

  /**
   * @param {string} authenUrl
   */
  async function handleAuthenOAuth(authenUrl) {
    await router.open(authenUrl);
  }

  // Check authenticate every time reload page
  useEffect(function () {
    invoke("getAuthenUrl").then(function (res) {
      if (!res.isAuthenticated) {
        handleAuthenOAuth(res.authenUrl);
      }
    });
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
                  <Route path="/*" element={<HomeSideBar />}></Route>
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
                    path="/projects"
                    element={<ProjectFromNetPage />}
                  ></Route>
                </Routes>
              </Router>
            </AppFrame>
          </Main>
        </Content>
      ) : (
        "Loading..."
      )}
    </PageLayout>
  );
}

export default App;
