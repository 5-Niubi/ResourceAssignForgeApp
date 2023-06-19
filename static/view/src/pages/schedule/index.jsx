import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ScheduleTabs from "./ScheduleTabs";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function SchedulePage() {
	let navigate = useNavigate();
	return (<ScheduleTabs/>);
}

export default SchedulePage;
