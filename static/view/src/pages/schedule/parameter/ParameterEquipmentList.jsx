import React from "react";

import Button, { ButtonGroup } from "@atlaskit/button";
import { equipments } from "../../resources/equipments/table-content/equipments";
import ParameterEquipmmentModal from "./ParameterEquipmentModal";
import PageHeader from "@atlaskit/page-header";

const ParameterEquipmentList = () => {
    const buttonActions = (
        <ParameterEquipmmentModal></ParameterEquipmmentModal>
    );
	return (
		<div style={{ width: "100wh" }}>
			<div>
                <PageHeader actions={buttonActions}>Equipment Resources</PageHeader>
			</div>
			<div>
				{equipments?.map(({ name }) => (
					<Button style={{marginRight: "8px", marginBottom: "5px"}}>{name}</Button>
				))}
			</div>
		</div>
	);
};

export default ParameterEquipmentList;
