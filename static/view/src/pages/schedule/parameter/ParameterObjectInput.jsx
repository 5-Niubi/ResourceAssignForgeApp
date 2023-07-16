import React, { Fragment, useState, useCallback } from "react";
import Button from "@atlaskit/button/standard-button";
import Form, {
	Field,
	FormFooter,
	HelperMessage,
	ErrorMessage,
	RangeField,
	ValidMessage,
} from "@atlaskit/form";
import Range from "@atlaskit/range";
import { useParams } from "react-router";
import Textfield from "@atlaskit/textfield";
import { css, jsx } from "@emotion/react";
import RecentIcon from "@atlaskit/icon/glyph/recent";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import ProgressBar from "@atlaskit/progress-bar";
import { invoke } from "@forge/bridge";
import __noop from "@atlaskit/ds-lib/noop";
import Toastify from "../../../common/Toastify";
import { LoadingButton } from "@atlaskit/button";

const boldStyles = css({
	fontWeight: "bold",
});


export default function ParameterObjectInput({ handleChangeTab }) {
	let { projectId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [expectedDuration, setExpectedDuration] = useState(0);
	const [expectedBudget, setExpectedBugdet] = useState(0);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	const validateNumberOnly = (value) => {
		//REQUIRES NOT NULL, NUMBER ONLY
		if (!value) {
			return "NOT_VALID";
		}

		if (isNaN(parseFloat(value))) {
			return "NOT_VALID";
		}
		const regex = /^\d*\.?\d*$/;
		if (!regex.test(value)) {
			return "NOT_VALID";
		}
		return undefined;
	};

	const ParameterResourcesRequest = {
		ResourceId: 0,
		Type: "",
	};

    const params = {
        Budget: 0,
        Duration: 0,
    }

	function SaveParameters({cost,duration}) {
		var parameterResourcesLocal = JSON.parse(
			localStorage.getItem("workforce_parameter")
		);
		let parameterResources = [];
		for (let item of parameterResourcesLocal) {
			let itemParameterResource = {
				ResourceId: item.id,
				Type: "workforce",
			};
			parameterResources.push(itemParameterResource);
		} 
		var data = {
			ProjectId: Number(projectId),
			Duration: cost,
			Budget: duration,
			ParameterResources: parameterResources,
		};
		console.log("Send parameter data: ", data);

		invoke("saveParameters", { parameter: data })
			.then(function (res) {
				if (res) {
					Toastify.info(res.toString());
					handleChangeTab(3);
				}
				Toastify.info(res);
			})
			.catch(function (error) {
				Toastify.error(error.toString());
			});
	}

	return (
		<div style={{ width: "100%" }}>
			<Form
				onSubmit={({cost,duration}) => {
					console.log("Form Submitted: ", cost +", "+duration);
					SaveParameters({cost,duration});
					return new Promise((resolve) =>
						setTimeout(resolve, 2000)
					).then(() =>
						data.username === "error"
							? {
									username: "IN_USE",
							  }
							: undefined
					);
				}}
			>
				{({ formProps, submitting }) => (
					<form {...formProps}>
						<Field
							isRequired
							label="Expected Cost"
							name="cost"
							validate={(value) => validateNumberOnly(value)}
						>
							{({ fieldProps, error }) => (
								<Fragment>
									<Textfield
										{...fieldProps}
										placeholder="What expected maximize project's cost?"
										elemBeforeInput={
											<p style={{ marginLeft: 10 }}>$</p>
										}
									/>
									{error === "NOT_VALID" && (
										<ErrorMessage>
											Wrong input.
										</ErrorMessage>
									)}
								</Fragment>
							)}
						</Field>
						<Field
							isRequired
							label="Expected Duration (days)"
							name="duration"
							validate={(value) => validateNumberOnly(value)}
						>
							{({ fieldProps, error }) => (
								<Fragment>
									<Textfield
										{...fieldProps}
										placeholder="What expected maximize durations for completing project?"
									/>
									{error === "NOT_VALID" && (
										<ErrorMessage>
											Wrong input.
										</ErrorMessage>
									)}
								</Fragment>
							)}
						</Field>
						<FormFooter>
							<div>
								<Button onClick={() => handleChangeTab(1)}>
									Back
								</Button>
								<LoadingButton
									type="submit"
									appearance="primary"
									isLoading={submitting}
								>
									Scheduling
								</LoadingButton>

								{/* LOADING MODAL BUTTON */}
								<ModalTransition>
									{isOpen && (
										<Modal onClose={closeModal}>
											<ModalBody>
												<div
													style={{
														height: "120px",
														marginTop: "10px",
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
													}}
												>
													<RecentIcon label=""></RecentIcon>
													<p
														style={{
															fontSize: "18px",
														}}
													>
														This process will take
														some minutes...
													</p>
												</div>
												<ProgressBar
													ariaLabel="Loading"
													isIndeterminate
												></ProgressBar>
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
													onClick={
														closeModal &&
														handleChangeTab(3)
													}
												>
													DONE
												</Button>
											</ModalFooter>
										</Modal>
									)}
								</ModalTransition>
							</div>
						</FormFooter>
					</form>
				)}
			</Form>
		</div>
	);
}
