import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";
import SelectTaskModal from "./modal/SelectTaskModal";
import { useState } from "react";
import EstimateModal from "./modal/EstimateModal";

const VisualizePageHeader = ({title}) => {
	const [isOpenSelectModal, setOpenSelectModal] = useState(false);
	const [isOpenEstimateModal, setOpenEstimateModal] = useState(false);

	const updateOpenSelectModal = (isOpen) => {
		setOpenSelectModal(isOpen);
	};

	function openSelectModal(){
		setOpenSelectModal(true);
	}

	const updateOpenEstimateModal = (isOpen) => {
		setOpenEstimateModal(isOpen);
	};

	function openEstimateModal() {
		setOpenEstimateModal(true);
	}

	const actionsContent = (
		<ButtonGroup>
			<Button onClick={openSelectModal}>Select tasks</Button>
			<Button appearance="primary" onClick={openEstimateModal}>
				Estimate
			</Button>
		</ButtonGroup>
	);

	return (
		<PageHeader actions={actionsContent}>
			{title}
			<SelectTaskModal
				isOpen={isOpenSelectModal}
				updateOpenSelectModal={updateOpenSelectModal}
			/>

			<EstimateModal isOpen={isOpenEstimateModal} updateOpenEstimateModal={updateOpenEstimateModal}/>
		</PageHeader>
	);
};

export default VisualizePageHeader;
