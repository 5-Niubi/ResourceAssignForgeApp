import React from "react";
import ProjecstListHomePageHeader from "../../components/page-header/ProjectsListHomePageHeader";
import ProjectsListHomeTable from "../../components/table/ProjectsListHomeTable";
import { view } from "@forge/bridge";
import Pagination from "@atlaskit/pagination";
function ProjectListHome() {
  const items = [
    {
      id: "item1",
      content: {
        no: "1",
        projectName: "First top-level item",
        projectImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREabvR30BJaXiYN2Azwc8fPUWJmv1nzMatw9YIxxrygA&s",
        startDate: "11/10/11",
        amount: 10,
      },
      hasChildren: false,
      children: [],
    },
    {
      id: "item1",
      content: {
        no: "1",
        projectName: "First top-level item",
        startDate: "11/10/11",
        amount: 10,
      },
      hasChildren: false,
      children: [],
    },
    {
      id: "item1",
      content: {
        no: "1",
        projectName: "First top-level item",
        startDate: "11/10/11",
        amount: 10,
      },
      hasChildren: false,
      children: [],
    },
  ];

  return (
    <>
      <ProjecstListHomePageHeader />
      <div style={{ maxWidth: "60%", marginTop: "4em" }}>
        <div style={{ marginBottom: "1rem"}} >
          <ProjectsListHomeTable items={items} />
        </div>
        <div style={{ marginTop: "3em" }}>
          <Pagination
            pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            nextLabel="Next"
            label="Page"
            pageLabel="Page"
            previousLabel="Previous"
            selectedIndex={0}
          />
        </div>
      </div>
      <div></div>
    </>
  );
}

export default ProjectListHome;
