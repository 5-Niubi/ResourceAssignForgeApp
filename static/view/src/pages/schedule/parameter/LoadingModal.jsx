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

export default function LoadingModal({handleChangeTab}) {
	const [isOpen, setIsOpen] = useState(false);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	return (
		<div>
            <Button onClick={() => handleChangeTab(1)}>
				Back
			</Button>
			<Button appearance="primary" onClick={openModal}>
				Schedule
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
								onClick={closeModal}
								autoFocus
							>
								Cancel
							</Button>
                            <Button
                                appearance="primary"
								onClick={closeModal && handleChangeTab(3) }
							>
								DONE
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}
