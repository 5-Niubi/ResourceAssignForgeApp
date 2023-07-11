// @ts-nocheck
import Button from "@atlaskit/button";
import Modal, {
	ModalTransition,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from "@atlaskit/modal-dialog";
import React, { useCallback, useEffect, useState } from "react";
import { MODAL_WIDTH } from "../../common/contants";
import { invoke, requestJira } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import JiraProjectExportTable from "./table/JiraProjectExportTable";
const width = MODAL_WIDTH.M;
function JiraExport({ state }) {
	const [IsJiraExportOpen, setIsJiraExportOpen] = state;
	const closeJiraExportModal = useCallback(
		() => setIsJiraExportOpen(false),
		[]
	);
	const [projectList, setProjectList] = useState([]);

	useEffect(() => {

		invoke("getJiraProjectsList")
			.then(function (res) {
				setProjectList(res.values);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
	}, []);

	return (
		<ModalTransition>
			{IsJiraExportOpen && (
				<Modal onClose={closeJiraExportModal} width={width}>
					<ModalHeader>
						<ModalTitle>Duplicate this page</ModalTitle>
					</ModalHeader>
					<ModalBody>
						Select project to export to
						<JiraProjectExportTable isLoading={false} projects={projectList}/>
					</ModalBody>
					<ModalFooter>
						<Button appearance="subtle" onClick={closeJiraExportModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default JiraExport;
