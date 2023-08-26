import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
	useModal,
} from "@atlaskit/modal-dialog";
import React, { Fragment, useState, useCallback, useEffect } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field } from "@atlaskit/form";
import { invoke } from "@forge/bridge";
import Toastify from "../../../../common/Toastify";

function UpdateScheduleModal({
	isOpen,
	setIsOpen,
	schedules,
	updateSchedules,
	selectedSolution,
	updateSelectedSolution,
}) {
	const [title, setTitle] = useState(
		selectedSolution
			? selectedSolution.title || "Schedule #" + selectedSolution.id
			: ""
	);
	const [description, setDescription] = useState(
		selectedSolution ? selectedSolution.desciption || "" : ""
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateTitle = useCallback(function (e) {
		setTitle(e.target.value);
	}, []);

	const updateDescription = useCallback(function (e) {
		setDescription(e.target.value);
	}, []);

	const closeModal = useCallback(
		function () {
			setIsOpen(false);
		},
		[setIsOpen]
	);

	function handleSubmit() {
		setIsSubmitting(true);
		let schedule = {
			id: selectedSolution.id,
			title: title,
			desciption: description,
		};
		invoke("editSchedule", { schedule })
			.then(function (res) {
				setIsSubmitting(false);
				if (res && res.id) {
					for (let i = 0; i < schedules.length; i++) {
						if (schedules[i].id == res.id)
							schedules[i] = {...schedules[i], ...res};
					}
					updateSchedules(schedules);
					Toastify.success("Updated schedule successfully");
					closeModal();
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				Toastify.error(error.message);
			});
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
									<ModalTitle>Edit schedule</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<Field
										aria-required={true}
										name="title"
										label="Title"
										isRequired
									>
										{() => (
											<TextField
												autoComplete="off"
												value={title}
												onChange={updateTitle}
											/>
										)}
									</Field>
									<Field
										aria-required={true}
										name="description"
										label="Description"
									>
										{() => (
											<TextField
												autoComplete="off"
												value={description}
												onChange={updateDescription}
											/>
										)}
									</Field>
								</ModalBody>

								<ModalFooter>
									<ButtonGroup>
										<Button
											appearance="default"
											onClick={closeModal}
										>
											Cancel
										</Button>
										{isSubmitting ? (
											<LoadingButton
												appearance="primary"
												isLoading
											>
												Saving...
											</LoadingButton>
										) : (
											<Button
												type="submit"
												appearance="primary"
												onClick={handleSubmit}
											>
												Save
											</Button>
										)}
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

export default UpdateScheduleModal;
