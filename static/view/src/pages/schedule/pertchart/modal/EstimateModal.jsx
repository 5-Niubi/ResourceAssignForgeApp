import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button";
import { useCallback, useState } from "react";
import {Grid, GridColumn} from "@atlaskit/page";


const EstimateComponent = ({title, data}) => {
	var content = data.map((d) => {
		return (
			<div>
				- <b>{d.quantity}</b> {d.name}
			</div>
		);
	});
	return (
		<div style={{ backgroundColor: "#ebebeb", borderRadius: "20px", padding: "20px"}}>
			<div
				style={{
					fontWeight: "bold",
					textAlign: "center",
					marginBottom: "20px",
				}}
			>
				{title}
			</div>
			<div>
				{content}
			</div>
		</div>
	);
};

const EstimateModal = ({ isOpen, updateOpenEstimateModal }) => {
	function close() {
		updateOpenEstimateModal(false);
	}

	var workforce = [
		{ name: "C# level 1", quantity: 2 },
		{ name: "Java level 3", quantity: 1 },
		{ name: "Designer", quantity: 1 },
		{ name: "BA", quantity: 2 },
		{ name: "Tester", quantity: 1 },
	];

	var equipments = [
		{ name: "Ipone 14 PRM", quantity: 1 },
		{ name: "Windows laptop", quantity: 1 },
		{ name: "White board", quantity: 1 },
	];

	return (
		<ModalTransition>
			{isOpen && (
				<Modal
					onClose={close}
				>
					<ModalHeader>
						<ModalTitle>Estimate resources for project</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<Grid layout="fluid" spacing="comfortable" columns={2}>
							<GridColumn medium={1}>
								<EstimateComponent
									title="Workforce"
									data={workforce}
								/>
							</GridColumn>
							<GridColumn medium={1}>
								<EstimateComponent
									title="Equipments"
									data={equipments}
								/>
							</GridColumn>
						</Grid>
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
