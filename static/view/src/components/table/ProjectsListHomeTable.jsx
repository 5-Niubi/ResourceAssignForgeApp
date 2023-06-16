import Image from "@atlaskit/image";
import TableTree from "@atlaskit/table-tree";
import React from "react";

function ProjectsListHomeTable({items}) {
  const No = (props) => <span>{props.no}</span>;
  const ProjectName = (props) => (
    <span>
      <span>
        <img src="https://placehold.co/600x400" alt="Project Cover" />
      </span>
      {props.projectName}
    </span>
  );
  const StartDate = (props) => <span>{props.startDate}</span>;
  const Amount = (props) => <span>{props.amount}</span>;
  
  return (
    <TableTree
      columns={[No, ProjectName, StartDate, Amount]}
      headers={["No", "Project Name", "Start Date", "Amount"]}
      columnWidths={["120px", "300px"]}
      items={items}
    />
  );
}

export default ProjectsListHomeTable;
