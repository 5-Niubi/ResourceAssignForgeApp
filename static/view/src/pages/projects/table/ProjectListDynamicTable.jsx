import DynamicTable from "@atlaskit/dynamic-table";
import React, { createContext, useCallback, useState } from "react";
import DeleteProjectModal from "../modal/DeleteProjectModal";
import EditProjectModal from "../modal/EditProjectModal";

import DropdownMenu, {
	DropdownItem,
	DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import ProjectDropdownAction from "./dropdown-options/ProjectDropdownAction";
import { formatDateDMY } from "../../../common/utils";

function ProjectListDynamicTable({
	content,
	setEditModalState,
	setDeleteModalState,
}) {
	const rows = content.map((data, index) => ({
		key: `row-${index}-${data.name}`,
		isHighlighted: false,
		cells: [
			{
				key: data.id,
				content: index,
			},
			{
				key: data.id,
				content: data.name,
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
				content: (
					<ProjectDropdownAction
						project={data}
						setModalEditState={setEditModalState}
						setModalDeleteState={setDeleteModalState}
					/>
				),
			},
		],
	}));
	return (
		<>
			<DynamicTable
				head={head}
				rows={rows}
				rowsPerPage={5}
				defaultPage={1}
				isFixedSize
				defaultSortKey="term"
				defaultSortOrder="ASC"
				onSort={() => console.log("onSort")}
				onSetPage={() => console.log("onSetPage")}
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
