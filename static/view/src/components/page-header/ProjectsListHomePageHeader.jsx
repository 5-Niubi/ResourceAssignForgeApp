import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import Select from "@atlaskit/select";
import TextField from "@atlaskit/textfield";
import React from "react";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";

const barContent = (
  <div style={{ display: "flex" }}>
    <div style={{ flex: "0 0 200px" }}>
      <TextField isCompact placeholder="Filter" aria-label="Filter" />
    </div>
    <div style={{ flex: "0 0 200px", marginLeft: token("space.100", "8px") }}>
      <Select
        spacing="compact"
        placeholder="Choose an option"
        aria-label="Choose an option"
      />
    </div>
  </div>
);
function ProjecstListHomePageHeader() {
  return (
    <PageHeader bottomBar={barContent}>
      <Heading level="h900">Choose Your Project To Start</Heading>
      <Heading level="h600">Only Jira Software Project</Heading>
    </PageHeader>
  );
}

export default ProjecstListHomePageHeader;
