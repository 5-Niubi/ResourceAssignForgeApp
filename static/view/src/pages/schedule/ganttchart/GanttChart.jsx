import React, { useEffect, useState } from "react";
import Highcharts, { find } from "highcharts";
import HighchartsDraggablePoints from "highcharts/modules/draggable-points";
import HighchartsGantt from "highcharts/modules/gantt";
import { findObj, getColor } from "../../../common/utils";
import "./style.css";

const findClosestNode = (arr, node) => {
	//filter all task nodes in same row with target
	var sameRows = [];
	arr?.forEach((e) => {
		if (e.y == node.y && e.type == "task") {
			sameRows.push(e);
		}
	});

	//find the closest node in sameRows
	if (sameRows.length > 0) {
		var min = Math.abs(node.start - sameRows[0].end);
		var res = sameRows[0];
		for (let i = 1; i < sameRows.length; i++) {
			if (Math.abs(node.start - sameRows[0].end) < min) {
				min = Math.abs(node.start - sameRows[0].end);
				res = sameRows[i];
			}
		}
		return res;
	}

	return null;
};

const GanttChart = ({
	solutionTasks,
	setSolutionTasks,
	setIsModified,
	updateTasksChanged,
}) => {
	HighchartsGantt(Highcharts);
	HighchartsDraggablePoints(Highcharts);

	const [isChangeResource, setIsChangeResource] = useState(false);

	useEffect(() => {
		// Initialize the Highcharts Gantt module
		HighchartsGantt(Highcharts);

		var day = 1000 * 60 * 60 * 24,
			dateFormat = Highcharts.dateFormat;

		// Parse data into series.
		var data = solutionTasks.map(function (task, i) {
			return {
				id: task.id + "",
				start: new Date(task.startDate).getTime(),
				end: new Date(task.endDate).getTime(),
				duration: task.duration,
				dependency: task.taskIdPrecedences?.map((s) => s + ""),
				y: i,
				name: task.name,
				assignTo: task.workforce,
				type: "task",
				color: getColor(19),
			};
		});

		// Parse data into series.
		var data2 = solutionTasks.map(function (task, i) {
			return {
				id: task.id + "-2",
				start: new Date(task.endDate).getTime(),
				end: new Date(task.endDate).getTime(),
				y: i,
				assignTo: task.workforce,
				color: "transparent",
				type: "resource",
			};
		});

		let chart = Highcharts.ganttChart(
			"gantt-chart-container",
			{
				chart: {
					height: 1, //initital value, changed based on the number of rows in series data, caculated after rendered
					marginTop: 120,
				},
				series: [
					{
						name: "Tasks",
						data: data,
						animation: false,
						dragDrop: {
							draggableX: true,
							draggableY: false,
							dragMinY: 0,
							dragPrecisionX: day / 24, // Snap to eight hours
						},
					},
					{
						name: "Resources",
						data: data2,
						linkedTo: ":previous",
						dragDrop: {
							draggableX: true,
							draggableY: true,
							dragMinY: 0,
							dragPrecisionX: day / 24, // Snap to eight hours
						},
						dataLabels: {
							enabled: true,
							draggable: true,
							crop: false,
							overflow: "none",
							allowOverlap: true,
							format: "{point.assignTo.name}",
							align: "left",
							style: {
								fontWeight: "normal",
								fontSize: "13px",
							},
						},
						point: {
							events: {
								dragStart: function (e) {
									// console.log("drag start");
								},
								drag: function (e) {
									// console.log("drag");
								},
								drop: function (e) {
									// console.log(e);
									// console.log(e.newPoint);
									// console.log(
									// 	e.origin.points[
									// 		Object.keys(e.origin.points)[0]
									// 	]?.point?.id
									// );

									var closestNode = findClosestNode(
										data,
										e?.newPoint
									);
									if (closestNode) {
										//update resource to the closest node
										// console.log(closestNode);
										var newTask = findObj(
											solutionTasks,
											closestNode.id
										);
										// var oldResource = newTask.workforce;
										if (newTask) {
											newTask.workforce =
												e.origin.points[
													Object.keys(
														e.origin.points
													)[0]
												]?.point?.options?.assignTo;
										}

										

										// var oldTask = findObj(
										// 	solutionTasks,
										// 	e.origin.points[
										// 		Object.keys(e.origin.points)[0]
										// 	]?.point?.id
										// );
										// console.log(e);
										// if (oldTask) {
										// 	oldTask.workforce = oldResource;
										// }

										// setSolutionTasks(solutionTasks);
										// setIsChangeResource(!isChangeResource);
										setIsModified(true);
										updateTasksChanged(solutionTasks);
									}
								},
							},
						},
					},
				],
				plotOptions: {
					series: {
						connectors: {
							lineWidth: 1,
							radius: 5,
							startMarker: {
								enabled: true,
							},
						},
					},
				},
				title: {
					text: "",
				},
				tooltip: {
					formatter: function () {
						return false;
					},
					// 	pointFormat:
					// 		"<span>Assigned To: {point.assignTo.name}</span><br/><span>From: {point.start:%e. %b}</span><span> To: {point.end:%e. %b}</span>",
				},
				scrollbar: {
					enabled: true,
				},
				rangeSelector: {
					enabled: true,
					selected: 0,
					inputDateFormat: "%d/%m/%Y",
					inputBoxHeight: 25,
					buttonPosition: {
						y: -50,
					},
					inputPosition: {
						y: -50,
					},
					buttonTheme: {
						// styles for the buttons
						fill: "none",
						stroke: "none",
						"stroke-width": 0,
						r: 8,
						style: {
							color: "#039",
							fontWeight: "bold",
						},
						states: {
							hover: {},
							select: {
								fill: "#039",
								style: {
									color: "white",
								},
							},
						},
					},
					enabled: true,
					inputBoxWidth: 160,
					inputStyle: {
						color: "#039",
						fontWeight: "bold",
					},
					labelStyle: {
						color: "black",
						fontWeight: "bold",
					},
					buttons: [
						{
							type: "all",
							text: "All",
						},
						{
							type: "month",
							count: 1,
							text: "1m",
						},
						{
							type: "month",
							count: 2,
							text: "2m",
						},
						{
							type: "month",
							count: 3,
							text: "3m",
						},
						{
							type: "month",
							count: 6,
							text: "6m",
						},
						{
							type: "year",
							count: 1,
							text: "1y",
						},
						
					],
				},
				navigator: {
					enabled: true,
					liveRedraw: true,
					height: 30,
					top: 10,
					series: {
						type: "gantt",
						pointPlacement: 0.5,
						pointPadding: 0.25,
						accessibility: {
							enabled: false,
						},
					},
				},
				xAxis: [
					{
						grid: {
							// borderWidth: 0,
							borderColor: "#ccc",
						},
						currentDateIndicator: true,
						dateTimeLabelFormats: {
							day: '%e<br><span style="opacity: 0.7; font-size: 0.7em">%a</span>',
						},
						events: {
							afterSetExtremes: function () {
								const dateRange = this.max - this.min;

								if (dateRange < 30 * day) {
									this.update({
										tickInterval: day,
									});
								}
							},
						},
					},
					{
						grid: {
							borderColor: "#ccc",
						},
						dateTimeLabelFormats: {
							month: "%B",
						},
						tickInterval: day * 30,
						events: {
							afterSetExtremes: function () {
								const dateRange = this.max - this.min;

								if (dateRange > 150 * day) {
									this.update({
										dateTimeLabelFormats: {
											year: '%Y<br><span style="opacity: 0.7; font-size: 0.7em">&nbsp;</span>',
										},
										tickInterval: day * 365,
									});
								} else if (dateRange < 32 * day) {
									this.update({
										dateTimeLabelFormats: {
											month: "%B",
										},
										tickInterval: day * 30,
									});
								} else {
									this.update({
										dateTimeLabelFormats: {
											month: '%B<br><span style="opacity: 0.7; font-size: 0.7em">%Y</span>',
										},
										tickInterval: day * 30,
									});
								}
							},
						},
					},
				],
				yAxis: {
					type: "category",
					grid: {
						borderColor: "#ccc",
						paddingLeft: "10px",
						columns: [
							{
								title: {
									useHTML: true,
									text: `<div class='titleText' style='width: 328px;'>Tasks</div>`,
									y: -83,
									x: 0,
								},
								// categories: data.map(function (s) {
								// 	return `<div style="padding: 10px">${s.name}</div>`;
								// }),
								labels: {
									x: 20,
									useHTML: true,
									align: "left",
									formatter: function () {
										return data[this.value]?.name;
									},
									style: {
										fontSize: "14px",
										width: "300px",
										minWidth: "300px",
										textOverflow: "ellipsis",
										paddingLeft: "10px",
										boxSizing: "border-box",
									},
								},
							},
							{
								title: {
									useHTML: true,
									text: `<div class='titleText' style='width: 78px; border-left: none;'>Duration</div>`,
									y: -83,
									x: 0,
								},
								categories: data.map(function (s) {
									return s.duration + " days";
								}),
								labels: {
									style: {
										width: "100px",
										textOverflow: "ellipsis",
									},
								},
							},
							{
								title: {
									useHTML: true,
									text: `<div class='titleText' style='width: 100px; border-left: none;'>Start</div>`,
									y: -83,
									x: 0,
								},
								categories: data.map(function (s) {
									return dateFormat("%d/%m/%Y", s.start);
								}),
								labels: {
									style: {
										width: "200px",
										textOverflow: "ellipsis",
									},
								},
							},
							{
								title: {
									useHTML: true,
									text: `<div class='titleText' style='width: 100px; border-left: none;'>End</div>`,
									y: -83,
									x: 0,
								},
								categories: data.map(function (s) {
									return dateFormat("%d/%m/%Y", s.end);
								}),
								labels: {
									style: {
										width: "200px",
										textOverflow: "ellipsis",
									},
								},
							},
						],
					},
				},
			},
			function (chart) {
				//40 is a pixel value for one cell
				let chartHeight = 40 * chart.series[0].data.length;
				chart.update({
					chart: {
						height: chartHeight,
					},
				});
			}
		);
	});

	return <div id="gantt-chart-container" />;
};

export default GanttChart;
