import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PertChart from "./PertChart";
import TaskDetail from "./TaskDetail";
import VisualizePageHeader from "./VisualizePageHeader";
import { Field, Label } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import PertChart2 from "./PertChart2";
import { Content, Main, PageLayout, RightSidebar } from "@atlaskit/page-layout";
import TasksCompact from "./TasksCompact";
import { globalSelectedTasks } from "../data";

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

	const [selected, setSelected] = useState(globalSelectedTasks);
	const updateSelectedTasks = (tasks) => {
		setSelected(tasks);
	};


	return (
		<div style={{ width: "100%" }}>
			<PageLayout>
				<Content>
					<Main testId="main2" id="main2">
						<VisualizePageHeader title="Visualize Tasks" />
						{startDate}
						<PertChart2 tasks={selected} updateCurrentTask={updateCurrentTask} />
						<TaskDetail currentTask={currentTask} />
					</Main>
					<div style={{ backgroundColor: "#fafbfc", boxSizing: "border-box", borderLeft: "1px solid #e5e5e5", marginLeft: "2rem", marginRight: "-2rem" }}>
						<RightSidebar
							testId="rightSidebar"
							id="right-sidebar"
							skipLinkTitle="Right Sidebar"
							isFixed={false}
							width={400}
						>
							<div
								style={{
									minHeight: "95vh",
									padding: "10px",
									boxSizing: "border-box"
								}}
							>
								<TasksCompact setSelected={updateSelectedTasks} updateCurrentTask={updateCurrentTask} />

							</div>
						</RightSidebar>
					</div>
				</Content>
			</PageLayout>

		</div>
	);
}

export default VisualizeTasksPage;
