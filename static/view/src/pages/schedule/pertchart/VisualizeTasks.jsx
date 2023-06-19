import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PertChart from "./PertChart";
import TaskDetail from "./TaskDetail";
import VisualizePageHeader from "./VisualizePageHeader";

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function VisualizeTasksPage() {
	let navigate = useNavigate();
	return (
		<div style={{width: "100%"}}>
            <VisualizePageHeader title="Visualize Tasks"/>
            <PertChart />
            <TaskDetail />
		</div>
	);
}

export default VisualizeTasksPage;
