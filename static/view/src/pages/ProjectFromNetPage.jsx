import Button from "@atlaskit/button";
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
      setProject(JSON.stringify(res, null, 2));
    });
  }, []);

  return (
    <>
      <h1>Project: </h1>
      <div>
        <pre>{project ? project : "Loading..."}</pre>
      </div>
    </>
  );
}

export default ProjectFromNetPage;
