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
import React, { useCallback, useEffect, useState } from "react";
import Toastify from "../common/Toastify";
import {
	INTERVAL_FETCH,
	RETRY_TIMES,
	STORAGE,
	THREAD_ACTION,
	THREAD_STATUS,
} from "../common/contants";
import { removeThreadInfo } from "../common/utils";
import signal, { HubConnectionBuilder } from "@microsoft/signalr";

function LoadingModalWithThread({ state }) {
	const [modalState, setModalState] = state;
	const closeModal = useCallback(
		() => setModalState((prev) => ({ ...prev, isModalOpen: false })),
		[]
	);
	const [progress, setProgress] = useState("...");

	// --- Handle Loading
	let retryNumber = RETRY_TIMES;
	function checkingThread(intervalId) {	
		invoke("getThreadResult", { threadId: modalState.threadId })
			.then((res) => {
				retryNumber = RETRY_TIMES;
				handleThreadSuccess(res);
			})
			.catch((error) => {
				Toastify.error(error.toString());
				if (!--retryNumber) {
					removeThreadInfo(modalState.threadId);
					localStorage.removeItem(STORAGE.THREAD_INFO);
					closeModal();
					if (intervalId) {
						clearInterval(intervalId);
					}
				}
			});
	}
	useEffect(() => {
		checkingThread();
		//assign interval to a variable to clear it.
		const intervalId = setInterval(() => {
			checkingThread(intervalId);
		}, INTERVAL_FETCH);

		return () => clearInterval(intervalId); //This is important
	}, []);
	const handleThreadSuccess = useCallback((res) => {
		console.log(res);

		// Export thread success
		switch (res.status) {
			case THREAD_STATUS.RUNNING:
				setProgress(res.progress);
				break;
			case THREAD_STATUS.SUCCESS:
				// Specific action in here
				if (modalState.threadAction === THREAD_ACTION.JIRA_EXPORT) {
					Toastify.success(
						`Export successfully: ${res.result.projectName} was created`
					);
				}
                
				removeThreadInfo(res.threadId);
				closeModal();
				break;
			case THREAD_STATUS.ERROR:
				Toastify.error(
					`${res.result.message} - ${JSON.parse(res.result.response).error}`
				);

				removeThreadInfo(res.threadId);
				closeModal();
				break;
		}
	}, []);
	// ----------------

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
					<div
						style={{
							marginBottom: "20px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<p style={{ fontSize: "16px" }}>({progress})</p>
					</div>
					<ProgressBar ariaLabel="Loading" isIndeterminate></ProgressBar>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</Modal>
		</ModalTransition>
	);
}

export default LoadingModalWithThread;
