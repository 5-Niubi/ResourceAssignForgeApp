import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PertChart from "./PertChart";
import TaskDetail from "./TaskDetail";
import VisualizePageHeader from "./VisualizePageHeader";
import { Field } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";

const startDate = (
	<div>
		<Field
			name="start-date"
			label="Start date"
			isRequired={false}
			defaultValue=""
		>
			{({ fieldProps }) => (
				<>
					<DatePicker
						{...fieldProps}
						selectProps={{ inputId: fieldProps.id }}
					/>
				</>
			)}
		</Field>
	</div>
);

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function VisualizeTasksPage() {
	let navigate = useNavigate();
    const [currentTask, setCurrentTask] = useState(null);

    const updateCurrentTask = (task) => {
        setCurrentTask(task);
    };

	return (
		<div style={{width: "100%"}}>
            <VisualizePageHeader title="Visualize Tasks"/>
            {startDate}
            <PertChart updateCurrentTask={updateCurrentTask}/>
            <TaskDetail currentTask={currentTask}/>
		</div>
	);
}

export default VisualizeTasksPage;
