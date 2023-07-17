import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import GanttChartPage from "../ganttchart/GanttChartPage";

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function ResultPage({ handleChangeTab }) {
	let { projectId } = useParams();

	const actionsContent = (
		<ButtonGroup>
			<Button onClick={() => handleChangeTab(2)}>Reschedule</Button>
		</ButtonGroup>
	);

	const [solutions, setSolutions] = useState([]);
	useEffect(function(){
		var solutionCache = localStorage.getItem("solutions");
		console.log(JSON.parse(solutionCache));
		if (solutionCache){
			setSolutions(JSON.parse(solutionCache));
		}
	}, [])

    const [selectedSolution, setSelectedSolution] = useState(null)

    function goToGantt(){
        
    }

	const head = {
		cells: [
			{
				key: "no",
				content: "No",
				isSortable: true,
				width: 15,
			},
			{
				key: "duration",
				content: "Duration",
				shouldTruncate: true,
				isSortable: true,
				width: 25,
			},
			{
				key: "cost",
				content: "Cost",
				shouldTruncate: true,
				isSortable: true,
				width: 25,
			},
			{
				key: "quality",
				content: "Quality",
				shouldTruncate: true,
				width: 25,
			},
			{
				key: "action",
				shouldTruncate: true,
			},
		],
	};

    var content = [{id: 1, name: "s1"}];
	const rows = content.map((data, index) => ({
		key: `row-${index + 1}`,
		isHighlighted: false,
		cells: [
			{
				key: index,
				content: (
					<Button
						appearance="subtle-link"
						onClick={() => setSelectedSolution(index)}
					>
						{"Solution #" + index + 1}
					</Button>
				),
			},
			{
				key: index,
				content: "123 days",
			},
			{
				key: index,
				content: "$100,00",
			},
			{
				key: index,
				content: "120%",
			},
			{
				key: "option",
				content: (
					<Button
						appearance="primary"
						onClick={() => setSelectedSolution(index)}
					>
						View
					</Button>
				),
			},
		],
	}));
	return (
		<div style={{ width: "100%", height: "90vh" }}>
			{selectedSolution !== null ? (
				<GanttChartPage setSelectedSolution={setSelectedSolution} index={selectedSolution} />
			) : (
				<>
					<PageHeader actions={actionsContent}>
						Solution optimizations
					</PageHeader>

					<h2>Number of feasible solutions: {2}</h2>

					<DynamicTable
						head={head}
						rows={rows}
						isFixedSize
						defaultSortKey="no"
						defaultSortOrder="DESC"
						onSort={() => console.log("onSort")}
						// isLoading={isLoading}
						emptyView={<h2>No feasible solutions!</h2>}
					/>
				</>
			)}
		</div>
	);
}

export default ResultPage;
