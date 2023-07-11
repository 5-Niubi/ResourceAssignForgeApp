import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskDetail from "./TaskDetail";
import { Field, Label } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import PertChart from "./PertChart";
import { invoke } from "@forge/bridge";
import { Content, Main, PageLayout, RightSidebar } from "@atlaskit/page-layout";
import TasksCompact from "./TasksCompact";
import Toastify from "../../../common/Toastify";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";
import "./style.css";

export const colorsBank = [
	"#FF5733",
	"#A569BD",
	"#85C1E9",
	"#F4D03F",
	"#58D68D",
	"#CD6155",
	"#F7DC6F",
	"#5DADE2",
	"#F5B7B1",
	"#48C9B0",
	"#F8C471",
	"#7FB3D5",
	"#82E0AA",
	"#EC7063",
	"#F9E79F",
	"#5499C7",
	"#FAD7A0",
	"#5DADE2",
	"#F1948A",
	"#ABEBC6",
	"#F4D03F",
	"#85C1E9",
	"#E59866",
	"#82E0AA",
	"#F8C471",
	"#E6B0AA",
	"#5499C7",
	"#F7DC6F",
	"#A569BD",
	"#FAD7A0",
];

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
function VisualizeTasksPage({handleChangeTab}) {
	let { projectId } = useParams();

	const [canEstimate, setCanEstimate] = useState(true);
	const updateCanEstimate = (can) => {
		setCanEstimate(can);
	};

	function handleEstimate() {
		invoke("estimate", { projectId })
			.then(function (res) {
				// console.log(res);
				localStorage.setItem("estimation", JSON.stringify(res));
				//move to next tab
				handleChangeTab(1);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
	}

	function handleSave() {
		var data = {
			ProjectId: projectId,
			TaskPrecedenceTasks: [],
			TaskSkillsRequireds: [],
		};

		tasks.forEach((task) => {
			let preArray = [];
			task.precedences.forEach((pre) => preArray.push(pre.precedenceId));
			data.TaskPrecedenceTasks.push({
				TaskId: task.id,
				TaskPrecedences: preArray,
			});
			data.TaskSkillsRequireds.push({ TaskId: task.id, SkillsRequireds: task.skillRequireds });
		});

		invoke("saveTasks", { tasks: data })
			.then(function (res) {
				if (res) {
					setCanEstimate(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
	}

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
	const [skills, setSkills] = useState([]);
	const [milestones, setMilestones] = useState([]);
	useEffect(function () {
		invoke("getTasksList", { projectId: Number(projectId) })
			.then(function (res) {
				// if (!tasksData || tasksData.length === 0) {
				// }
				setTasks(res);

				// storage.set("projectId", projectId);
				// storage.set("tasks", JSON.stringify(tasks));
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		setTasks(tasksData);

		invoke("getAllSkills", {})
			.then(function (res) {
				if (Object.keys(res).length !== 0) {
					setSkills(res);
				} else setSkills([]);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		setSkills([]);

		invoke("getAllMilestones", { projectId })
			.then(function (res) {
				if (Object.keys(res).length !== 0) {
					setMilestones(res);
				} else setMilestones([]);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		setMilestones([]);
		return;
	}, []);

	//currentTask represents the selected task to be shown in the bottom panel
	const [currentTaskId, setCurrentTaskId] = useState(null);
	const updateCurrentTaskId = (taskId) => {
		setCurrentTaskId(taskId);
	};

	//selectedTask represents the all the tasks that are currently selected for the pert chart
	const [selectedIds, setSelectedIds] = useState(selectedData);
	const updateSelectedTaskIds = (taskIds) => {
		setSelectedIds(taskIds);
	};

	const [dependenciesChanged, setDependenciesChanged] = useState(null);
	const updateDependenciesChanged = (dataChanged) => {
		setDependenciesChanged(dataChanged);
	};

	const [taskSkillsChanged, setTaskSkillsChanged] = useState(null);
	const updateTaskSkillsChanged = (dataChanged) => {
		setTaskSkillsChanged(dataChanged);
	};

	const updateTasks = (tasks) => {
		setTasks(tasks);
	};

	useEffect(() => {
		localStorage.setItem("selected", JSON.stringify(selectedIds));
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [selectedIds, tasks]);

	const actionsContent = (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-start",
				gap: "20px",
				alignItems: "end",
			}}
		>
			{canEstimate ? (
				<>
					<div style={{ width: "200px" }}>
						<Label>Start date: </Label>
						<DatePicker />
					</div>
					<Button appearance="primary" onClick={handleEstimate}>
						Estimate
					</Button>
				</>
			) : (
				<Button appearance="primary" onClick={handleSave}>
					Save
				</Button>
			)}
		</div>
	);

	return (
		<div class="visualize-tasks" style={{ width: "100%", height: "90vh" }}>
			{/* {console.log("Render")} */}
			<PageLayout>
				<Content>
					<Main testId="main2" id="main2">
						<PageHeader actions={actionsContent}>
							Visualize Tasks
						</PageHeader>
						<PertChart
							tasks={tasks}
							milestones={milestones}
							selectedTaskIds={selectedIds}
							updateCurrentTaskId={updateCurrentTaskId}
							updateTasks={updateTasks}
							updateCanEstimate={updateCanEstimate}
						/>
						<TaskDetail
							tasks={tasks}
							skills={skills}
							milestones={milestones}
							selectedTaskIds={selectedIds}
							currentTaskId={currentTaskId}
							updateTasks={updateTasks}
							updateDependenciesChanged={
								updateDependenciesChanged
							}
							updateTaskSkillsChanged={updateTaskSkillsChanged}
							updateCanEstimate={updateCanEstimate}
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
