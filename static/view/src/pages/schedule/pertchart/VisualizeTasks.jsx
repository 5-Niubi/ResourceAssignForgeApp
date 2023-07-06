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
    var sample = [
		{
			key: 1,
			name: "Start",
			duration: 0,
			critical: true,
			precedence: [],
		},
		{
			key: 2,
			name: "Task 1",
			duration: 4,
			critical: true,
			precedence: [1],
		},
		{
			key: 3,
			name: "Task 2",
			duration: 5.33,
			critical: false,
			precedence: [],
		},
		{
			key: 4,
			name: "Task 3 siêuuuuuuuuuuuuuuuuu dàiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
			duration: 5.17,
			critical: true,
			precedence: [1, 2],
		},
		{
			key: 5,
			name: "Task 4",
			duration: 6.33,
			critical: false,
			precedence: [],
		},
		{
			key: 6,
			name: "Task 5",
			duration: 5.17,
			critical: true,
			precedence: [],
		},
		{
			key: 7,
			name: "Task 6",
			duration: 4.5,
			critical: false,
			precedence: [],
		},
		{
			key: 8,
			name: "Task 7",
			duration: 5.17,
			critical: true,
			precedence: [],
		},
		{
			key: 9,
			name: "Finish",
			duration: 0,
			critical: true,
			precedence: [],
		},
		{
			key: 10,
			name: "Task 8",
			duration: 0,
			critical: true,
			precedence: [],
		},
	];
	const [tasks, setTasks] = useState(sample);
	const [currentTask, setCurrentTask] = useState(null);
    const [selected, setSelected] = useState(globalSelectedTasks);

	const updateCurrentTask = (task) => {
		setCurrentTask(task);
	};

	const updateSelectedTasks = (tasks) => {
		setSelected(tasks);
	};

    const updateTasks = (tasks) => {
		setTasks(tasks);
	};


	return (
		<div style={{ width: "100%" }}>
			<PageLayout>
				<Content>
					<Main testId="main2" id="main2">
						<VisualizePageHeader title="Visualize Tasks" />
						{startDate}
						<PertChart2
							tasks={tasks}
							selectedTasks={selected}
							updateCurrentTask={updateCurrentTask}
							updateTasks={updateTasks}
						/>
						<TaskDetail
							tasks={tasks}
							selectedTasks={selected}
							currentTask={currentTask}
							updateTasks={updateTasks}
							updateCurrentTask={updateCurrentTask}
						/>
					</Main>
					<div
						style={{
							backgroundColor: "#fafbfc",
							boxSizing: "border-box",
							borderLeft: "1px solid #e5e5e5",
							marginLeft: "2rem",
							marginRight: "-2rem",
						}}
					>
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
									boxSizing: "border-box",
								}}
							>
								<TasksCompact
									tasks={tasks}
									setSelected={updateSelectedTasks}
									updateCurrentTask={updateCurrentTask}
								/>
							</div>
						</RightSidebar>
					</div>
				</Content>
			</PageLayout>
		</div>
	);
}

export default VisualizeTasksPage;
