import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@atlaskit/spinner";
import { invoke } from "@forge/bridge";
import {
	cache,
	clearAllCache,
	clearProjectBasedCache,
	findObj,
	getCache,
} from "../../common/utils";
import Toastify from "../../common/Toastify";
import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import EmptyState from "@atlaskit/empty-state";
import { ROW_PER_PAGE } from "../../common/contants";
import "./style.css";
import EditIcon from "@atlaskit/icon/glyph/edit";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import { Grid, GridColumn } from "@atlaskit/page";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function TasksPage() {
	let navigate = useNavigate();
	let { projectId } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [loadingTasks, setLoadingTasks] = useState(true);
	const [tasks, setTasks] = useState([]);
	const [milestones, setMilestones] = useState([]);
	const [selectedMilestone, setSelectedMilestone] = useState(null);
	const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);
	const [displayTasks, setDisplayTasks] = useState(tasks);

	var projectCache = getCache("projectCache");
	if (!projectCache) {
		clearProjectBasedCache();
		projectCache = {};
	} else {
		projectCache = JSON.parse(projectCache);
		if (!projectCache || projectCache.id != projectCacheId) {
			clearProjectBasedCache();
			projectCache = {};
		}
	}

	var tasksCache = getCache("tasks");
	if (tasksCache) {
		setTasks(JSON.parse(tasksCache));
	}

	var milestonesCache = getCache("milestones");
	if (milestonesCache) {
		setMilestones(JSON.parse(milestonesCache));
	}

	useEffect(function () {
		if (Object.keys(projectCache).length == 0) {
			setIsLoading(true);
			invoke("getProjectDetail", { projectId })
				.then(function (res) {
					setIsLoading(false);
					if (res.id) {
						cache("project", JSON.stringify(res));
					}
				})
				.catch(function (error) {
					setIsLoading(false);
					console.log(error);
					Toastify.error(error.toString());
				});
		}

		if (!tasksCache) {
			setLoadingTasks(true);
			invoke("getTasksList", { projectId })
				.then(function (res) {
					setLoadingTasks(false);
					if (res) {
						setTasks(res);
						setDisplayTasks(res);
						cache("tasks", JSON.stringify(res));
					}
				})
				.catch(function (error) {
					setLoadingTasks(false);
					console.log(error);
					Toastify.error(error.toString());
				});
		}

		if (!milestonesCache) {
			setLoadingTasks(true);
			invoke("getAllMilestones", { projectId })
				.then(function (res) {
					setLoadingTasks(false);
					if (Object.keys(res).length !== 0) {
						setMilestones(res);
						cache("milestones", JSON.stringify(res));
					}
				})
				.catch(function (error) {
					console.log(error);
					Toastify.error(error.toString());
				});
		}
	}, []);

	const handleChangeMilestone = (id, index = 0) => {
		setSelectedMilestone(id);
		setSelectedMilestoneIndex(index);
		
		var milestoneTasks = [];
		if (id === null){
			milestoneTasks = tasks;
		}
		if (id === 0){
			for (let j = 0; j < tasks.length; j++) {
				if (!tasks[j].milestoneId){
					milestoneTasks.push(tasks[j]);
				}
			}
		} else {
			for (let j = 0; j < tasks.length; j++) {
				if (tasks[j].milestoneId == id) {
					milestoneTasks.push(tasks[j]);
				}
			}
		}
		
		setDisplayTasks(milestoneTasks);
	}

	const actionsContent = (
		<ButtonGroup>
			<Button>Create new group</Button>
			<Button appearance="primary">Create new task</Button>
		</ButtonGroup>
	);

	const head = {
		cells: [
			{
				key: "no",
				content: "",
				isSortable: false,
				width: 5,
			},
			{
				key: "name",
				content: "Task name",
				shouldTruncate: true,
				isSortable: false,
				width: 30,
			},
			{
				key: "duration",
				content: "Duration",
				shouldTruncate: true,
				isSortable: false,
				width: 10,
			},
			{
				key: "skills",
				content: "Required skills",
				shouldTruncate: true,
				isSortable: false,
				width: 20,
			},
			{
				key: "precedences",
				content: "Tasks precedences",
				shouldTruncate: true,
				isSortable: false,
				width: 20,
			},
			{
				key: "action",
			},
		],
	};

	const groupHead = {
		cells: [
			{
				key: "name",
				content: "Task Groups",
				shouldTruncate: true,
				isSortable: false,
				width: 80,
			},
		],
	};

	var groupRows = milestones.map((m, index) => {
		return {
			key: `milestone-${m.id}`,
			isHighlighted: false,
			cells: [
				{
					key: m.id,
					content: (
						<>
							{m.name}
							<div className="actions">
								<ButtonGroup>
									<Button appearance="subtle">
										<EditIcon />
									</Button>
									<Button appearance="subtle">
										<TrashIcon />
									</Button>
								</ButtonGroup>
							</div>
						</>
					),
				},
			],
			onClick: (e) => {
				handleChangeMilestone(m.id, index+2);
			},
		};
	});
	groupRows.unshift(
		{
			key: `milestones`,
			cells: [
				{
					key: -1,
					content: <>All groups</>,
					onClick: (e) => {
						handleChangeMilestone(null, 0);
					},
				},
			],
		},
		{
			key: `milestone-${0}`,
			cells: [
				{
					key: 0,
					content: <>Uncategorized</>,
					onClick: (e) => {
						handleChangeMilestone(0, 1);
					},
				},
			],
		}
	);

	var rows = displayTasks.map((task, index) => {
		return {
			key: `milestone-${selectedMilestone || "s"}-${index}`,
			isHighlighted: false,
			cells: [
				{
					key: "no",
					content: <div class="text-center">{index+1}</div>,
				},
				{
					key: "name",
					content: task.name,
				},
				{
					key: "duration",
					content: task.duration,
				},
				{
					key: "skill",
					content: "",
				},
				{
					key: "precedences",
					content: "",
				},
				{
					key: "option",
					content: (
						<div className="actions">
							<ButtonGroup>
								<Button appearance="subtle">
									<EditIcon />
								</Button>
								<Button appearance="subtle">
									<TrashIcon />
								</Button>
							</ButtonGroup>
						</div>
					),
				},
			]
		};
	});

	return (
		<>
			{isLoading ? (
				<Spinner size="large" />
			) : (
				<div class="tasks-page">
					<PageHeader actions={actionsContent}>Tasks List</PageHeader>
					<Grid layout="fluid" spacing="compact" columns={10}>
						<GridColumn medium={3}>
							<div class="task-groups">
								<DynamicTable
									head={groupHead}
									rows={groupRows}
									highlightedRowIndex={[selectedMilestoneIndex]}
									isFixedSize
									isLoading={loadingTasks}
								/>
							</div>
						</GridColumn>

						<GridColumn medium={7}>
							<div className="tasks-container">
								<DynamicTable
									head={head}
									rows={rows}
									rowsPerPage={20}
									defaultPage={1}
									page={1}
									isFixedSize
									onSort={() => console.log("onSort")}
									isLoading={loadingTasks}
									emptyView={
										<EmptyState
											header="Empty"
											description="There is no tasks."
											primaryAction={
												<Button
													appearance="primary"
													onClick={() =>
														console.log("onClick")
													}
												>
													Create new task
												</Button>
											}
										/>
									}
								/>
							</div>
						</GridColumn>
					</Grid>
				</div>
			)}
		</>
	);
}

export default TasksPage;
