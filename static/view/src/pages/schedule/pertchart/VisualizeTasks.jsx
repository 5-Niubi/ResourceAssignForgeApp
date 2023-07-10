import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskDetail from "./TaskDetail";
import VisualizePageHeader from "./VisualizePageHeader";
import { Field, Label } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import PertChart from "./PertChart";
import { invoke } from "@forge/bridge";
import { Content, Main, PageLayout, RightSidebar } from "@atlaskit/page-layout";
import TasksCompact from "./TasksCompact";
import { globalSelectedTasks, sample } from "../data";
import Toastify from "../../../common/Toastify";

const startDate = (
	<div>
		<Label>Start date: </Label>
		<DatePicker />
	</div>
);

/**
 * Find an object in a list of objects by its id
 * @param {array} arr
 * @param {*} id
 * @returns object | null
 */
export const findObj = (arr, id) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id == id) {
			return arr[i];
		}
	}
	return null;
};



/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function VisualizeTasksPage() {
	let { projectId } = useParams();

    //get from Local Storage
    var tasksData = JSON.parse(localStorage.getItem("tasks"));
	if (!tasksData) {
		tasksData = [];
	}
	var selectedData = JSON.parse(localStorage.getItem("selected"));
	if (!selectedData) {
		selectedData = [];
	}

	//tasks represent list of all tasks in the pool of current project
	//-which are shown in the right panel
	const [tasks, setTasks] = useState([]);
	useEffect(function () {
		invoke("getTasksList", { projectId: Number(projectId) })
			.then(function (res) {
                if (!tasksData || tasksData.length === 0) {
				    setTasks(res);
                }
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		return setTasks(tasksData);
	}, []);

	//currentTask represents the selected task to be shown in the bottom panel
	const [currentTaskId, setCurrentTaskId] = useState(null);

	//selectedTask represents the all the tasks that are currently selected for the pert chart
	const [selectedIds, setSelectedIds] = useState(selectedData);

	const updateCurrentTaskId = (taskId) => {
		setCurrentTaskId(taskId);
	};

	const updateSelectedTaskIds = (taskIds) => {
		setSelectedIds(taskIds);
	};

	const updateTasks = (tasks) => {
		setTasks(tasks);
	};

	useEffect(() => {
		localStorage.setItem("selected", JSON.stringify(selectedIds));
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [selectedIds, tasks]);

	const PertChartMemo = React.memo(
		PertChart,
		(prevProps, nextProps) =>
			(prevProps.selectedTaskIds.length ===
				nextProps.selectedTaskIds.length &&
				prevProps.selectedTaskIds.every(
					(value, index) => value == nextProps.selectedTaskIds[index]
				)) ||
			prevProps.tasks.every(
				(value, index) =>
					value.id == nextProps.tasks[index]?.id &&
					value.precedence.length ===
						nextProps.tasks[index].precedence.length &&
					value.precedence.every(
						(v, i) =>
							v.precedenceId ==
							nextProps.tasks[index].precedence[i].precedenceId
					)
			)
	);

	return (
		<div style={{ width: "100%" }}>
			<PageLayout>
				<Content>
					<Main testId="main2" id="main2">
						<VisualizePageHeader title="Visualize Tasks" />
						{startDate}
						<PertChartMemo
							tasks={tasks}
							selectedTaskIds={selectedIds}
							updateCurrentTaskId={updateCurrentTaskId}
							updateTasks={updateTasks}
						/>
						<TaskDetail
							tasks={tasks}
							selectedTaskIds={selectedIds}
							currentTaskId={currentTaskId}
							updateTasks={updateTasks}
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
									selectedIds={selectedIds}
									setSelectedIds={updateSelectedTaskIds}
									updateCurrentTaskId={updateCurrentTaskId}
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
