import React, { createContext, useCallback, useEffect, useState } from "react";
import { render } from "react-dom";
import GanttChartStats from "./GanttChartStat";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import GanttChart from "./GanttChart";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";
import JiraExport from "../../../components/export/JiraExport";
import OtherExport from "../../../components/export/OtherExport";
import { cache, extractErrorMessage, findObj } from "../../../common/utils";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import { LoadingButton } from "@atlaskit/button";

const initModalExportState = {
	data: {},
	isModalOpen: false,
};

const scheduleExportDefaultValue = {
	id: 0,
};
export const ScheduleExportContext = createContext(scheduleExportDefaultValue);
/**
 * Using as Page to show gantt chart as a result
 * @returns {import("react").ReactElement}
 */
function GanttChartPage({ setSelectedSolution, selectedSolution }) {
	// --- state ---
	const jiraExportModalState = useState(initModalExportState);
	const [jiraExportState, setJiraExportState] = jiraExportModalState;
	const openJiraExportModal = useCallback(
		() => setJiraExportState((prev) => ({ ...prev, isModalOpen: true })),
		[]
	);
	// ------

	// ----state ----
	const otherExport = useState(initModalExportState);
	const [otherExportState, setOtherExportState] = otherExport;
	const openOtherExportModal = useCallback(
		() => setOtherExportState((prev) => ({ ...prev, isModalOpen: true })),
		[]
	);
	// ------

	const [isModified, setIsModified] = useState(false);
	const [workforce, setWorkforce] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [solutionTasks, setSolutionTasks] = useState([]);

	var tasksChanged = solutionTasks;
	const updateTasksChanged = (tasks) => (tasksChanged = tasks);

	// useEffect(() => {
	// 	if (selectedSolution) {
	// 		setSolutionTasks(JSON.parse(selectedSolution.tasks));
	// 	}
	// }, []);

	const handleSaveSolution = function () {
		setIsSubmitting(true);
		selectedSolution.tasks = JSON.stringify(tasksChanged);
		var solutionReq = JSON.parse(JSON.stringify(selectedSolution));
		solutionReq.type = 1;
		invoke("saveSolution", { solutionReq })
			.then(function (res) {
				setIsSubmitting(false);
				if (res.id) {
					Toastify.success("Saved successfully");
					setSelectedSolution(null);
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	};

	useEffect(() => {
		invoke("getSchedule", { scheduleId: selectedSolution.id })
			.then(function (res) {
				if (res) {
					setSolutionTasks(JSON.parse(res.tasks));
				}
			})
			.catch((error) => {
				console.log(error);
				Toastify.error(error.toString());
			});

		invoke("getAllWorkforces")
			.then(function (res) {
				if (res) {
					cache("gantt-workforce", JSON.stringify(res));
					setWorkforce(res);
				}
			})
			.catch((error) => {
				console.log(error);
				var err = extractErrorMessage(error);
				Toastify.error(err.message);
			});
	}, []);

	const actionsContent = (
		<ButtonGroup>
			{isModified ? (
				<LoadingButton
					appearance="primary"
					onClick={handleSaveSolution}
					isLoading={isSubmitting}
				>
					Save as new solution
				</LoadingButton>
			) : (
				<>
					<Button appearance="subtle" onClick={openOtherExportModal}>
						Export to MS Project
					</Button>
					<Button appearance="primary" onClick={openJiraExportModal}>
						Export to Jira
					</Button>
				</>
			)}
		</ButtonGroup>
	);
	return (
		<div style={{ width: "100%", marginTop: "10px" }}>
			<Breadcrumbs>
				<BreadcrumbsItem
					onClick={() => setSelectedSolution(null)}
					text="All schedules"
				/>
				<BreadcrumbsItem
					text={
						selectedSolution.title ||
						"Schedule #" + selectedSolution.id
					}
				/>
			</Breadcrumbs>
			<PageHeader actions={actionsContent}>Schedule details:</PageHeader>
			{selectedSolution.desciption ? (
				<div>
					<b>Note: </b> {selectedSolution.desciption}
				</div>
			) : (
				""
			)}
			<GanttChartStats
				selectedSolution={selectedSolution}
				solutionTasks={solutionTasks}
			/>

			<PageHeader>Gantt chart</PageHeader>
			<GanttChart
				solutionTasks={solutionTasks}
				setSolutionTasks={setSolutionTasks}
				setIsModified={setIsModified}
				updateTasksChanged={updateTasksChanged}
			/>

			<ScheduleExportContext.Provider value={{ id: selectedSolution.id }}>
				{jiraExportState.isModalOpen && (
					<JiraExport state={jiraExportModalState} />
				)}
				{otherExportState.isModalOpen && (
					<OtherExport state={otherExport} />
				)}
			</ScheduleExportContext.Provider>
		</div>
	);
}

export default GanttChartPage;
