import DynamicTable from "@atlaskit/dynamic-table";
import React, { createContext, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Avatar from "@atlaskit/avatar";

import ProjectDropdownAction from "./dropdown-options/ProjectDropdownAction";
import { formatDateDMY } from "../../../common/utils";
import Link from "../../../components/common/Link";
import { ROW_PER_PAGE } from "../../../common/contants";

function ProjectListDynamicTable({ isLoading, content }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(
		searchParams.get("page") ? Number(searchParams.get("page")) : 1
	);

	const rows = content.map((data, index) => ({
		key: `row-${index + 1}-${data.name}`,
		isHighlighted: false,
		cells: [
			{
				key: data.id,
				content: index + 1,
			},
			{
				key: data.id,
				content: (
					<span>
						<span style={{ verticalAlign: "middle", marginRight: "0.5rem" }}>
							<Avatar
								size="small"
								appearance="square"
								src={""}
								name="Project Avatar"
							/>
						</span>
						<span>
							<Link to={`${data.id}/schedule`}>{data.name}</Link>
						</span>
					</span>
				),
			},
			{
				key: data.id,
				content: formatDateDMY(data.startDate),
			},
			{
				key: data.id,
				content: data.tasks,
			},
			{
				key: "option",
				content: <ProjectDropdownAction project={data} />,
			},
		],
	}));
	return (
		<>
			<DynamicTable
				head={head}
				rows={rows}
				rowsPerPage={ROW_PER_PAGE}
				defaultPage={1}
				page={page}
				isFixedSize
				defaultSortKey="no"
				defaultSortOrder="DESC"
				onSort={() => console.log("onSort")}
				onSetPage={(page) => {
					setPage(page);
					setSearchParams({ page: `${page}` });
				}}
				isLoading={isLoading}
				emptyView={<h2>Not found any project match</h2>}
			/>
		</>
	);
}

export default ProjectListDynamicTable;

export const createHead = () => {
	return {
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
				key: "startDate",
				content: "Start date",
				shouldTruncate: true,
				isSortable: true,
				width: 15,
			},
			{
				key: "tasks",
				content: "Tasks",
				isSortable: true,
				shouldTruncate: true,
				width: 10,
			},
			{
				key: "option",
				shouldTruncate: true,
			},
		],
	};
};

const head = createHead();
