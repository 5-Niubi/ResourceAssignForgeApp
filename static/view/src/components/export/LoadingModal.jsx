import { useCallback, useState } from "react";

import { css, jsx } from "@emotion/react";

import Button from "@atlaskit/button/standard-button";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import ProgressBar from "@atlaskit/progress-bar";
import React from "react";
const boldStyles = css({
	fontWeight: "bold",
});

export default function LoadingModal({ state }) {
	const [isOpen, setIsOpen] = state;
	const closeModal = useCallback(() => setIsOpen(false), []);

	return (
		<Modal>
			<ModalBody>
				<div
					style={{
						height: "120px",
						marginTop: "10px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<p style={{ fontSize: "18px" }}>
						This process will take some minutes...
					</p>
				</div>
				<ProgressBar ariaLabel="Loading" isIndeterminate></ProgressBar>
			</ModalBody>
			<ModalFooter>
				<Button appearance="primary" onClick={closeModal} autoFocus>
					OK
				</Button>
			</ModalFooter>
		</Modal>
	);
}
