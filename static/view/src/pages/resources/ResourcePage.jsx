import React, { useEffect, useState } from "react";
import ResourceWorkforceTable from "./ResourceWorkforceTable";
import __noop from "@atlaskit/ds-lib/noop";
import "./style.css";

function ResourcesPage() {
	return (
		<>
			<ResourceWorkforceTable></ResourceWorkforceTable>
		</>
	);
}

export default ResourcesPage;
