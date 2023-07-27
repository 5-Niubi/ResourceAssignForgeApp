import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskDetail from "./TaskDetail";
import PertChart from "./PertChart";
import { invoke } from "@forge/bridge";
import { Content, Main, PageLayout, RightSidebar } from "@atlaskit/page-layout";
import TasksCompact from "./TasksCompact";
import Toastify from "../../../common/Toastify";
import PageHeader from "@atlaskit/page-header";
import Button, { LoadingButton } from "@atlaskit/button";
import "./style.css";
import { cache, getCache } from "../../../common/utils";

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function VisualizeTasksPage({ handleChangeTab }) {
	let { projectId } = useParams();

	const [canEstimate, setCanEstimate] = useState(true);
	const updateCanEstimate = (can) => {
		setCanEstimate(can);
	};

	const [isSaving, setIsSaving] = useState(false);
	const [isEstimating, setIsEstimating] = useState(false);

	function handleEstimate() {
		setIsEstimating(true);
		invoke("estimate", { projectId })
			.then(function (res) {
				if (res.id || res.id === 0) {
					Toastify.info("Estimated successfully");
					localStorage.setItem("estimation", JSON.stringify(res));
					//move to next tab
					handleChangeTab(1);
					setIsEstimating(false);
				} else {
					setIsEstimating(false);
					Toastify.error("Error in estimate");
				}
			})
			.catch(function (error) {
				setIsEstimating(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	}

	function handleSave() {
		setIsSaving(true);
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
			data.TaskSkillsRequireds.push({
				TaskId: task.id,
				SkillsRequireds: task.skillRequireds,
			});
		});

		invoke("saveTasks", { tasks: data })
			.then(function (res) {
				setIsSaving(false);
				setCanEstimate(true);
				if (res) {
					Toastify.success("Saved successfully");
				}
			})
			.catch(function (error) {
				setIsSaving(false);
				console.log(error);
				Toastify.error(error.toString());
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
	var tasksCache = getCache("tasks");
	if (!tasksCache) {
		tasksCache = [];
	} else {
		tasksCache = JSON.parse(tasksCache);
	}

	var skillsCache = getCache("skills");
	console.log(skillsCache == true);
	if (!skillsCache) {
		skillsCache = [];
	} else {
		skillsCache = JSON.parse(skillsCache);
	}

	var milestonesCache = getCache("milestones");
	if (!milestonesCache) {
		milestonesCache = [];
	} else {
		milestonesCache = JSON.parse(milestonesCache);
	}
	const [tasks, setTasks] = useState(tasksCache);
	const [skills, setSkills] = useState(skillsCache);
	const [milestones, setMilestones] = useState(milestonesCache);
	useEffect(function () {
		var tasksCache = getCache("tasks");
		if (!tasksCache) {
			invoke("getTasksList", { projectId })
				.then(function (res) {
					if (res) {
						setTasks(res);
						cache("tasks", JSON.stringify(res));
					}
				})
				.catch(function (error) {
					console.log(error);
					Toastify.error(error.toString());
				});
		}

		var skillsCache = getCache("skills");
		if (!skillsCache) {
			invoke("getAllSkills", {})
				.then(function (res) {
					if (Object.keys(res).length !== 0) {
						setSkills(res);
					}
				})
				.catch(function (error) {
					console.log(error);
					Toastify.error(error.toString());
				});
		}

		var milestonesCache = getCache("milestones");
		if (!milestonesCache) {
			invoke("getAllMilestones", { projectId })
				.then(function (res) {
					if (Object.keys(res).length !== 0) {
						setMilestones(res);
					}
				})
				.catch(function (error) {
					console.log(error);
					Toastify.error(error.toString());
				});
		}
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

	const [taskMilestoneChanged, setTaskMilestoneChanged] = useState(null);
	const updateTaskMilestoneChanged = (dataChanged) => {
		setTaskMilestoneChanged(dataChanged);
	};

	const updateTasks = (tasks) => {
		setTasks(tasks);
	};
	const updateSkills = (skills) => {
		setSkills(skills);
	};
	const updateMilestones = (milestones) => {
		setMilestones(milestones);
	};

	// useEffect(() => {
	// 	localStorage.setItem("tasks", JSON.stringify(tasks));
	// 	localStorage.setItem("milestones", JSON.stringify(milestones));
	// 	localStorage.setItem("skills", JSON.stringify(skills));
	// }, [tasks, milestones, skills]);

	const actionsContent = (
		<div
			style={{
				display: "flex",
				justifyContent: "flex-start",
				gap: "20px",
				alignItems: "end",
			}}
		>
			{canEstimate ? "" : isSaving ? (
				<LoadingButton isLoading>
					Saving...
				</LoadingButton>
			) : (
				<Button onClick={handleSave}>
					Save
				</Button>
			)}
			{isEstimating ? (
				<LoadingButton appearance="primary" isLoading>
					Estimating...
				</LoadingButton>
			) : (
				<Button appearance="primary" onClick={handleEstimate}>
					Estimate
				</Button>
			)}
		</div>
	);

	return (
		<div class="visualize-tasks" style={{ width: "100%", height: "90vh" }}>
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
							currentTaskId={currentTaskId}
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
							updateTaskMilestoneChanged={
								updateTaskMilestoneChanged
							}
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
							width={300}
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
									milestones={milestones}
									skills={skills}
									selectedIds={selectedIds}
									currentTaskId={currentTaskId}
									setSelectedIds={updateSelectedTaskIds}
									updateCurrentTaskId={updateCurrentTaskId}
									updateTasks={updateTasks}
									updateSkills={updateSkills}
									updateMilestones={updateMilestones}
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
