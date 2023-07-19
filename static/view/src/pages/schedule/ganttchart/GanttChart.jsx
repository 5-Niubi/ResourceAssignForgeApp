import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsGantt from "highcharts/modules/gantt";

const GanttChart = () => {
	useEffect(() => {
		// Initialize the Highcharts Gantt module
		HighchartsGantt(Highcharts);

		//Define data
		// Set to 00:00:00:000 today
		var today = new Date(),
			day = 1000 * 60 * 60 * 24,
			dateFormat = Highcharts.dateFormat;

		// Set to 00:00:00:000 today
		today.setUTCHours(0);
		today.setUTCMinutes(0);
		today.setUTCSeconds(0);
		today.setUTCMilliseconds(0);
		today = today.getTime();

		var tasks = [
			{
				id: "1",
				name: "Task 1",
				current: 0,
				from: today - 1 * day,
				to: today + 2 * day,
				dependency: "",
				assignees: [
					{
						name: "Lisa Star",
					},
					{
						name: "Shane Long",
					},
					{
						name: "Jack Coleman",
					},
				],
				equipments: [
					{
						name: "Hailie Marshall",
					},
					{
						name: "Morgan Nicholson",
					},
					{
						name: "William Harriet",
					},
				],
			},
			{
				id: "2",
				name: "Task 2",
				current: 0,
				dependency: "1",
				from: today - 2 * day,
				to: today + 1 * day,
				assignees: [
					{
						name: "Martin Hammond",
					},
					{
						name: "Linda Jackson",
					},
					{
						name: "Robert Sailor",
					},
				],
				equipments: [
					{
						name: "Hailie Marshall",
					},
					{
						name: "Morgan Nicholson",
					},
					{
						name: "William Harriet",
					},
				],
			},
			{
				id: "3",
				name: "Task 3",
				current: 0,
				dependency: "1",
				from: today + 0 * day,
				to: today + 3 * day,
				assignees: [
					{
						name: "Mona Ricci",
					},
					{
						name: "Jane Dockerman",
					},
					{
						name: "Bob Shurro",
					},
				],
				equipments: [
					{
						name: "Hailie Marshall",
					},
					{
						name: "Morgan Nicholson",
					},
					{
						name: "William Harriet",
					},
				],
			},
			{
				id: "4",
				name: "Task 4",
				current: 0,
				dependency: "",
				from: today - 1 * day,
				to: today + 1 * day,
				assignees: [
					{
						name: "Hailie Marshall",
					},
				],
				equipments: [
					{
						name: "Hailie Marshall",
					},
					{
						name: "Morgan Nicholson",
					},
					{
						name: "William Harriet",
					},
				],
			},
			{
				id: "5",
				name: "Task 5",
				current: 0,
				dependency: "4",
				from: today - 50 * day,
				to: today - 48 * day,
				assignees: [
					{
						name: "Harry Peterson",
					},
					{
						name: "Emma Wilson",
					},
					{
						name: "Ron Donald",
					},
				],
				equipments: [
					{
						name: "Hailie Marshall",
					},
					{
						name: "Morgan Nicholson",
					},
					{
						name: "William Harriet",
					},
				],
			},
		];

		// Parse car data into series.
		var data = tasks.map(function (task, i) {
			var assignTo = task.assignees.map(function (assignee) {
				return assignee.name;
			});
			assignTo = assignTo.join(", ");

			var equipments = task.equipments.map(function (e) {
				return e.name;
			});
			equipments = equipments.join(", ");
			
			return {
				id: task.id,
				start: task.from,
				end: task.to,
				dependency: task.dependency,
				y: i,
				name: task.name,
				assignTo: assignTo,
				equipments: equipments,
			};
		});

		Highcharts.ganttChart("gantt-chart-container", {
			series: [
				{
					name: "",
					data: data,
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
				series: {
					// dataLabels: {
					// 	enabled: true,
					// 	format: "{point.resources}",
					// 	style: {
					// 		fontWeight: "normal",
					// 	},
					// },
				},
			},
			title: {
				text: "",
			},
			tooltip: {
				pointFormat:
					"<span>Assigned To: {point.assignTo}</span><br/><span>Equipments: {point.equipments}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>",
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
								return `${
									s.name
								}<br><span style="opacity: 0.5; font-size: 0.7em">${dateFormat("%e %b", s.start) + "-" + dateFormat("%e %b", s.end)}</span>`;
							}),
						},
						{
							title: {
								text: "Assignees",
							},
							categories: data.map(function (s) {
								return s.assignTo;
							}),
						},
					],
				},
			},
		});
	}, []);

	return <div id="gantt-chart-container" />;
};

export default GanttChart;
