import { events, invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ResourceWorkforceTable from "./ResourceWorkforceTable";
import __noop from "@atlaskit/ds-lib/noop";
import Select from "@atlaskit/select";
import TextField from "@atlaskit/textfield";
import { token } from "@atlaskit/tokens";
import PageHeader from "@atlaskit/page-header";
import InfoMessageColor from "../../components/InfoMessageColor";


function ResourcesPage() {

	const barContent = (
		<div style={{ display: "flex" }}>
			<div style={{ flex: "0 0 200px" }}>
				<TextField
					isCompact
					placeholder="Search Human Name/Key"
					aria-label="Filter"
				/>
			</div>
			<div
				style={{
					flex: "0 0 200px",
					marginLeft: token("space.100", "8px"),
				}}
			>
				<Select
					spacing="compact"
					placeholder="Choices"
					aria-label="Choose an option"
				/>
			</div>
			<div
				style={{
					flex: "0 0 200px",
					paddingTop: "5px",
					paddingLeft: "5px",
				}}
			>
			</div>
		</div>
	);

	return (
		<>
			<PageHeader bottomBar={barContent}>Employee List <InfoMessageColor /></PageHeader>
			<ResourceWorkforceTable></ResourceWorkforceTable>
		</>
	);
}

export default ResourcesPage;
