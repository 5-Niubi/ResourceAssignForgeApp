import React, { useEffect, useState } from "react";
import GanttChartPageHeader from "./GanttChartPageHeader";
import GanttChart from "./GanttChart";
import { render } from "react-dom";
import GanttChartStats from "./GanttChartStat";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import GanttChart2 from "./GanttChart2";
import GanttChart3 from "./GanttChart3";

/**
 * Using as Page to show gantt chart as a result
 * @returns {import("react").ReactElement}
 */
function GanttChartPage({ setSelectedSolution, index}) {
	return (
		<div style={{ width: "100%", marginTop: "10px"}}>
			<Breadcrumbs>
				<BreadcrumbsItem
					onClick={() => setSelectedSolution(null)}
					text="All solutions"
				/>
				<BreadcrumbsItem text={"Solution #" + (index + 1)} />
			</Breadcrumbs>
			<GanttChartPageHeader />
			<GanttChartStats />
			<GanttChart3 />
		</div>
	);
}

export default GanttChartPage;
