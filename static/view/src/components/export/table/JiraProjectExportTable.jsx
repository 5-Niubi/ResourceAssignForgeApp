import Avatar from "@atlaskit/avatar";
import DynamicTable from "@atlaskit/dynamic-table";
import React from "react";
import { ROW_PER_PAGE } from "../../../common/contants";
import { Button } from "@forge/ui";

function JiraProjectExportTable({ isLoading, projects }) {
	const rows = projects.map((data, index) => ({
		key: `row-${index + 1}-${data.name}`,
		isHighlighted: false,
		cells: [
			{
				key: data.id,
				content: index + 1,
			},
			{
				key: "projectName",
				content: (
					<span>
						<span style={{ verticalAlign: "middle", marginRight: "0.5rem" }}>
							<Avatar
								size="small"
								appearance="square"
								src={data.avatarUrls["16x16"]}
								name="Project Avatar"
							/>
						</span>
						<span>
							{data.key} - {data.name}
						</span>
					</span>
				),
			},
			{
				key: "export",
				content: (
					<Button
						text="Export"
						onClick={function () {
							throw new Error("Function not implemented.");
						}}
					/>
				),
			},
		],
	}));
	return (
		<DynamicTable
			head={head}
			rows={rows}
			rowsPerPage={ROW_PER_PAGE}
			defaultPage={1}
			isFixedSize
			defaultSortKey="no"
			defaultSortOrder="DESC"
			onSort={() => console.log("onSort")}
			onSetPage={(page) => {}}
			isLoading={isLoading}
			emptyView={<h2>Not found any project match</h2>}
		/>
	);
}

export default JiraProjectExportTable;

const head = {
	cells: [
		{
			key: "no",
			content: "No",
			isSortable: true,
			width: 5,
		},
		{
			key: "projectName",
			content: "Project name",
			shouldTruncate: true,
			isSortable: true,
			width: 50,
		},
		{
			key: "export",
			shouldTruncate: true,
		},
	],
};
