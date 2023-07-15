// @ts-nocheck
import Button from "@atlaskit/button";
import Modal, {
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from "@atlaskit/modal-dialog";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { MODAL_WIDTH } from "../../common/contants";
import { invoke, requestJira } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import JiraProjectExportTable from "./table/JiraProjectExportTable";
import LoadingModal from "./LoadingModal";
const width = MODAL_WIDTH.M;

export const LoadingModalContext = createContext();
function JiraExport({ state }) {
	const [IsJiraExportOpen, setIsJiraExportOpen] = state;
	const scheduleId = 1;
	const loadingModalState = useState(false);
	const [isLoadingProcessOpen, setIsLoadingProcessOpen] = loadingModalState;
	const openLoadingModal = useCallback(() => setIsLoadingProcessOpen(true), []);
	const closeLoadingModal = useCallback(
		() => setIsLoadingProcessOpen(false),
		[]
	);

	const closeJiraExportModal = useCallback(
		() => setIsJiraExportOpen(false),
		[]
	);
	const [projectList, setProjectList] = useState(null);

	useEffect(() => {
		invoke("getJiraProjectsList")
			.then(function (res) {
				setProjectList(res.values);
			})
			.catch(function (error) {
				setProjectList([]);
				Toastify.error(error.toString());
			});
	}, []);

	const handleExportClick = useCallback((projectId) => {
		openLoadingModal();
		Toastify.info(projectId);
		invoke("exportToJira", { projectJiraId: projectId, scheduleId })
			.then(function (res) {
				closeLoadingModal();
				Toastify.info(JSON.stringify(res));
			})
			.catch(async function (error) {
				closeLoadingModal();
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	return (
		<>
			<Modal onClose={closeJiraExportModal} width={width}>
				<ModalHeader>
					<ModalTitle>Duplicate this page</ModalTitle>
				</ModalHeader>
				<ModalBody>
					Select project to export to
					<LoadingModalContext.Provider value={loadingModalState}>
						<JiraProjectExportTable
							isLoading={!projectList}
							projects={projectList}
							exportButtonClick={handleExportClick}
						/>
					</LoadingModalContext.Provider>
				</ModalBody>
				<ModalFooter>
					<Button appearance="subtle" onClick={closeJiraExportModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			{isLoadingProcessOpen && <LoadingModal state={loadingModalState} />}
		</>
	);
}

export default JiraExport;
