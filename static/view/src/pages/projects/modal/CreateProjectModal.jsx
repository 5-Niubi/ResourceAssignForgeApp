import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState, useCallback, useEffect } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormSection, HelperMessage } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import { getCurrentTime } from "../../../common/utils";
import { invoke } from "@forge/bridge";
import { DATE_FORMAT, MODAL_WIDTH } from "../../../common/contants";
import Toastify from "../../../common/Toastify";
import { useNavigate } from "react-router";
import InlineMessageGuideProjectField from "../message/InlineMessageGuideProjectField";

const width = MODAL_WIDTH.M;
function CreateProjectModal({ isOpen, setIsOpen, setProjectsDisplay }) {
	const columns = 10;
	const navigate = useNavigate();

	const [projectName, setProjectName] = useState("");
	const [startDate, setStartDate] = useState(getCurrentTime());
	const [endDate, setEndDate] = useState(startDate);
	const [budget, setBudget] = useState(0);
	const [unit, setUnit] = useState("$");
	const [baseWorkingHour, setBaseWorkingHour] = useState(8);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSetProjectName = function (e) {
		setProjectName(e.target.value);
	};

	const handleSetStartDate = function (value) {
		setStartDate(value);
		if (value > endDate) {
			setEndDate(value);
		}
	};

	const handleSetEndDate = function (value) {
		setEndDate(value);
	};

	const handleSetBudget = function (e) {
		setBudget(e.target.value);
	};

	const handleSetUnit = function (e) {
		setUnit(e.target.value);
	};

	const handleSetBaseWorkHour = function (e) {
		let workHour = Number(e.target.value);
		if (0 <= workHour && workHour <= 24) setBaseWorkingHour(workHour);
	};

	const closeModal = function () {
		setIsOpen(false);
	};

	function handleSubmitCreate() {
		setIsSubmitting(true);
		let projectObjRequest = {
			name: projectName,
			startDate,
			deadline: endDate,
			budget,
			budgetUnit: unit,
			baseWorkingHour,
		};
		invoke("createNewProjectProjectLists", { projectObjRequest })
			.then(function (res) {
				res.tasks = 0;
				setProjectsDisplay((prevs) => [res, ...prevs]);
				closeModal();
				navigate(`${res.id}/schedule`);
			})
			.catch((error) => {
				setIsSubmitting(false);
				Toastify.error(error.toString());
			});
	}

	return (
		<ModalTransition>
			<Modal onClose={closeModal} width={width}>
				<Form
					onSubmit={(formState) => console.log("form submitted", formState)}
				>
					{({ formProps }) => (
						<form id="form-with-id" {...formProps}>
							<ModalHeader>
								<div>
									<h2 style={{ display: "inline" }}>
										Create new Software Project
									</h2>
									<InlineMessageGuideProjectField />
								</div>
							</ModalHeader>
							<ModalBody>
								<Grid layout="fluid" spacing="compact" columns={columns}>
									<GridColumn medium={7}>
										<FormSection>
											<Field
												aria-required={true}
												name="projectName"
												label="Project Name"
												isRequired
											>
												{(fieldProps) => (
													<Fragment>
														<TextField
															autoComplete="off"
															value={projectName}
															onChange={handleSetProjectName}
															{...fieldProps}
														/>
														<HelperMessage>
															Project name must start with uppercase letter.
														</HelperMessage>
													</Fragment>
												)}
											</Field>
											<Field
												aria-required={true}
												name="projectBaseWorkHour"
												label="Working Hours/Day"
												isRequired
											>
												{(fieldProps) => (
													<Fragment>
														<TextField
															autoComplete="off"
															value={baseWorkingHour}
															onChange={handleSetBaseWorkHour}
															type="number"
															{...fieldProps}
														/>
														<HelperMessage>
															Working hour must greater than 0 and smaller than 24.
														</HelperMessage>
													</Fragment>
												)}
											</Field>
										</FormSection>
										<FormSection>
											<Field name="startDate" label="Start Date">
												{() => (
													<Fragment>
														<DatePicker
															value={startDate}
															onChange={handleSetStartDate}
															dateFormat={DATE_FORMAT.DMY}
														/>
													</Fragment>
												)}
											</Field>
											<Field name="endDate" label="End Date">
												{() => (
													<Fragment>
														<DatePicker
															minDate={startDate}
															value={endDate}
															onChange={handleSetEndDate}
															dateFormat={DATE_FORMAT.DMY}
														/>
													</Fragment>
												)}
											</Field>
										</FormSection>
										<FormSection>
											<Grid spacing="compact" columns={columns}>
												<GridColumn medium={8}>
													<Field name="budget" label="Budget">
														{() => (
															<TextField
																autoComplete="off"
																value={budget}
																onChange={handleSetBudget}
																type="number"
															/>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={2}>
													<Field name="budgetUnit" label="Unit">
														{(fieldProps) => (
															<TextField
																autoComplete="off"
																value={unit}
																onChange={handleSetUnit}
																{...fieldProps}
															/>
														)}
													</Field>
												</GridColumn>
											</Grid>
										</FormSection>
									</GridColumn>
								</Grid>
							</ModalBody>

							<ModalFooter>
								<ButtonGroup>
									<Button appearance="default" onClick={closeModal}>
										Cancel
									</Button>

									<LoadingButton
										type="submit"
										appearance="primary"
										onClick={handleSubmitCreate}
										isLoading={isSubmitting}
									>
										Create
									</LoadingButton>
								</ButtonGroup>
							</ModalFooter>
						</form>
					)}
				</Form>
			</Modal>
		</ModalTransition>
	);
}

export default CreateProjectModal;
