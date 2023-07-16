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
					invoke("removeThreadInfo", { threadId: modalState.threadId });
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
				if (modalState.threadAction === THREAD_ACTION.JIRA_EXPORT) {
					console.log(res);
					invoke("removeThreadInfo", { threadId: res.threadId });
					closeModal();
				}
				break;
			case THREAD_STATUS.ERROR:
				console.log(res);
				invoke("removeThreadInfo", { threadId: res.threadId });
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
				<ModalFooter>
					<Button appearance="primary" onClick={closeModal} autoFocus>
						OK
					</Button>
				</ModalFooter>
			</Modal>
		</ModalTransition>
	);
}

export default LoadingModalWithThread;
