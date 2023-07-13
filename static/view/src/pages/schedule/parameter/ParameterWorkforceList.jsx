import React, { useEffect, useState, useCallback } from "react";

import Button, { ButtonGroup } from "@atlaskit/button";
import { workforces } from "../../resources/workforces/table-content/workforces";
import ParameterWorkforceModal, {
	ParameterCreareWorkforceModal,
	ParameterSelectWorkforceModal,
} from "./ParameterWorkforceModal";
import PageHeader from "@atlaskit/page-header";
import { Modal, invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import Spinner from "@atlaskit/spinner";

function ParameterWorkforceList() {
	//GET LIST WORKFORCES
	const [workforces, setWorkforces] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(function () {
		invoke("getAllWorkforces")
			.then(function (res) {
				let workforces = [];
				for (let workforce of res) {
					let itemWorkforce = {
						id: workforce.id,
						accountId: workforce.accountId,
						email: workforce.email,
						accountType: workforce.accountType,
						name: workforce.name,
						avatar: workforce.avatar,
						displayName: workforce.displayName,
						unitSalary: workforce.unitSalary,
						workingType: workforce.workingType,
						workingEffort: workforce.workingEffort,
					};
					workforces.push(itemWorkforce);
				}
				setIsLoading(false);
				setWorkforces(workforces);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	const buttonActions = (
		<>
			<ParameterCreareWorkforceModal></ParameterCreareWorkforceModal>
			<ParameterSelectWorkforceModal></ParameterSelectWorkforceModal>
		</>
	);

	return (
		<div style={{ width: "100wh" }}>
			<div>
				<PageHeader actions={buttonActions}>Workforces</PageHeader>
			</div>
			<div>
				{isLoading ? (
					<Spinner size={"large"} />
				) : (
					<>
						{workforces?.map((workforce, index) => (
							<Button
								style={{
									marginRight: "8px",
									marginBottom: "5px",
								}}
							>
								{workforce.name}
							</Button>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default ParameterWorkforceList;
