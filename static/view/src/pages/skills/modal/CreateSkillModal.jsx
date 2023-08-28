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
import Toastify from "../../../common/Toastify";
import { extractErrorMessage } from "../../../common/utils";

function CreateSkillModal({
	isOpen,
	setIsOpen,
	skills,
	updateSkills,
	skillEdit,
	updateSkillEdited,
}) {
	const [name, setName] = useState(skillEdit ? skillEdit.name : "");
	const [description, setDescription] = useState(skillEdit ? (skillEdit.description || "") : "");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateName = useCallback(function (e) {
		setName(e.target.value);
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

	function handleSubmitCreate() {
		setIsSubmitting(true);
		let skillReq = {
			name: name,
			description: description
		};
		if (skillEdit) {
			skillReq.id = skillEdit.id;
			//update current skill
			invoke("updateSkill", { skillReq })
				.then(function (res) {
					setIsSubmitting(false);
					if (res.data && res.data.id) {
						for (let i = 0; i < skills.length; i++) {
							if (skills[i].id == res.data.id) skills[i] = res.data;
						}
						updateSkills(skills);
						if (updateSkillEdited) {
							updateSkillEdited(true);
						}
						Toastify.success("Updated skill successfully");
						closeModal();
					}
				})
				.catch((error) => {
					setIsSubmitting(false);
					var err = extractErrorMessage(error)
					if (err.messages) {
						Toastify.error(err.messages);
					} else {
						Toastify.error(err.message);
					}
				});
		} else {
			//create new
			invoke("createSkill", { skillReq })
				.then(function (res) {
					setIsSubmitting(false);
					if (res.id) {
						skills.push(res);
						updateSkills(skills);
						Toastify.success("Created skill successfully");
						closeModal();
					} else if (res.messages) {
						Toastify.error(res.messages);
					}
				})
				.catch((error) => {
					setIsSubmitting(false);
					var err = extractErrorMessage(error);
					if (err.messages) {
						Toastify.error(err.messages);
					} else {
						Toastify.error(err.message);
					}
				});
		}
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
									<ModalTitle>
										{skillEdit
											? "Edit skill"
											: "Create new skill"}
									</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<Field
										aria-required={true}
										name="name"
										label="Skill Name"
										isRequired
									>
										{() => (
											<TextField
												autoComplete="off"
												value={name}
												onChange={updateName}
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
												onClick={handleSubmitCreate}
											>
												{skillEdit ? "Save" : "Create"}
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

export default CreateSkillModal;
