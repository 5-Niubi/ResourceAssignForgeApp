import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PertChart from "./PertChart";
import TaskDetail from "./TaskDetail";
import VisualizePageHeader from "./VisualizePageHeader";
import { Field, Label } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import PertChart2 from "./PertChart2";

const startDate = (
	<div>
		<Label>Start date: </Label>
		<DatePicker />
	</div>
);

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function VisualizeTasksPage() {
    const [currentTask, setCurrentTask] = useState(null);

    const updateCurrentTask = (task) => {
        setCurrentTask(task);
    };

	return (
		<div style={{width: "100%"}}>
            <VisualizePageHeader title="Visualize Tasks"/>
            {startDate}
            <PertChart2 updateCurrentTask={updateCurrentTask}/>
            <TaskDetail currentTask={currentTask}/>
		</div>
	);
}

export default VisualizeTasksPage;
