import React, { useEffect, useState } from "react";
import { invoke, router, view } from "@forge/bridge";

function App() {
  // Enable auto change theme Dark/light mode within Jira
  view.theme.enable();

  const [data, setData] = useState("");

  useEffect(() => {

    invoke("setContextToGlobal").then();
    invoke("getText", { example: "my-invoke-variable" }).then((res) => {
      setData(JSON.stringify(res));
    });
  }, []);

  return (
    <div>
      <div>
        <h1>{data ? data : "Loading..."}</h1>
      </div>
    </div>
  );
}

export default App;
