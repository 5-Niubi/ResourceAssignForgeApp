import React, { useEffect, useState } from "react";
import { invoke, router, view } from "@forge/bridge";
import { HomePage } from "./pages/HomePage";

function App() {
  // Enable auto change theme Dark/light mode within Jira
  view.theme.enable();
  useEffect(() => {
    invoke("setContextToGlobal").then().catch();
  }, []);

  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
