import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ScheduleTabs from "./ScheduleTabs";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function SchedulePage() {
	let navigate = useNavigate();
	let {project} = useParams();

	
	project;

	return (<ScheduleTabs/>);
}

export default SchedulePage;
