import Button from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import ProgressBar from "@atlaskit/progress-bar";
import { invoke } from "@forge/bridge";
import React, { useCallback, useEffect } from "react";
import Toastify from "../common/Toastify";
import Heading from "@atlaskit/heading";
import JiraAutoCreateProjectExport from "./export/gird/JiraAutoCreateProjectExport";
import { THREAD_ACTION, THREAD_STATUS } from "../common/contants";
import { removeThreadInfo } from "../common/utils";

function LoadingModalWithThread({ state }) {
	const [modalState, setModalState] = state;
	const closeModal = useCallback(
		() => setModalState((prev) => ({ ...prev, isModalOpen: false })),
		[]
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			//assign interval to a variable to clear it.
			invoke("getThreadResult", { threadId: modalState.threadId })
				.then((res) => {
					handleThreadSuccess(res);
				})
				.catch((error) => {
					removeThreadInfo(modalState.threadId);
					localStorage.removeItem("thread_info");
					Toastify.error(error.toString());
					closeModal();
					clearInterval(intervalId);
				});
		}, 5000);

		return () => clearInterval(intervalId); //This is important
	}, []);

	const handleThreadSuccess = useCallback((res) => {
		console.log(res);

		// Export thread success
		switch (res.status) {
			case THREAD_STATUS.SUCCESS:
				// Specific action in here
				if (modalState.threadAction === THREAD_ACTION.JIRA_EXPORT) {
					Toastify.success(`Export successfully \n Project ${res.result.projectName} was created`);
				}

				removeThreadInfo(res.threadId);
				closeModal();
				break;
			case THREAD_STATUS.ERROR:
				Toastify.error(res.data);

				removeThreadInfo(res.threadId);
				closeModal();
				break;
		}
	}, []);

	return (
		<ModalTransition>
			<Modal>
				<ModalBody>
					<div
						style={{
							height: "120px",
							marginTop: "10px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<p style={{ fontSize: "18px" }}>
							This process will take some minutes...
						</p>
					</div>
					<ProgressBar ariaLabel="Loading" isIndeterminate></ProgressBar>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</Modal>
		</ModalTransition>
	);
}

export default LoadingModalWithThread;