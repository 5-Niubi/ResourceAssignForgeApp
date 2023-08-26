import React, { useCallback, useState } from "react";

import Button from "@atlaskit/button/standard-button";
import { LoadingButton } from "@atlaskit/button";
import { invoke } from "@forge/bridge";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import Toastify from "../../../../common/Toastify";

function DeleteScheduleModal({
	setIsOpen,
	schedule,
	setSelectedSolution,
	schedules,
	updateSchedules
}) {
	const [isDeleting, setIsDeleting] = useState(false);
	const closeModal = useCallback(function () {
		setIsOpen(false);
	});
	const handleDelete = useCallback(() => {
		setIsDeleting(true);
		invoke("deleteSchedule", { scheduleId: schedule.id })
			.then(function (res) {
				for (let i = 0; i < schedules.length; i++) {
					if (schedules[i].id == schedule.id) {
						schedules.splice(i, 1);
					}
				}
				updateSchedules(schedules);
				Toastify.success(`Delete successfully`);
				setSelectedSolution(null);
				closeModal();
			})
			.catch(function (error) {
				closeModal();
				setSelectedSolution(null);
				if (error.message) {
					Toastify.error(error.message);
				} else Toastify.error(error.toString());
			});
	}, []);

	return (
		<>
			<ModalTransition>
				<Modal onClose={closeModal}>
					<ModalHeader>
						<ModalTitle appearance="warning">
							Delete schedule
						</ModalTitle>
					</ModalHeader>
					<ModalBody>
						This schedule will be delete permanly. This can not
						be undone!!!
					</ModalBody>
					<ModalFooter>
						<Button
							appearance="subtle"
							onClick={closeModal}
							autoFocus
							isDisabled={isDeleting}
						>
							Cancel
						</Button>
						<LoadingButton
							appearance="warning"
							isLoading={isDeleting}
							onClick={handleDelete}
						>
							Delete
						</LoadingButton>
					</ModalFooter>
				</Modal>
			</ModalTransition>
		</>
	);
}

export default DeleteScheduleModal;
