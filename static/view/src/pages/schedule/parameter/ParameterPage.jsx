import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import __noop from "@atlaskit/ds-lib/noop";
import ParameterPageHeader from "./ParameterPageHeader";
import ParameterDynamicTable from "./ParameterDynamicTable";
import ParameterWorkforceList from "./ParameterWorkforceList";
import ParameterObjectInput from "./ParameterObjectInput";
import ParameterEstimateMessage from "./ParameterEstimateMessage";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function ParameterPage() {
	let navigate = useNavigate();
	return (
		<div style={{width:"100%"}}>
			<ParameterPageHeader name={"Resource Estimation"}></ParameterPageHeader>
			<ParameterEstimateMessage></ParameterEstimateMessage>
			<ParameterWorkforceList></ParameterWorkforceList>
			<ParameterPageHeader name={"Parameter"}></ParameterPageHeader>
			<ParameterObjectInput></ParameterObjectInput>
		</div>
	);
}

export default ParameterPage;
