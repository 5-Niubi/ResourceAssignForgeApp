import React, { useEffect, useRef } from "react";
import * as go from "gojs";
import "gojs/extensions/DrawCommandHandler";
import "gojs/extensions/Figures";
import "gojs/extensions/GeometryReshapingTool";
import "./style.css";

const GanttChart2 = () => {
    const diagramRef = useRef(null);
	useEffect(() => {
		// Create a new GoJS diagram
		var $ = go.GraphObject.make;

		var myDiagram = $(go.Diagram, diagramRef.current, {
			"undoManager.isEnabled": true,
		});

		// Define the template for each task
		myDiagram.nodeTemplate = $(
			go.Node,
			"Auto",
			{ selectable: false },
			$(go.Shape, "RoundedRectangle", {
				fill: "lightblue",
				strokeWidth: 0,
			}),
			$(
				go.Panel,
				"Vertical",
				$(
					go.TextBlock,
					{
						margin: 3,
						font: "bold 12px sans-serif",
						stroke: "black",
						textAlign: "center",
					},
					new go.Binding("text", "key")
				),
				$(
					go.TextBlock,
					{
						margin: 3,
						font: "12px sans-serif",
						stroke: "black",
						textAlign: "center",
					},
					new go.Binding("text", "name")
				),
				$(
					go.Panel,
					"Vertical",
					{
						defaultStretch: go.GraphObject.Vertical,
					},
					new go.Binding("itemArray", "resources"),
					{
						itemTemplate: $(
							go.Panel,
							"Horizontal",
							{
								// className: "resource",
								cursor: "move",
							},
							$(
								go.TextBlock,
								{
									margin: 2,
									font: "11px sans-serif",
								},
								new go.Binding("text", "name")
							)
						),
					}
				)
			)
		);

		// Define the data for the diagram
		var nodeDataArray = [
			{
				key: 1,
				name: "Task 1",
				start: "2023-07-16",
				end: "2023-07-20",
				resources: [
					{ key: 101, name: "Resource 1" },
					{ key: 102, name: "Resource 2" },
				],
			},
			{
				key: 2,
				name: "Task 2",
				start: "2023-07-18",
				end: "2023-07-23",
				resources: [],
			},
			{
				key: 3,
				name: "Task 3",
				start: "2023-07-20",
				end: "2023-07-25",
				resources: [],
			},
			{
				key: 4,
				name: "Task 4",
				start: "2023-07-21",
				end: "2023-07-24",
				resources: [],
			},
			{
				key: 5,
				name: "Task 5",
				start: "2023-07-23",
				end: "2023-07-27",
				resources: [],
			},
		];

		// Define the dependency data for the diagram
		var linkDataArray = [
			{ from: 1, to: 2 },
			{ from: 1, to: 3 },
			{ from: 2, to: 4 },
			{ from: 3, to: 5 },
		];

		// Generate the HTML table based on the Gantt chart data
		function generateTable() {
			var tableContainer = document.getElementById("tableContainer");

			var table = document.createElement("table");
			var thead = document.createElement("thead");
			var tbody = document.createElement("tbody");

			// Create the table header rows
			var startDate = new Date("2023-07-16");
			var endDate = new Date("2023-07-27");
			var dateRange = [];
			while (startDate <= endDate) {
				dateRange.push(startDate);
				startDate.setDate(startDate.getDate() + 1);
			}

			// Create the first header row for month and year
			var monthYearRow = document.createElement("tr");
			var monthYearCell = document.createElement("th");
			monthYearCell.colSpan = dateRange.length + 1;
			monthYearCell.innerText = getMonthYear(dateRange[0]);
			monthYearRow.appendChild(monthYearCell);
			thead.appendChild(monthYearRow);

			// Create the second header row for dates
			var datesRow = document.createElement("tr");
			var emptyCell = document.createElement("th");
			datesRow.appendChild(emptyCell);

			for (var i = 0; i < dateRange.length; i++) {
				var dateCell = document.createElement("th");
				dateCell.innerText = dateRange[i].getDate();
				datesRow.appendChild(dateCell);
			}

			thead.appendChild(datesRow);
			table.appendChild(thead);

			// Create the table rows for each task
			for (var j = 0; j < nodeDataArray.length; j++) {
				var task = nodeDataArray[j];
				var row = document.createElement("tr");

				var taskNameCell = document.createElement("td");
				taskNameCell.innerText = task.name;
				row.appendChild(taskNameCell);

				for (var k = 0; k < dateRange.length; k++) {
					var dateCell = document.createElement("td");
					dateCell.style.backgroundColor = "lightgray";
					if (isDateInRange(dateRange[k], task.start, task.end)) {
						dateCell.style.backgroundColor = "lightblue";
						dateCell.appendChild(createTaskDiv(task));
					}
					row.appendChild(dateCell);
				}

				tbody.appendChild(row);
			}

			table.appendChild(tbody);
			tableContainer.appendChild(table);
		}

		// Get the month and year string from a Date object
		function getMonthYear(date) {
			var months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			];
			var month = months[date.getMonth()];
			var year = date.getFullYear();
			return month + " " + year;
		}

		// Check if a date is within the range of start and end dates
		function isDateInRange(date, start, end) {
			var d = new Date(date);
			var s = new Date(start);
			var e = new Date(end);
			return d >= s && d <= e;
		}

		// Create the div element for the task
		function createTaskDiv(task) {
			var div = document.createElement("div");
			div.className = "task";
			div.innerText = task.name;

			// Add dependencies
			if (linkDataArray) {
				var dependencies = linkDataArray.filter(function (link) {
					return link.to === task.key;
				});
				if (dependencies.length > 0) {
					var dependenciesDiv = document.createElement("div");
					dependenciesDiv.className = "dependencies";
					for (var i = 0; i < dependencies.length; i++) {
						var dependency = dependencies[i];
						var dependencySpan = document.createElement("span");
						dependencySpan.innerText = "←" + dependency.from;
						dependenciesDiv.appendChild(dependencySpan);
					}
					div.appendChild(dependenciesDiv);
				}
			}

			// Add resources
			if (task.resources && task.resources.length > 0) {
				var resourcesDiv = document.createElement("div");
				resourcesDiv.className = "resources";
				for (var j = 0; j < task.resources.length; j++) {
					var resource = task.resources[j];
					var resourceDiv = document.createElement("div");
					resourceDiv.className = "resource";
					resourceDiv.innerText = resource.name;
					resourceDiv.draggable = true;
					resourceDiv.addEventListener("dragstart", function (e) {
						e.dataTransfer.setData(
							"text",
							JSON.stringify(resource)
						);
					});
					resourcesDiv.appendChild(resourceDiv);
				}
				div.appendChild(resourcesDiv);
			}

			return div;
		}
		generateTable();
	}, []);

	return (
		<>
			{/* <div
				ref={diagramRef}
				className="gantt-chart-container"
				style={{ height: "60vh", width: "100%" }}
			></div> */}
			<div id="tableContainer" ref={diagramRef}></div>
		</>
	);
};

export default GanttChart2;
