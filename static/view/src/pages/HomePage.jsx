import { events, invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import Link from "../components/Link";
import { useNavigate } from "react-router";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function HomePage() {
  let [url, setUrl] = useState("");
  let navigate = useNavigate();

  async function handleBtnAuthen() {
    let context = view.getContext();
    let response = await invoke("getAuthenUrl", { context });
    let authenUrl = response.authenUrl;
    setUrl(JSON.stringify(response));
    await router.open(authenUrl);
  }

  return (
    <>
      <div>URL: {url}</div>
      <Button onClick={handleBtnAuthen} appearance="primary">
        Grant Access
      </Button>
      <div>
        {" "}
        <Link to="/projects">Get Project From Jira Throught .Net</Link>
      </div>
      <Button onClick={() => navigate("/projects")}>
        Link to Get Project (Same to URL above)
      </Button>
    </>
  );
}

export default HomePage;
