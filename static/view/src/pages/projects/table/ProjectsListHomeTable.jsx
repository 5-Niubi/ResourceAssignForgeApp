import Avatar from "@atlaskit/avatar";
import Image from "@atlaskit/image";
import TableTree from "@atlaskit/table-tree";
import React from "react";
import Link from "../../../components/common/Link";

function ProjectsListHomeTable({ items }) {
	const No = (props) => <span>{props.no}</span>;
	const ProjectName = (props) => (
		<span>
			<span style={{ verticalAlign: "middle", marginRight: "0.5rem" }}>
				<Avatar
					size="small"
					appearance="square"
					src={"https://placehold.co/600x400"}
					name="Project Avatar"
				/>
			</span>
			<span>
				<Link to={`${props.projectId}/schedule`}>{props.projectName}</Link>
			</span>
		</span>
	);
	const StartDate = (props) => <span>{props.startDate}</span>;
	const Amount = (props) => <span>{props.amount}</span>;

	return (
		<TableTree
			columns={[No, ProjectName, StartDate, Amount]}
			headers={["No", "Project Name", "Start Date", "Amount"]}
			columnWidths={["10px", "500px"]}
			items={items}
		/>
	);
}

export default ProjectsListHomeTable;
