import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import GanttChartPage from "../ganttchart/GanttChartPage";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import { Grid, GridColumn } from "@atlaskit/page";
import Pagination from "@atlaskit/pagination";
import Spinner from "@atlaskit/spinner";
import { getCache } from "../../../common/utils";

/**
 * Using as Page to show pert chart and task dependences
 * @returns {import("react").ReactElement}
 */
function ResultPage({ handleChangeTab }) {
	let { projectId } = useParams();

	var project = getCache("project");
	if (!project) {
		
	} else {
		project = JSON.parse(project);
	}

	const actionsContent = (
		<ButtonGroup>
			<Button onClick={() => handleChangeTab(2)}>Reschedule</Button>
		</ButtonGroup>
	);

	const [solutions, setSolutions] = useState([]);
	const [total, setTotal] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageLoading, setPageLoading] = useState(true);

	var totalPages =
		total % pageSize > 0 ? total / pageSize + 1 : total / pageSize;
	var pages = [];
	for (let i = 0; i < totalPages; i++) {
		pages.push(i + 1);
	}
	useEffect(
		function () {
			invoke("getSolutionsByProject", { projectId, page: pageIndex })
				.then(function (res) {
					setPageLoading(false);
					if (res) {
						console.log(res);
						setSolutions(res.values);
						setTotal(res.total);
						setPageSize(res.pageSize);
						setPageIndex(res.pageIndex);
					}
				})
				.catch((error) => {
					setPageLoading(false);
					console.log(error);
					Toastify.error(error.toString());
				});
		},
		[pageIndex]
	);

	const [selectedSolution, setSelectedSolution] = useState(null);

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
				isSortable: true,
				width: 25,
			},
			{
				key: "action",
				shouldTruncate: true,
			},
		],
	};

	// var content = [{id: 1, name: "s1"}];
	// const rows = solutions.map((s, index) => ({
	// 	key: `row-${s.id}`,
	// 	isHighlighted: false,
	// 	cells: [
	// 		{
	// 			key: index,
	// 			content: (
	// 				<Button
	// 					appearance="subtle-link"
	// 					onClick={() => setSelectedSolution(s)}
	// 				>
	// 					{"Solution #" + s.id}
	// 				</Button>
	// 			),
	// 		},
	// 		{
	// 			key: index,
	// 			content: s.duration + " days",
	// 		},
	// 		{
	// 			key: index,
	// 			content: "$" + s.cost,
	// 		},
	// 		{
	// 			key: index,
	// 			content: s.quality + "%",
	// 		},
	// 		{
	// 			key: "option",
	// 			content: (
	// 				<Button onClick={() => setSelectedSolution(s)}>View</Button>
	// 			),
	// 		},
	// 	],
	// }));

	const handleChangePage = (e) => {
		setPageLoading(true);
		setPageIndex(e.currentTarget.getAttribute("page"));
	};

	return (
		<div style={{ width: "100%", height: "90vh" }}>
			{selectedSolution !== null ? (
				<GanttChartPage
					setSelectedSolution={setSelectedSolution}
					selectedSolution={selectedSolution}
				/>
			) : (
				<>
					<PageHeader actions={actionsContent}>
						Solution optimizations
					</PageHeader>
					<h3 style={{ marginBottom: "15px" }}>
						Total number of solutions: {total}
					</h3>
					{/* <DynamicTable
						head={head}
						rows={rows}
						isFixedSize
						defaultSortKey="no"
						defaultSortOrder="DESC"
						onSort={() => console.log("onSort")}
						// isLoading={isLoading}
						emptyView={<h2>No feasible solutions!</h2>}
					/> */}
					{pageLoading ? (
					<Spinner size="large" />) : (
					<Grid layout="fluid" spacing="comfortable" columns={12}>
						{solutions.map((solution) => {
							let since = solution.since ? new Date(solution.since) : null;
							return (
								<GridColumn medium={3}>
									<div
										style={{
											padding: "20px",
											marginBottom: "20px",
											boxShadow: "2px 2px 2px #e3e3e3",
											border: "1px solid #e3e3e3",
											borderRadius: "8px",
										}}
									>
										<h3
											style={{ cursor: "pointer" }}
											// onClick={() =>
											// 	setSelectedSolution(solution)
											// }
										>
											Solution #{solution.id}
										</h3>
										<div>
											 {since ? "Generated at: " + since.toLocaleTimeString() + " " + since.toDateString() : ""}
										</div>
										<div>
											Duration: <b>{solution.duration}</b>{" "}
											days
										</div>
										<div>
											Total cost: <b>{solution.cost}</b>{" "}
											{project.budgetUnit}
										</div>
										<div>
											Quality: <b>{solution.quality}</b>%
										</div>

										<Button
											style={{ marginTop: "10px" }}
											appearance="primary"
											onClick={() =>
												setSelectedSolution(solution)
											}
										>
											View
										</Button>
									</div>
								</GridColumn>
							);
						})}
					</Grid>
					)}
					<Pagination
						nextLabel="Next"
						label="Page"
						pageLabel="Page"
						pages={pages}
						previousLabel="Previous"
						onChange={handleChangePage}
						selectedIndex={pageIndex - 1}
					/>
				</>
			)}
		</div>
	);
}

export default ResultPage;
