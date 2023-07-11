import Button from "@atlaskit/button";
import React, { useCallback, useState } from "react";
import JiraExport from "../components/export/JiraExport";
import { ModalTransition } from "@atlaskit/modal-dialog";

function TestModal() {
	const jiraExportModalState = useState(false);
	const [IsJiraExportOpen, setIsJiraExportOpen] = jiraExportModalState;
	const openJiraExportModal = useCallback(() => setIsJiraExportOpen(true), []);

	return (
		<div>
			<Button appearance="primary" onClick={openJiraExportModal}>
				Open modal JiraExport
			</Button>
			<ModalTransition>
				{IsJiraExportOpen && <JiraExport state={jiraExportModalState} />}
			</ModalTransition>
		</div>
	);
}

export default TestModal;
