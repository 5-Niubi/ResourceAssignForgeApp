import Button from "@atlaskit/button";
import Modal, {
	ModalTransition,
	ModalHeader,
	ModalTitle,
	ModalBody,
	ModalFooter,
} from "@atlaskit/modal-dialog";
import React, { useCallback, useState } from "react";
import { LoadingModalContext } from "./JiraExport";
import LoadingModal from "./LoadingModal";
import JiraProjectExportTable from "./table/JiraProjectExportTable";
import { MODAL_WIDTH } from "../../common/contants";
import { Grid, GridColumn } from "@atlaskit/page";
import Image from "@atlaskit/image";
import { Box, xcss } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";

const width = MODAL_WIDTH.M;
const columns = 10;

const containerStyles = xcss({
	display: "flex",
	height: "100%",
	alignItems: "center",
	justifyContent: "center",
	width: "50%",
});

const buttonContainerStyles = xcss({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

function OtherExport({ state }) {
	const [otherExportState, setOtherExportState] = state;
	const closeOtherExportModal = useCallback(() => {
		setOtherExportState({ isModalOpen: false, schedule: {} });
	}, []);

	return (
		<ModalTransition>
			<Modal onClose={closeOtherExportModal} width={width}>
				<ModalHeader>
					<ModalTitle>Other Option To Export</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Grid layout="fluid" spacing="compact" columns={columns}>
						<GridColumn medium={2}>
							<Box xcss={containerStyles}>
								<Image
									src={
										"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Project_%282019%E2%80%93present%29.svg/2346px-Microsoft_Project_%282019%E2%80%93present%29.svg.png"
									}
									alt="Simple example"
									testId="image"
								/>
							</Box>
						</GridColumn>
						<GridColumn medium={6}>
							<Heading level="h400">
								Export this solution to Microsoft Project XML file
							</Heading>
						</GridColumn>
						<GridColumn medium={2}>
							<Box xcss={buttonContainerStyles}>
								<Button appearance="primary">Export</Button>
							</Box>
						</GridColumn>
					</Grid>
				</ModalBody>
				<ModalFooter>
					<Button appearance="subtle" onClick={closeOtherExportModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			{/* {isLoadingProcessOpen && <LoadingModal state={loadingModalState} />} */}
		</ModalTransition>
	);
}

export default OtherExport;
