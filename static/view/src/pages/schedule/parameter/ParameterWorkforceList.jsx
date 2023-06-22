import React from "react";

import Button, { ButtonGroup } from "@atlaskit/button";
import { workforces } from "../../resources/workforces/table-content/workforces";
import ParameterWorkforceModal from "./ParameterWorkforceModal";
import PageHeader from "@atlaskit/page-header";

const ParameterWorkforceList = () => {
    const buttonActions = (
        <ParameterWorkforceModal></ParameterWorkforceModal>
      );

	return (
		<div style={{ width: "100wh" }}>
			<div>
                <PageHeader actions={buttonActions}>Workforces</PageHeader>
			</div>
			<div>
				{workforces?.map(({ name }) => (
					<Button style={{ marginRight: "8px", marginBottom: "5px" }}>{name}</Button>
				))}
			</div>
		</div>
	);
};

export default ParameterWorkforceList;
