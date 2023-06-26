import React, { useCallback } from "react";
import DropdownMenu, {
	DropdownItem,
	DropdownItemGroup,
} from "@atlaskit/dropdown-menu";
import ProjectDropdownAction from "./dropdown-options/ProjectDropdownAction";

export const caption = "List of US Presidents";

export const createHead = (withWidth) => {
	return {
		cells: [
			{
				key: "no",
				content: "No",
				isSortable: true,
				width: withWidth ? 25 : undefined,
			},
			{
				key: "projectName",
				content: "Project name",
				shouldTruncate: true,
				isSortable: true,
				width: withWidth ? 15 : undefined,
			},
			{
				key: "term",
				content: "Start date",
				shouldTruncate: true,
				isSortable: true,
				width: withWidth ? 10 : undefined,
			},
			{
				key: "tasks",
				content: "Tasks",
				shouldTruncate: true,
			},
			{
				key: "option",
				shouldTruncate: true,
			},
		],
	};
};

let datas = [
	{
		id: 1,
		party: "Party ne",
		name: "Name ne",
		term: "Term ne",
	},
];
export const head = createHead(true);

export const rows = datas.map((data, index) => ({
	key: `row-${index}-${data.name}`,
	isHighlighted: false,
	cells: [
		{
			key: data.id,
			content: (
				<DropdownMenu trigger="More">
					<DropdownItemGroup>
						<DropdownItem>{data.name}</DropdownItem>
					</DropdownItemGroup>
				</DropdownMenu>
			),
		},
		{
			key: data.id,
			content: data.party,
		},
		{
			key: data.id,
			content: data.term,
		},
		{
			key: "Lorem",
			content: "iterateThroughLorem(index)",
		},
		{
			key: "MoreDropdown",
			content: <ProjectDropdownAction project={data}/>,
		},
	],
}));
