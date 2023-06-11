// @ts-nocheck
import React, { useEffect, useState } from "react";
import { invoke, router, view } from "@forge/bridge";
import HomePage from "./pages/HomePage";
import { Route, Router, Routes, useNavigate } from "react-router";
import ProjectFromNetPage from "./pages/ProjectFromNetPage";

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

  // Set this app context to storage
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
    <div>
      {history && historyState ? (
        <Router
          navigator={history}
          navigationType={historyState.action}
          location={historyState.location}
        >
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/projects" element={<ProjectFromNetPage />}></Route>
          </Routes>
        </Router>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
