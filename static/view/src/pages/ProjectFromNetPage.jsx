import { invoke } from "@forge/bridge";
import React, { useEffect, useState } from "react";

/**
 * Using as Demo
 * @returns {import("react").ReactElement}
 */
function ProjectFromNetPage() {
  const [project, setProject] = useState("");
  useEffect(function () {
    invoke("getProjectFromNet").then(function (res) {
      setProject(JSON.stringify(res));
    });
  }, []);
  
  return (
    <>
      <h1>Project: </h1>
      <div>{project ? project : "Loading..."}</div>
    </>
  );
}

export default ProjectFromNetPage;
