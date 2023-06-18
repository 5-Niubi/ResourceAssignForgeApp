import React from "react";
import ProjecstListHomePageHeader from "../../components/page-header/ProjectsListHomePageHeader";
import ProjectsListHomeTable from "../../components/table/ProjectsListHomeTable";
import Pagination from "@atlaskit/pagination";
import { useMediaQuery } from "react-responsive";
import { Grid, GridColumn } from "@atlaskit/page";
import { Desktop } from "../../components/common/responsesive";
import { MEDIA_QUERY } from "./../../common/contants";

function ProjectListHome() {
  const columns = 10;
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${MEDIA_QUERY.DESKTOP_LAPTOP.MIN}px)`,
  });
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
      <Grid layout="fluid" spacing="comfortable" columns={columns}>
        <GridColumn medium={columns}>
          <ProjecstListHomePageHeader />
        </GridColumn>
        <GridColumn medium={isDesktopOrLaptop ? 7 : columns}>
          <div style={{ marginBottom: "1rem" }}>
            <ProjectsListHomeTable items={items} />
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Pagination
              pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              nextLabel="Next"
              label="Page"
              pageLabel="Page"
              previousLabel="Previous"
              selectedIndex={0}
            />
          </div>
        </GridColumn>
        <Desktop>
          <GridColumn medium={3}>
            <div>Hover panel</div>
          </GridColumn>
        </Desktop>
      </Grid>
    </>
  );
}

export default ProjectListHome;
