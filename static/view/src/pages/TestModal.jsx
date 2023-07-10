import Button from "@atlaskit/button";
import React, { useCallback, useState } from "react";
import JiraExport from "../components/export/JiraExport";

function TestModal() {
	const jiraExportModalState = useState(false);
    const [IsJiraExportOpen, setIsJiraExportOpen] = jiraExportModalState;
	const openJiraExportModal = useCallback(() => setIsJiraExportOpen(true), []);

	return (
		<div>
			<Button appearance="primary" onClick={openJiraExportModal}>
				Open modal JiraExport
			</Button>

            <JiraExport state={jiraExportModalState}/>
		</div>
	);
}

export default TestModal;
