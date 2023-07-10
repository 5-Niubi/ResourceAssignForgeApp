import { useCallback, useState } from "react";

import { css, jsx } from "@emotion/react";

import Button from "@atlaskit/button/standard-button";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import ProgressBar from '@atlaskit/progress-bar';
const boldStyles = css({
	fontWeight: "bold",
});

export default function LoadingModal() {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	return (
		<div>
			<Button appearance="primary" onClick={openModal}>
				loading button
			</Button>

			<ModalTransition>
				{isOpen && (
					<Modal onClose={closeModal}>
						<ModalBody>
							<div style={{height:"120px",marginTop:"10px", display: "flex",alignItems:"center", justifyContent:"center"}}>
									<RecentIcon label=""></RecentIcon>
									<p style={{fontSize: "18px"}}>This process will take some minutes...</p>
							</div>
                            <ProgressBar ariaLabel="Loading" isIndeterminate></ProgressBar>

						</ModalBody>
						<ModalFooter>
							<Button
								appearance="primary"
								onClick={closeModal}
								autoFocus
							>
								OK
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}
