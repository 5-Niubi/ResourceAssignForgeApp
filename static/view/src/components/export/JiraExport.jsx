import Button from "@atlaskit/button";
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import React, { useCallback, useEffect, useState } from "react";
import { MODAL_WIDTH, THREAD_ACTION } from "../../common/contants";
import { invoke, requestJira } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import JiraAutoCreateProjectExport from "./gird/JiraCreateProjectExportGrid";
import Heading from "@atlaskit/heading";
import { ScheduleExportContext } from "../../pages/schedule/ganttchart/GanttChartPage";
import { useContext } from "react";
import { saveThreadInfo } from "../../common/utils";
import JiraCreateProjectExport from "./form/JiraCreateProjectExport";
import { useParams } from "react-router";
import { ProjectInfoContext } from "../../pages/schedule/ScheduleTabs";
import { ThreadLoadingContext } from "../main/MainPage";
const width = MODAL_WIDTH.M;

const initProjectListState = {
	isLoading: true,
	projectsData: [],
};

const MODAL_STATE_DEFAULT = {
	isModalOpen: false,
	data: {},
};

function JiraExport({ state }) {
	const [isJiraExportOpen, setIsJiraExportOpen] = state;
	const project = useContext(ProjectInfoContext);

	const closeJiraExportModal = useCallback(
		() => setIsJiraExportOpen(false),
		[]
	);

	// Modal Create Project State
	const [createProjectMdalState, setCreateProjectModalState] =
		useState(MODAL_STATE_DEFAULT);
	const [isModalProjectStateLoading, setIsModalProjectStateLoading] =
		useState(false);
	const openModalCreateProject = function () {
		let data = {
			projectName: project.name,
		};
		setCreateProjectModalState({ data, isModalOpen: true });
	};
	const closeModalCreateProject = function () {
		setCreateProjectModalState((prev) => ({ ...prev, isModalOpen: false }));
	};
	// --------

	// -- Get project list for import to
	const [projectListState, setProjectListState] =
		useState(initProjectListState);
	useEffect(() => {
		invoke("getJiraProjectsList")
			.then(function (res) {
				setProjectListState({ projectsData: res.values, isLoading: false });
			})
			.catch(function (error) {
				setProjectListState({ projectsData: [], isLoading: false });
				Toastify.error(error.toString());
			});
		return () => {
			setProjectListState(initProjectListState);
		};
	}, []);
	// --------

	// State of Loading Thread Modal
	const threadLoadingContext = useContext(ThreadLoadingContext);
	const [threadStateValue, setThreadStateValue] = threadLoadingContext.state;
	// --------

	// --- Create Project for export
	const exportCreateProjectState = useState();

	const schedule = useContext(ScheduleExportContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleCreateThreadSuccess = useCallback((threadId) => {
		let threadAction = THREAD_ACTION.JIRA_EXPORT;
		setThreadStateValue({
			threadId,
			threadAction,
			isModalOpen: true,
		});
		let threadInfo = {
			threadId,
			threadAction,
		};
		saveThreadInfo(threadInfo);
		closeJiraExportModal();
	}, []);

	const handleOpenCreateClick = useCallback(() => {
		openModalCreateProject();
	}, []);

	const handleCreateProjectClick = function () {
		setIsModalProjectStateLoading(true);
		invoke("exportToJira", {
			scheduleId: schedule.id,
			projectCreateInfo: createProjectMdalState.data,
		})
			.then((res) => {
				closeModalCreateProject();
				handleCreateThreadSuccess(res.threadId);
			})
			.catch((error) => {
				setIsModalProjectStateLoading(false);
				Toastify.error(error.message);
				console.log(error);
			});
	};

	return (
		<ModalTransition>
			<Modal onClose={closeJiraExportModal} width={width}>
				<ModalHeader>
					<ModalTitle>
						<Heading level="h600">
							Export this solution to a Jira Software Project
						</Heading>
						<Heading level="h200">
							(This process will take a while and can not undo)
						</Heading>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<JiraAutoCreateProjectExport
						isButtonExportLoading={isLoading}
						onButtonExportClick={handleOpenCreateClick}
					/>
					{/* <Heading level="h600">Select project to export to</Heading>
					<JiraProjectExportTable
						isLoading={projectListState.isLoading}
						projects={projectListState.projectsData}
						exportButtonClick={handleExportClick}
					/> */}

					{createProjectMdalState.isModalOpen ? (
						<JiraCreateProjectExport
							state={[createProjectMdalState, setCreateProjectModalState]}
							onCreateClick={handleCreateProjectClick}
							isLoading={isModalProjectStateLoading}
						/>
					) : (
						""
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						appearance="default"
						isDisabled={isLoading}
						onClick={closeJiraExportModal}
						autoFocus={true}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</ModalTransition>
	);
}

export default JiraExport;
