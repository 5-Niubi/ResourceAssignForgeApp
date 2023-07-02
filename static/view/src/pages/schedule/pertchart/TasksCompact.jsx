import React, { Fragment, useEffect, useState } from "react";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import DynamicTable from "@atlaskit/dynamic-table";

const items = [
	{
		id: "1",
		content: {
			id: "1",
			name: "Task 1",
			precedenceTasks: [1, 2, 3],
		}
	},
	{
		id: "2",
		content: {
			id: "2",
			name: "Task 2",
			precedenceTasks: [1, 2, 3],
		}
	},
	{
		id: "3",
		content: {
			id: "3",
			name: "Task 3",
			precedenceTasks: [1, 2, 3],
		}
	},
	{
		id: "4",
		content: {
			id: "4",
			name: "Task 4",
			precedenceTasks: [1, 2, 3],
		}
	},
];

export const head = {
	cells: [
		{
			key: "action",
			shouldTruncate: true,
			width: 10,
		},
		{
			key: "name",
			content: "Task Name",
			isSortable: true,
		},
	],
};

export const rows = items.map((item, index) => ({
	key: `row-${index}-${item.id}`,
	isHighlighted: false,
	cells: [
		{
			key: "action",
			content: <Checkbox size="large"></Checkbox>,
            width: 25,
		},
		{
			key: item.id,
			content: <span>{item.content.name}</span>,
		},
	],
}));

/**
 * List of tasks with only name; use for select task to appeared in the pertchart
 */
const TasksCompact = ({ }) => {
	const actionsContent = (
		<ButtonGroup>
			<Button appearance="subtle">Create task</Button>
		</ButtonGroup>
	);

	return (
		<>
			<PageHeader actions={actionsContent}>Tasks list:</PageHeader>
			<div style={{ width: "100%" }}>
				<DynamicTable
					head={head}
					rows={rows}
					loadingSpinnerSize="large"
					isFixedSize
				/>
			</div>
		</>
	);
};

export default TasksCompact;
