import { Grid, GridColumn } from "@atlaskit/page";
import React, { useState, useEffect } from "react";
import { findObj } from "../pertchart/VisualizeTasks";

const GanttChartStat = ({ title, value }) => {
	return (
		<div
			style={{
				width: "100%",
				height: "130px",
				backgroundColor: "#ebebeb",
				borderRadius: "30px",
			}}
		>
			<div
				style={{
					textAlign: "center",
					padding: "10px 0 10px 0",
					fontWeight: "bold",
				}}
			>
				{title}
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "40px",
				}}
			>
				{value}
			</div>
		</div>
	);
};

const GanttChartStats = ({ selectedSolution }) => {
	const [solution, setSolution] = useState([]);
	useEffect(() => {
		var s = findObj(
			JSON.parse(localStorage.getItem("solutions")),
			selectedSolution
		);
		if (s) {
			setSolution(s);
		}
	}, []);
	return solution ? (
		<Grid layout="fluid" spacing="comfortable" columns={3}>
			<GridColumn medium={1}>
				<GanttChartStat
					title="Duration"
					value={solution.duration + " days"}
				/>
			</GridColumn>
			<GridColumn medium={1}>
				<GanttChartStat title="Cost" value={"$" + solution.cost} />
			</GridColumn>
			<GridColumn medium={1}>
				<GanttChartStat
					title="Quality"
					value={solution.quality + "%"}
				/>
			</GridColumn>
		</Grid>
	) : (
		""
	);
};

export default GanttChartStats;
