// import Button from "@atlaskit/button";
// import React, { createContext, useCallback, useState } from "react";
// import JiraExport from "../components/export/JiraExport";
// import { ModalTransition } from "@atlaskit/modal-dialog";
// import OtherExport from "../components/export/OtherExport";

// const initModalExportState = {
// 	data: {},
// 	isModalOpen: false,
// };

// const scheduleExportDefaultValue = {
// 	id: 0,
// };

// // export const ScheduleExportContext = createContext(scheduleExportDefaultValue);
// function TestModal() {
// 	// --- state ---
// 	const jiraExportModalState = useState(initModalExportState);
// 	const [jiraExportState, setJiraExportState] = jiraExportModalState;
// 	const openJiraExportModal = () =>
// 		setJiraExportState((prev) => ({ ...prev, isModalOpen: true }));

// 	// ------

// 	// ----state ----
// 	const otherExport = useState(initModalExportState);
// 	const [otherExportState, setOtherExportState] = otherExport;
// 	const openOtherExportModal = () =>
// 		setOtherExportState((prev) => ({ ...prev, isModalOpen: true }));

// 	// ------

// 	return (
// 		<div>
// 			<Button appearance="primary" onClick={openJiraExportModal}>
// 				Open modal JiraExport
// 			</Button>
// 			<Button appearance="primary" onClick={openOtherExportModal}>
// 				Open modal OtherExport
// 			</Button>
// 			<ScheduleExportContext.Provider value={{ id: 42 }}>
// 				{jiraExportState.isModalOpen && (
// 					<JiraExport state={jiraExportModalState} />
// 				)}
// 				{otherExportState.isModalOpen && <OtherExport state={otherExport} />}
// 			</ScheduleExportContext.Provider>
// 		</div>
// 	);
// }

// export default TestModal;
