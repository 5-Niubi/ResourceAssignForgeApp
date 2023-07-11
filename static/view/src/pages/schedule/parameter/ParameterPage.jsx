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
		<>
			<ParameterPageHeader></ParameterPageHeader>
			<ParameterEstimateMessage></ParameterEstimateMessage>
			<ParameterWorkforceList></ParameterWorkforceList>
			<ParameterObjectInput></ParameterObjectInput>
		</>
	);
}

export default ParameterPage;
