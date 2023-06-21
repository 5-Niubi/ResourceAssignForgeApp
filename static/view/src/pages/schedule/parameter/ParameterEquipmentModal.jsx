import { useCallback, useState } from "react";

import { css, jsx } from "@emotion/react";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import Button from "@atlaskit/button";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";

const boldStyles = css({
	fontWeight: "bold",
});

export default function ParameterWorkforceModal() {
	//CREATE EQUIPMENT MODAL (CW)
	const [isCEOpen, setisCEOpen] = useState(false);
	const openCEModal = useCallback(() => setisCEOpen(true), []);
	const closeCEModal = useCallback(() => setisCEOpen(false), []);

	return (
		<div>
			<Button
				iconBefore={<AddCircleIcon label="" size="large" />}
				appearance="subtle"
				onClick={openCEModal}
			></Button>

			{/* CREATE WORKFORCE MODAL (CW) */}
			<ModalTransition>
				{isCEOpen && (
					<Modal
						onClose={closeCEModal}
						shouldScrollInViewport={true}
						width={"large"}
					>
						<ModalHeader>
							<ModalTitle>Add new equipment</ModalTitle>
						</ModalHeader>
						<ModalBody>
							This is area to input equipment's information
						</ModalBody>
						<ModalFooter>
							<Button
								appearance="subtle"
								onClick={closeCEModal}
								autoFocus
							>
								Cancel
							</Button>
							<Button
								appearance="primary"
								onClick={closeCEModal}
								autoFocus
							>
								Confirm
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}

