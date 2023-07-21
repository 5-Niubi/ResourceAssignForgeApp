import { events, invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TabsDefaultExample from "./ResourceTabs";
import ResourceTabs from "./ResourceTabs";
import WorkforcePageHeader from "./workforces/WorkforcePageHeader";
import WorkforceDynamicTable from "./workforces/WorkforceDynamicTable";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function ResourcesPage() {
	let navigate = useNavigate();
	return (
		<>
			<div style={{ width: "100%" }}>
				<WorkforcePageHeader></WorkforcePageHeader>
				<WorkforceDynamicTable></WorkforceDynamicTable>
			</div>
		</>
	);
}

export default ResourcesPage;
