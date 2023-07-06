import React, { useEffect, useRef } from "react";
import * as go from "gojs";
import "gojs/extensions/DrawCommandHandler";
import "gojs/extensions/Figures";
import "gojs/extensions/GeometryReshapingTool";

const PertChart2 = ({
	tasks,
	selectedTasks,
	updateCurrentTask,
	updateTasks,
}) => {
	const diagramRef = useRef(null);

	// colors used, named for easier identification
	var blue = "#0288D1";
	var pink = "#B71C1C";
	var pinkfill = "#F8BBD0";
	var bluefill = "#B3E5FC";

	useEffect(() => {
		const $ = go.GraphObject.make;

		//init diagram and initial settings
		const diagram = $(go.Diagram, diagramRef.current, {
			// "draggingTool.dragsLink": true,
			"linkingTool.portGravity": 20,
			"relinkingTool.portGravity": 20,
			"relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
				segmentIndex: 0,
				cursor: "pointer",
				desiredSize: new go.Size(8, 8),
				fill: "tomato",
				stroke: "darkred",
			}),
			"relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
				segmentIndex: -1,
				cursor: "pointer",
				desiredSize: new go.Size(8, 8),
				fill: "darkred",
				stroke: "tomato",
			}),
			"relinkingTool.reconnectLink": function (
				existinglink,
				newnode,
				newport,
				toend
			) {
				// this example assumes only one port per node
				var fromnode = existinglink.fromNode;
				var tonode = existinglink.toNode;
				console.log(newnode);
				console.log(fromnode);
				console.log(tonode);
				// this assumes it's a GraphLinksModel, not a TreeModel:
				diagram.model.removeLinkData(existinglink.data);
				if (toend) {
					diagram.model.addLinkData({
						from: fromnode.key,
						to: newnode.key,
					});
				} else {
					diagram.model.addLinkData({
						from: newnode.key,
						to: tonode.key,
					});
				}
			},
			"linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
				desiredSize: new go.Size(7, 7),
				fill: "lightblue",
				stroke: "deepskyblue",
			}),
			"undoManager.isEnabled": true,
		});

		const findTaskById = (id) => {
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].key == id) {
					return tasks[i];
				}
			}
			return null;
		};

		diagram.addDiagramListener("LinkDrawn", (e) => {
			var link = e.subject;
			var fromNode = link.fromNode;
			var toNode = link.toNode;
			// console.log(fromNode.ub);
			// console.log(toNode.ub);
			// console.log(diagram.model.linkDataArray);

			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].key == toNode.key) {
					tasks[i].precedence.push(fromNode.key);
                    updateCurrentTask(tasks[i]);
				}
			}
			updateTasks(tasks);
		});

		diagram.addDiagramListener("Modified", (e) => {
			// console.log(e);
			// var button = document.getElementById("SaveButton");
			// if (button) button.disabled = !diagram.isModified;
			// var idx = document.title.indexOf("*");
			// if (diagram.isModified) {
			// 	if (idx < 0) document.title += "*";
			// } else {
			// 	if (idx >= 0) document.title = document.title.slice(0, idx);
			// }
		});

		diagram.nodeTemplate = createNodeTemplate();
		diagram.linkTemplate = createLinkTemplate();
		diagram.model = createDiagramModel(selectedTasks);

		// Perform any additional initialization or configuration here

		return () => {
			// Perform any necessary cleanup here
			diagram.div = null;
		};
	}, [selectedTasks]); //call useEffect each time selectedTasks changed

	// Define a function for creating a "port" that is normally transparent.
	// The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
	// and where the port is positioned on the node, and the boolean "output" and "input" arguments
	// control whether the user can draw links from or to the port.
	function makePort(name, spot, output, input) {
		const $ = go.GraphObject.make;
		// the port is basically just a small transparent circle
		return $(go.Shape, "Circle", {
			fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
			stroke: null,
			desiredSize: new go.Size(7, 7),
			alignment: spot, // align the port on the main Shape
			alignmentFocus: spot, // just inside the Shape
			portId: name, // declare this object to be a "port"
			fromSpot: spot,
			toSpot: spot, // declare where links may connect at this port
			fromLinkable: output,
			toLinkable: input, // declare whether the user may draw links to/from here
			cursor: "pointer", // show a different cursor to indicate potential link point
		});
	}

	function showSmallPorts(node, show) {
		node.ports.each((port) => {
			if (port.portId !== "") {
				// don't change the default port, which is the big shape
				port.fill = show ? "rgba(0,0,0,.3)" : null;
			}
		});
	}

	function createNodeTemplate() {
		const $ = go.GraphObject.make;

		var nodeSelectionAdornmentTemplate = $(
			go.Adornment,
			"Auto",
			$(go.Shape, {
				fill: null,
				stroke: "deepskyblue",
				strokeWidth: 1.5,
				strokeDashArray: [4, 2],
			}),
			$(go.Placeholder)
		);

		return $(
			go.Node,
			"Auto",
			{
				desiredSize: new go.Size(150, NaN),
			},
			{
				selectable: true,
				selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
			},
			$(
				go.Shape,
				"RoundedRectangle",
				{ fill: "white", strokeWidth: 2 },
				new go.Binding("fill", "critical", (b) =>
					b ? pinkfill : bluefill
				),
				new go.Binding("stroke", "critical", (b) => (b ? pink : blue))
			),
			$(
				go.Panel,
				"Table",
				{
					padding: 0.5,
					desiredSize: new go.Size(150, NaN),
				},
				$(go.RowColumnDefinition, {
					row: 0,
					separatorStroke: "black",
				}),
				$(go.RowColumnDefinition, {
					row: 1,
					separatorStroke: "black",
					background: "white",
				}),
				$(
					go.TextBlock,
					{
						row: 0,
						column: 0,
						margin: 5,
						textAlign: "center",
					},
					new go.Binding(
						"text",
						"duration",
						(duration) => "Duration: " + duration
					)
				),

				$(go.TextBlock, new go.Binding("text", "name"), {
					row: 1,
					column: 0,
					margin: 5,
					textAlign: "center",
					font: "bold 14px sans-serif",
					maxSize: new go.Size(150, NaN), // Maximum width for truncation
					overflow: go.TextBlock.OverflowEllipsis, // Truncate overflowing text
					maxLines: 1, // Restrict to a single line
				})
			), // end Table Panel
			// four small named ports, one on each side:
			makePort("T", go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, true, false),
			{
				// handle mouse enter/leave events to show/hide the ports
				mouseEnter: (e, node) => showSmallPorts(node, true),
				mouseLeave: (e, node) => showSmallPorts(node, false),
				click: (e, obj) => {
					updateCurrentTask(obj.part.data);
				},
				// selectionChanged: (part) => {
				// 	// var shape = part.elt(0);
				// 	// shape.stroke = part.isSelected ? "blue" : (part.data.critical ? pink : blue);
				//     updateCurrentTask(part.data);
				// },
			}
		);
	}

	function linkColorConverter(linkdata, elt) {
		var link = elt.part;
		if (!link) return blue;
		var f = link.fromNode;
		if (!f || !f.data || !f.data.critical) return blue;
		var t = link.toNode;
		if (!t || !t.data || !t.data.critical) return blue;
		return pink; // when both Link.fromNode.data.critical and Link.toNode.data.critical
	}

	function createLinkTemplate() {
		const $ = go.GraphObject.make;

		var linkSelectionAdornmentTemplate = $(
			go.Adornment,
			"Link",
			$(
				go.Shape,
				// isPanelMain declares that this Shape shares the Link.geometry
				{
					isPanelMain: true,
					fill: null,
					stroke: "deepskyblue",
					strokeWidth: 0,
				}
			) // use selection object's strokeWidth
		);

		return $(
			go.Link,
			{
				selectable: true,
				selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
			},
			{ relinkableFrom: true, relinkableTo: true, reshapable: true },
			{
				routing: go.Link.AvoidsNodes,
				curve: go.Link.JumpOver,
				corner: 5,
				toShortLength: 4,
			},
			$(
				go.Shape, // the link path shape
				{ strokeWidth: 4 },
				new go.Binding("stroke", "", linkColorConverter)
			),
			$(
				go.Shape, // the arrowhead
				{ toArrow: "Triangle", stroke: null, scale: 1.5 },
				new go.Binding("fill", "", linkColorConverter)
			)
		);
	}

	function createDiagramModel(tasks) {
		const $ = go.GraphObject.make;

		//check if precedence tasks is existed in the selected tasks list or not
		const existed = (id) => {
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].key == id) {
					return true;
				}
			}
			return false;
		};

		//get all link from precedence tasks pre-defined
		var links = [];
		tasks.forEach((task) =>
			task.precedence.forEach((pre) =>
				existed(pre) ? links.push({ from: pre, to: task.key }) : null
			)
		);

		return $(go.GraphLinksModel, {
			nodeDataArray: tasks,
			linkDataArray: links,
		});
	}

	return (
		<div
			ref={diagramRef}
			className="diagram-component"
			style={{ height: "40vh", width: "100%" }}
		></div>
	);
};

export default PertChart2;
