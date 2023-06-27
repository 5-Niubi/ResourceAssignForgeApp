import React, { useCallback, useState } from "react";

import Button from "@atlaskit/button/standard-button";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";

function DeleteProjectModal({ openState, setOpenState }) {
	const closeModal = useCallback(
		function () {
			setOpenState({project, isOpen: false });
		},
		[setOpenState]
	);
	const project = openState.project;
	return (
		<>
			<ModalTransition>
				{openState.isOpen && (
					<Modal onClose={closeModal}>
						<ModalHeader>
							<ModalTitle appearance="warning">
								Delete the {project.projectName} Project
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							Project {project.projectId} will be delete permanly. This can not
							be undone!!!
						</ModalBody>
						<ModalFooter>
							<Button appearance="subtle" onClick={closeModal} autoFocus>
								Cancel
							</Button>
							<Button appearance="warning" onClick={closeModal}>
								Delete
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</>
	);
}

export default DeleteProjectModal;
