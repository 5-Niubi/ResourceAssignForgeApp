import Button from "@atlaskit/button";
import Modal, {
	ModalTransition,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from "@atlaskit/modal-dialog";
import React, { useCallback, useEffect } from "react";
import { MODAL_WIDTH } from "../../common/contants";
const width = MODAL_WIDTH.M;
function JiraExport({ state }) {
	const [IsJiraExportOpen, setIsJiraExportOpen] = state;
	const closeJiraExportModal = useCallback(
		() => setIsJiraExportOpen(false),
		[]
	);


	return (
		<ModalTransition>
			{IsJiraExportOpen && (
				<Modal onClose={closeJiraExportModal} width={width}>
					<ModalHeader>
						<ModalTitle>Duplicate this page</ModalTitle>
					</ModalHeader>
					<ModalBody>
						Select project to export to
                        <div>
                            Project 1
                        </div>
                        <div>
                            Project 2
                        </div>
                        <div>
                            Project 3
                        </div>
					</ModalBody>
					<ModalFooter>
						<Button appearance="subtle" onClick={closeJiraExportModal}>
							Cancel
						</Button>
						<Button
							appearance="primary"
							onClick={closeJiraExportModal}
							autoFocus
						>
							Duplicate
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default JiraExport;
