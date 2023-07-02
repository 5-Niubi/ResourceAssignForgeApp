import React, { useEffect, useState } from "react";
import GanttChartPageHeader from "./GanttChartPageHeader";
import GanttChart from "./GanttChart";
import { render } from "react-dom";
import GanttChartStats from "./GanttChartStat";

/**
 * Using as Page to show gantt chart as a result
 * @returns {import("react").ReactElement}
 */
function GanttChartPage() {
	return (
		<div style={{width: "100%"}}>
            <GanttChartPageHeader/>
			<GanttChartStats/>
            <GanttChart/>
		</div>
	);
}

export default GanttChartPage;