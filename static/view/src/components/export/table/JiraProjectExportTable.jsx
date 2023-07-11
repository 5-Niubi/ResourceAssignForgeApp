import Avatar from "@atlaskit/avatar";
import DynamicTable from "@atlaskit/dynamic-table";
import React, { useCallback, useContext } from "react";
import { ROW_PER_PAGE } from "../../../common/contants";
import Button from "@atlaskit/button";
import { LoadingModalContext } from "../JiraExport";

function JiraProjectExportTable({ isLoading, projects, exportButtonClick }) {
	const loadingModalState = useContext(LoadingModalContext);
	const [isLoadingModalOpen, setIsLoadingModalOpen] = loadingModalState;
	const openLoadingModal = useCallback(
		() => setIsLoadingModalOpen(true),
		[setIsLoadingModalOpen]
	);

	const rows = projects?.map((data, index) => ({
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
						onClick={function () {
							exportButtonClick(data.id);
						}}
					>
						Export
					</Button>
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
			emptyView={<h2>Not found any project</h2>}
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
			width: 70,
		},
		{
			key: "export",
			shouldTruncate: true,
		},
	],
};
