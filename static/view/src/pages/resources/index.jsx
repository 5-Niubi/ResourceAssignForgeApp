import { events, invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TabsDefaultExample from "./ResourceTabs";
import ResourceTabs from "./ResourceTabs";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function ResourcesPage() {
	let navigate = useNavigate();
	return (
		<>
			<ResourceTabs></ResourceTabs>
		</>
	);
}

export default ResourcesPage;
