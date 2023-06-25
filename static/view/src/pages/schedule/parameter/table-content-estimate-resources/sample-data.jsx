import { estimateResources } from "./estimateresource";

export const createHead = (withWidth) => {
	return {
		cells: [
			{
				key: "workforces",
				content: "Workforces",
				width: "50%",
			},
			{
				key: "equipments",
				content: "Equipments",
				width: "50%",
			},
		],
	};
};

export const head = createHead(true);

export const rows = estimateResources.map((estimateResource, index) => ({
	key: `row-${index}-${estimateResource}`,
	isHighlighted: false,
	cells: [
		{
			key: "workforces",
			content: (
					<ul>
						{estimateResource.equipments?.map((er) => (
							<li>{er}</li>
						))}
					</ul>
			),
		},
		{
			key: "equipments",
			content: (
					<ul>
						{estimateResource.equipments?.map((er) => (
							<li>{er}</li>
						))}
					</ul>
			),
		},
	],
}));
