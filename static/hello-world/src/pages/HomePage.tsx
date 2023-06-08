import Button from "@atlaskit/button";
import { invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";

function HomePage() {
  let [url, setUrl] = useState("");
  async function handleBtnAuthen() {
    let context = view.getContext();
    let response: string = await invoke("getAuthenUrl", { context });
    let authenUrl = response;
    setUrl(authenUrl);
    btoa("");
    await router.navigate(authenUrl);
  }
  return (
    <>
      <div>URL: {url}</div>
      <Button onClick={handleBtnAuthen} appearance="primary">
        Grant Access
      </Button>
    </>
  );
}

export { HomePage };
