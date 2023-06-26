import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";
import SelectTaskModal from "./modal/SelectTaskModal";
import { useState } from "react";

const VisualizePageHeader = ({title}) => {
	const [isOpenSelectModal, setOpenSelectModal] = useState(false);
	const [isOpenEstimateModal, setOpenEstimateModal] = useState(false);

	const updateOpenSelectModal = (isOpen) => {
		setOpenSelectModal(isOpen);
	};

	function openSelectModal(){
		setOpenSelectModal(true);
	}

	const actionsContent = (
		<ButtonGroup>
			<Button onClick={openSelectModal}>Select tasks</Button>
			<Button appearance="primary">Estimate</Button>
		</ButtonGroup>
	);

	return (
		<PageHeader actions={actionsContent}>
			{title}
			<SelectTaskModal
				isOpen={isOpenSelectModal}
				updateOpenSelectModal={updateOpenSelectModal}
			/>
		</PageHeader>
	);
};

export default VisualizePageHeader;
