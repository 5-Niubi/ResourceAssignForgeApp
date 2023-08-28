import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import Select from "@atlaskit/select";
import React, { Fragment, useState, useCallback, useEffect } from "react";
import Form, { Field, FormSection } from "@atlaskit/form";
import { invoke } from "@forge/bridge";
import { cache, extractErrorMessage, findObj } from "../../../../common/utils";
import Toastify from "../../../../common/Toastify";

function ChangeWorkerModal({
	isOpen,
	setIsOpen,
	workforce,
	currentWorker,
	task,
	solutionTasks,
	updateSolutionTasks,
	setIsModified,
}) {
	const [worker, setWorker] = useState(currentWorker);
	const updateWorker = useCallback(function (objValue) {
		if (!objValue) {
			setWorker(null);
		} else {
			var worker = findObj(workforce, objValue.value);
			if (worker) {
				setWorker(worker);
			}
		}
	}, []);

	var workerOpts = [];
	var workerValue = !worker
		? {}
		: { value: worker.id, label: worker.displayName };
	workforce?.forEach((w) => {
		workerOpts.push({
			value: w.id,
			label: w.displayName,
		});
	});

	// useEffect(function () {
	// 	setIsSubmitting(false);
	// }, []);

	const closeModal = useCallback(
		function () {
			setIsOpen(false);
		},
		[setIsOpen]
	);

	function handleSubmitChange() {
		task.workforce = worker;
		setIsModified(true);
		for (var i = 0; i < solutionTasks.length; i++) {
			if (solutionTasks[i].id == task.id) {
				solutionTasks[i] = task;
				break;
			}
		}
		updateSolutionTasks(solutionTasks);
		closeModal();
	}

	return (
		<ModalTransition>
			{isOpen && (
				<Modal onClose={closeModal} width={600}>
					<Form
						onSubmit={(formState) =>
							console.log("form submitted", formState)
						}
					>
						{({ formProps }) => (
							<form id="form-with-id" {...formProps}>
								<ModalHeader>
									<ModalTitle>Edit task resource</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<FormSection>
										<Field
											label="Employee"
											name="worker"
											defaultValue=""
											isRequired
										>
											{({ fieldProps }) => (
												<Fragment>
													<Select
														{...fieldProps}
														inputId="select-worker"
														className="select-worker"
														isClearable
														options={workerOpts}
														value={workerValue}
														onChange={updateWorker}
														isSearchable={true}
														placeholder="Choose employee"
														menuPosition="fixed"
													/>
												</Fragment>
											)}
										</Field>
									</FormSection>
								</ModalBody>

								<ModalFooter>
									<ButtonGroup>
										<Button
											appearance="default"
											onClick={closeModal}
										>
											Cancel
										</Button>
										<LoadingButton
											type="submit"
											appearance="primary"
											onClick={handleSubmitChange}
										>
											Save
										</LoadingButton>
									</ButtonGroup>
								</ModalFooter>
							</form>
						)}
					</Form>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default ChangeWorkerModal;
