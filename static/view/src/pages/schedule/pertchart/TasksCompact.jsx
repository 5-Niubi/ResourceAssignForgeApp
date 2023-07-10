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

/**
 * List of tasks with only name; use for select task to appeared in the pertchart
 */
const TasksCompact = ({ tasks, setSelectedIds, updateCurrentTaskId }) => {
	const handleChangeCheckbox = (e) => {
		// console.log(e.currentTarget);
		// console.log(e.currentTarget.checked);
		// console.log(e.currentTarget.value);
		var inputs = document
			.getElementById("tasks")
			.getElementsByTagName("input");
		var selected = [];
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].checked) {
				let taskId = inputs[i].value;
				selected.push(taskId);
				updateCurrentTaskId(taskId);
			}
		}

		updateGlobalSelectedTasks(selected);
		setSelectedIds(globalSelectedTasks);
	};

	const rows = tasks.map((item, index) => {
		let checked = false;
		for (let i = 0; i < globalSelectedTasks.length; i++) {
			if (globalSelectedTasks[i] == item.id) {
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
						<Checkbox
							size="large"
							value={item.id}
							isChecked={checked}
							onChange={handleChangeCheckbox}
							label={item.name}
						></Checkbox>
					),
				},
			],
		};
	});

	const actionsContent = (
		<ButtonGroup>
			<Button appearance="subtle">Create task</Button>
		</ButtonGroup>
	);

	return (
		<div id="tasks">
			<PageHeader actions={actionsContent}>Tasks list:</PageHeader>
			<div style={{ width: "100%" }}>
				<DynamicTable
					rows={rows}
					loadingSpinnerSize="large"
					isFixedSize
				/>
			</div>
		</div>
	);
};

export default TasksCompact;
