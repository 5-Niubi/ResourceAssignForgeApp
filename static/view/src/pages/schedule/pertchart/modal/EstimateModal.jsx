import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button";
import { useCallback, useState } from "react";

function EstimateModal({ isOpen, updateOpenSelectModal }) {
	const [shouldScrollInViewport, setShouldScrollInViewport] = useState(false);

	const setShouldScrollInViewportAndOpen = useCallback(
		(shouldScrollInViewport) => {
			setShouldScrollInViewport(shouldScrollInViewport);
			requestAnimationFrame(() => setIsOpen(true));
		},
		[setShouldScrollInViewport]
	);

	function close() {
		updateOpenSelectModal(false);
	}

	return (
		<ModalTransition>
			{isOpen && (
				<Modal
					onClose={close}
					shouldScrollInViewport={shouldScrollInViewport}
					height={600}
				>
					<ModalHeader>
						<ModalTitle>Estimate resources for project</ModalTitle>
					</ModalHeader>
					<ModalBody>
						
					</ModalBody>
					<ModalFooter>
						<Button appearance="primary" onClick={close}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default EstimateModal;
