import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import GanttChartPage from "../ganttchart/GanttChartPage";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import { formatDateDMY, getCache } from "../../../common/utils";
import EmptyState from "@atlaskit/empty-state";
import { ROW_PER_PAGE } from "../../../common/contants";
import "./style.css";
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import DeleteScheduleModal from "./modal/DeleteScheduleModal";
import UpdateScheduleModal from "./modal/UpdateScheduleModal";

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
			<Button appearance="primary" onClick={() => {handleChangeTab(2); setPageLoading(true);}}>
				Reschedule
			</Button>
		</ButtonGroup>
	);

	const [solutions, setSolutions] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);

	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isViewDetail, setIsViewDetail] = useState(false);

	const updateSchedules = (solutions) => {
		setSolutions(solutions);
	};

	useEffect(
		function () {
			if (pageLoading) {
				invoke("getSolutionsByProject", { projectId })
					.then(function (res) {
						setPageLoading(false);
						if (res) {
							setSolutions(res.values);
						}
					})
					.catch((error) => {
						setPageLoading(false);
						console.log(error);
						Toastify.error(error.toString());
					});
			}
		}
	);

	const [selectedSolution, setSelectedSolution] = useState(null);

	const head = {
		cells: [
			{
				key: "name",
				content: "Name",
				isSortable: true,
				width: 20,
			},
			{
				key: "duration",
				content: "Duration",
				isSortable: true,
				width: 10,
			},
			{
				key: "cost",
				content: "Total cost",
				isSortable: true,
				width: 10,
			},
			{
				key: "quality",
				content: "Total Experiences",
				isSortable: true,
				width: 15,
			},
			{
				key: "description",
				content: "Note",
				shouldTruncate: true,
				width: 30,
			},
			{
				key: "action",
				shouldTruncate: true,
			},
		],
	};

	const rows = solutions.map((s, index) => {
		let since = "N/A";
		if (s.since) {
			since = formatDateDMY(s.since);
		}
		return {
			key: `row-${s.id}`,
			isHighlighted: false,
			cells: [
				{
					key: index,
					content: (
						<>
							<Button
								appearance="subtle-link"
								onClick={() => {
									setSelectedSolution(s);
									setIsViewDetail(true);
								}}
							>
								<div>{s.title || "Schedule #" + s.id}</div>
							</Button>
							<div className="subtitle solution-type">
								{s.type === 0
									? "System generated"
									: "Saved by user"}{" "}
								at {since}
							</div>
						</>
					),
				},
				{
					key: index,
					content: s.duration + " days",
				},
				{
					key: index,
					content: project.budgetUnit + "" + s.cost,
				},
				{
					key: index,
					content: s.quality,
				},
				{
					key: index,
					content: s.desciption || "",
				},
				{
					key: "option",
					content: (
						<div className="actions">
							<ButtonGroup>
								<Button
									appearance="subtle"
									onClick={() => {
										setSelectedSolution(s);
										setIsViewDetail(true);
									}}
									title="View"
								>
									<WatchFilledIcon />
								</Button>
								<Button
									appearance="subtle"
									onClick={() => {
										setSelectedSolution(s);
										setIsModalEditOpen(true);
										setIsViewDetail(false);
									}}
								>
									<EditIcon />
								</Button>
								<Button
									appearance="subtle"
									onClick={() => {
										setSelectedSolution(s);
										setIsModalDeleteOpen(true);
										setIsViewDetail(false);
									}}
									title="Delete"
								>
									<TrashIcon />
								</Button>
							</ButtonGroup>
						</div>
					),
				},
			],
		};
	});

	return (
		<div
			className="solutions-list"
			style={{ width: "100%", height: "90vh" }}
		>
			{selectedSolution !== null && isViewDetail ? (
				<GanttChartPage
					setSelectedSolution={setSelectedSolution}
					selectedSolution={selectedSolution}
				/>
			) : (
				<>
					<PageHeader actions={actionsContent}>
						Solution optimizations
					</PageHeader>
					<h6 style={{ marginBottom: "10px" }}>
						Total number of solutions: {solutions.length}
					</h6>
					<DynamicTable
						head={head}
						rows={rows}
						rowsPerPage={ROW_PER_PAGE}
						defaultPage={1}
						page={1}
						isFixedSize
						// defaultSortKey="name"
						// defaultSortOrder="DESC"
						onSort={() => console.log("onSort")}
						isLoading={pageLoading}
						emptyView={
							<EmptyState
								header="Empty"
								description="Look like there is no schedule solution yet."
								primaryAction={
									<Button
										appearance="primary"
										onClick={() => handleChangeTab(2)}
									>
										Schedule
									</Button>
								}
							/>
						}
					/>

					{isModalDeleteOpen ? (
						<DeleteScheduleModal
							setIsOpen={setIsModalDeleteOpen}
							schedule={selectedSolution}
							setSelectedSolution={setSelectedSolution}
							schedules={solutions}
							updateSchedules={updateSchedules}
						/>
					) : (
						""
					)}

					{isModalEditOpen ? (
						<UpdateScheduleModal
							isOpen={isModalEditOpen}
							setIsOpen={(isOpen) =>
								setIsModalEditOpen(isOpen)
							}
							schedules={solutions}
							updateSchedules={(solutions) =>
								setSolutions(solutions)
							}
							selectedSolution={selectedSolution}
							updateSelectedSolution={(solution) => setSelectedSolution(solution)}
						></UpdateScheduleModal>
					) : (
						""
					)}
				</>
			)}
		</div>
	);
}

export default ResultPage;
