import React, { createContext, useCallback, useEffect, useState } from "react";
import GanttChart from "./GanttChart";
import { render } from "react-dom";
import GanttChartStats from "./GanttChartStat";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import GanttChart2 from "./GanttChart2";
import GanttChart3 from "./GanttChart3";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";
import JiraExport from "../../../components/export/JiraExport";
import OtherExport from "../../../components/export/OtherExport";

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
function GanttChartPage({ setSelectedSolution, selectedSolution}) {
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
	const [solutiontTasks, setSolutiontTasks] = useState([]);

	useEffect(() => {
		var solution = findObj(
			JSON.parse(localStorage.getItem("solutions")),
			selectedSolution
		);
		if (solution) {
			setSolutiontTasks(JSON.parse(solution.tasks));
		}
	}, []);

	const actionsContent = (
		<ButtonGroup>
			{isModified ? (
				<Button appearance="subtle" onClick={handleSaveSolution}>
					Save as new solution
				</Button>
			) : (
				<>
					<Button appearance="subtle" onClick={openOtherExportModal}>
						Export to MS Project
					</Button>
					<Button appearance="primary" onClick={openJiraExportModal}>
						Sync to Jira
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
					text="All solutions"
				/>
				<BreadcrumbsItem text={"Solution #" + selectedSolution} />
			</Breadcrumbs>
			<PageHeader actions={actionsContent}>
				Solution evaluation:
			</PageHeader>
			<GanttChartStats selectedSolution={selectedSolution} />

			<PageHeader>Gantt chart</PageHeader>
			<GanttChart3
				solutiontTasks={solutiontTasks}
				setSolutiontTasks={setSolutiontTasks}
				setIsModified={setIsModified}
			/>

			<ScheduleExportContext.Provider value={{ id: selectedSolution }}>
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
