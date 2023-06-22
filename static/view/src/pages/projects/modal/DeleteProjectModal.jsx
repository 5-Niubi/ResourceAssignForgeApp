import React, { useCallback, useState } from "react";

import Button from "@atlaskit/button/standard-button";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";

function DeleteProjectModal({ project, isOpen, onClose }) {
	return (
		<>
			<ModalTransition>
				{isOpen && (
					<Modal onClose={onClose}>
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
							<Button appearance="subtle" onClick={onClose} autoFocus>
								Cancel
							</Button>
							<Button appearance="warning" onClick={onClose}>
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
