import Button from "@atlaskit/button";
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { MODAL_WIDTH, THREAD_ACTION } from "../../common/contants";
import { invoke, requestJira } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import JiraProjectExportTable from "./table/JiraProjectExportTable";
import JiraAutoCreateProjectExport from "./gird/JiraAutoCreateProjectExport";
import Heading from "@atlaskit/heading";
import { ScheduleExportContext } from "../../pages/TestModal";
import { ThreadLoadingContext } from "../../App";
import { useContext } from "react";
import { saveThreadInfo } from "../../common/utils";
const width = MODAL_WIDTH.M;

const defaultValue = {
	isLoadingProcessOpen: false,
	dataExport: {},
};
const initProjectListState = {
	isLoading: true,
	projectsData: [],
};
export const LoadingModalContext = createContext(defaultValue);

function JiraExport({ state }) {
	const [isJiraExportOpen, setIsJiraExportOpen] = state;

	const closeJiraExportModal = useCallback(
		() => setIsJiraExportOpen(false),
		[]
	);
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

	// State of Loading Thread Modal
	const threadLoadingState = useContext(ThreadLoadingContext);
	const [threadStateValue, setThreadStateValue] = threadLoadingState.state;
	// --------

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

	const handleExportClick = useCallback(() => {
		setIsLoading(true);
		invoke("exportToJira", { scheduleId: schedule.id })
			.then((res) => {
				handleCreateThreadSuccess(res.threadId);
			})
			.catch((error) => {
				Toastify.error(error.toString());
			});
	}, []);

	return (
		<ModalTransition>
			<Modal onClose={closeJiraExportModal} width={width}>
				<ModalHeader>
					<ModalTitle>
						<Heading level="h600">Export this solution to a Jira Software Project</Heading>
						<Heading level="h200">(This process will take a while and can not undo)</Heading>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<JiraAutoCreateProjectExport
						isButtonExportLoading={isLoading}
						onButtonExportClick={handleExportClick}
					/>
					{/* <Heading level="h600">Select project to export to</Heading>
					<JiraProjectExportTable
						isLoading={projectListState.isLoading}
						projects={projectListState.projectsData}
						exportButtonClick={handleExportClick}
					/> */}
				</ModalBody>
				<ModalFooter>
					<Button
						appearance="subtle"
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
