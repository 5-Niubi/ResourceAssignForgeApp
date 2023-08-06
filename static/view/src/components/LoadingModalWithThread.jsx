import Modal, {
	ModalBody,
	ModalFooter,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import ProgressBar from "@atlaskit/progress-bar";
import { invoke } from "@forge/bridge";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Toastify from "../common/Toastify";
import {
	INTERVAL_FETCH,
	RETRY_TIMES,
	STORAGE,
	THREAD_ACTION,
	THREAD_STATUS,
} from "../common/contants";
import { isArrayEmpty, isObjectEmpty, removeThreadInfo } from "../common/utils";

function LoadingModalWithThread({ state }) {
	const [modalState, setModalState] = state;
	const { setAppContextState } = useContext(AppContext);
	const closeModal = useCallback(
		() => setModalState((prev) => ({ ...prev, threadId: null })),
		[]
	);
	const [progress, setProgress] = useState("...");

	// --- Handle Loading
	let retryNumber = RETRY_TIMES;
	function checkingThread(intervalId) {
		invoke("getThreadResult", { threadId: modalState.threadId })
			.then((res) => {
				retryNumber = RETRY_TIMES;
				handleThreadSuccess(res, intervalId);
			})
			.catch((error) => {
				Toastify.error(error.toString());
				if (!--retryNumber) {
					removeThreadInfo();
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
	const handleThreadSuccess = useCallback((res, intervalId) => {
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
                //define action running scheduling success
                if(modalState.threadAction === THREAD_ACTION.RUNNING_SCHEDULE){
                    Toastify.success(
                        "Schedule of threads is done."
                    );
                }

				removeThreadInfo();
				closeModal();
				break;
			case THREAD_STATUS.ERROR:
				let message, response, errorMessages, errors;
				message = res.result.message;

				if (res.result.response) {
					response = JSON.parse(res.result.response);
					errorMessages = response.errorMessages;
					errors = response.errors;
				}
				// setErrorMsg(JSON.stringify(JSON.parse(res.result.response).errors));

				const errorBody = (
					<div>
						{message && (
							<div>
								<h4>{message}</h4>
							</div>
						)}

						{!isArrayEmpty(errorMessages) && (
							<div>
								Messages Error:
								<ul>
									{errorMessages.map((e, index) => (
										<li key={index}>{e}</li>
									))}
								</ul>
							</div>
						)}
						{!isObjectEmpty(errors) && (
							<div>
								Errors:
								{JSON.stringify(errors)};
							</div>
						)}
					</div>
				);
				setAppContextState((prev) => ({ ...prev, error: errorBody }));
				if (intervalId) {
					clearInterval(intervalId);
				}
				removeThreadInfo();
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
