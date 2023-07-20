import { Grid, GridColumn } from "@atlaskit/page";
import React, { useState, useEffect } from "react";
import { findObj } from "../pertchart/VisualizeTasks";

const GanttChartStat = ({ title, value, info }) => {
	return (
		<div
			style={{
				width: "100%",
				height: "100px",
				backgroundColor: "#ebebeb",
				borderRadius: "30px",
			}}
		>
			<div
				style={{
					textAlign: "center",
					padding: "10px 0 5px 0",
					fontWeight: "bold",
				}}
			>
				{title}
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "20px",
					marginBottom: "5px"
				}}
			>
				{value}
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "15px",
					color: "#666"
				}}
			>
				{info}
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
		<Grid spacing="comfortable" columns={12}>
			<GridColumn medium={4}>
				<GanttChartStat
					title="Duration"
					value={solution.duration + " days"}
					info={"9/12/2022 - 8/6/2023"}
				/>
			</GridColumn>
			<GridColumn medium={4}>
				<GanttChartStat title="Cost" value={"$" + solution.cost} />
			</GridColumn>
			<GridColumn medium={4}>
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
