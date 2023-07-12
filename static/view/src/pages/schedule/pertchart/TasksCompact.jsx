import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import DynamicTable from "@atlaskit/dynamic-table";
import {
	globalSelectedTasks,
	selectedTasks,
	updateGlobalSelectedTasks,
	updateSelectedTasks,
} from "../data";
import { findObj } from "./VisualizeTasks";
import CreateTaskModal from "./modal/CreateTaskModal";
import { useParams } from "react-router";

/**
 * List of tasks with only name; use for select task to appeared in the pertchart
 */
const TasksCompact = ({
	tasks,
	milestones,
	skills,
	selectedIds,
	setSelectedIds,
	updateCurrentTaskId,
	updateTasks,
}) => {
	const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
	let { projectId } = useParams();

	const handleChangeCheckbox = (e) => {
		// console.log(e.currentTarget);
		// console.log(e.currentTarget.checked);
		// console.log(e.currentTarget.value);
		updateCurrentTaskId(e.currentTarget.value);
		var inputs = document
			.getElementById("tasks")
			.getElementsByTagName("input");
		var selected = [];
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].checked) {
				let taskId = inputs[i].value;
				selected.push(taskId);
				// updateCurrentTaskId(taskId);
			}
		}
		// updateGlobalSelectedTasks(selected);
		setSelectedIds(selected);
	};

	const handleSelectTask = (e) => {
		// console.log(e.currentTarget.dataset.id);
		updateCurrentTaskId(e.currentTarget.dataset.id);
	};

	var selectedTasks = [];
	selectedIds.forEach((id) => {
		var task = findObj(tasks, id);
		if (task) selectedTasks.push(task);
	});

	const rows = tasks.map((item, index) => {
		let checked = false;
		for (let i = 0; i < selectedIds.length; i++) {
			if (selectedIds[i] == item.id) {
				checked = true;
				break;
			}
		}
		return {
			key: `row-${index}-${item.id}`,
			isHighlighted: false,
			cells: [
				{
					key: item.id,
					content: (
						// <Checkbox
						// 	size="large"
						// 	value={item.id}
						// 	isChecked={checked}
						// 	onChange={handleChangeCheckbox}
						// 	label={item.name}
						// ></Checkbox>
						<div
							style={{ padding: "5px", cursor: "pointer" }}
							data-id={item.id}
							onClick={handleSelectTask}
						>
							{item.name}
						</div>
					),
				},
			],
		};
	});

	const actionsContent = (
		<ButtonGroup>
			<Button
				appearance="subtle"
				onClick={() => setIsModalCreateOpen(true)}
			>
				Create task
			</Button>
		</ButtonGroup>
	);

	return (
		<div id="tasks">
			<PageHeader actions={actionsContent}>Tasks list:</PageHeader>
			<div
				class="inner"
				style={{
					width: "100%",
					height: "80vh",
					overflowY: "auto",
					scrollbarWidth: "thin",
				}}
			>
				<DynamicTable
					rows={rows}
					loadingSpinnerSize="large"
					isFixedSize
				/>
			</div>

			{isModalCreateOpen ? (
				<CreateTaskModal
					isOpen={isModalCreateOpen}
					setIsOpen={setIsModalCreateOpen}
					projectId={projectId}
					milestones={milestones}
					tasks={tasks}
					skills={skills}
					updateTasks={updateTasks}
					updateCurrentTaskId={updateCurrentTaskId}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default TasksCompact;
