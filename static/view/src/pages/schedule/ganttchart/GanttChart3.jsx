import React, { useEffect, useState } from "react";
import Highcharts, { find } from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import HighchartsDraggablePoints from "highcharts-draggable-points";
import HighchartsDraggablePoints from "highcharts/modules/draggable-points";
import HighchartsGantt from "highcharts/modules/gantt";
import * as AnnotationsModule from "highcharts/modules/annotations";
import { findObj } from "../pertchart/VisualizeTasks";
import { sampleData } from "./data";

const findClosestNode = (arr, node) => {
    console.log(node);
    console.log(arr);
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

        console.log(res);

		//make sure the distance is no longer than 10000000 milliseconds
		// if (
		// 	Math.abs(node.start - res.end) < 10000000 ||
		// 	Math.abs(node.start - res.start) < 10000000 ||
		// 	(node.start > res.start && node.end < res.end)
		// )
		// 	return res;
		// else return null;

        return res;
	}

	return null;
};

const GanttChart3 = () => {
	HighchartsGantt(Highcharts);
	HighchartsDraggablePoints(Highcharts);

    const [tasks, setTasks] = useState(sampleData);
    const [isChangeResource, setIsChangeResource] = useState(false);

	useEffect(() => {
		// Initialize the Highcharts Gantt module
		HighchartsGantt(Highcharts);

        var day = 1000 * 60 * 60 * 24,
			dateFormat = Highcharts.dateFormat;
		
		// Parse data into series.
		var data = tasks.map(function (task, i) {
			return {
				id: task.id,
				start: task.from,
				end: task.to,
				dependency: task.dependency,
				y: i,
				name: task.name,
				assignTo: task.assignees[0]?.name || "",
                type: "task",
			};
		});

		// Parse data into series.
		var data2 = tasks.map(function (task, i) {
			return {
				id: task.id,
				start: task.to,
				end: task.to,
				y: i,
				assignTo: task.assignees[0]?.name || "",
				color: "transparent",
				type: "resource",
			};
		});

		Highcharts.ganttChart("gantt-chart-container", {
			series: [
				{
					name: "",
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
					name: "",
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
						format: "{point.assignTo}",
						align: "left",
						style: {
							fontWeight: "normal",
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
									e.newPoint
								);
								if (closestNode) {
									//update resource to the closest node
									// console.log(closestNode);
									var newTask = findObj(
										tasks,
										closestNode.id
									);
									var oldResource = newTask.assignees[0];
									if (newTask) {
										newTask.assignees = [
											{
												name: e.origin.points[
													Object.keys(
														e.origin.points
													)[0]
												]?.point?.options?.assignTo,
											},
										];
									}

									var oldTask = findObj(
										tasks,
										e.origin.points[
											Object.keys(e.origin.points)[0]
										]?.point?.id
									);
									if (oldTask) {
										oldTask.assignees = [oldResource];
									}

									setTasks(tasks);
									setIsChangeResource(!isChangeResource);
								} else {
									//use to rerender to reset the node position
									setIsChangeResource(!isChangeResource);
								}
							},
						},
					},
				},
			],
			plotOptions: {
				connectors: {
					lineWidth: 2,
					radius: 5,
					startMarker: {
						enabled: false,
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
				// 		"<span>Assigned To: {point.assignTo}</span><br/><span>From: {point.start:%e. %b}</span><span> To: {point.end:%e. %b}</span>",
			},
			scrollbar: {
				enabled: true,
			},
			rangeSelector: {
				enabled: true,
				selected: 0,
			},
			navigator: {
				enabled: true,
				liveRedraw: true,
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
						borderWidth: 0,
					},
					currentDateIndicator: true,
					dateTimeLabelFormats: {
						day: '%e<br><span style="opacity: 0.5; font-size: 0.7em">%a</span>',
					},
					tickInterval: day,
				},
				{
					dateTimeLabelFormats: {
						month: "%B",
					},
					tickInterval: day * 30,
				},
			],
			yAxis: {
				type: "category",
				grid: {
					columns: [
						{
							title: {
								text: "Tasks",
							},
							categories: data.map(function (s) {
								return `<div style='padding: '10px'>${
									s.name
								}<br> <span style="opacity: 0.5; font-size: 0.7em">${dateFormat("%e %b", s.start) + "-" + dateFormat("%e %b", s.end)}</span></div>`;
							}),
							labels: {
								align: "left",
								style: {
									width: "300px",
									textOverflow: "ellipsis",
								},
							},
						},
						{
							title: {
								text: "PIC",
							},
							categories: data.map(function (s) {
								return s.assignTo;
							}),
							labels: {
								align: "left",
								style: {
									width: "300px",
									textOverflow: "ellipsis",
								},
							},
						},
					],
				},
			},
		});
	});

	return <div id="gantt-chart-container" />;
};

export default GanttChart3;
