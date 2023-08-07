import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
	useModal,
} from "@atlaskit/modal-dialog";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState, useCallback, useEffect } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormSection, HelperMessage } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import ObjectiveRange from "../form/ObjectiveRange";
import { getCurrentTime } from "../../../common/utils";
import { invoke } from "@forge/bridge";
import { DATE_FORMAT, MODAL_WIDTH } from "../../../common/contants";
import Toastify from "../../../common/Toastify";
import Spinner from "@atlaskit/spinner";
const width = MODAL_WIDTH.M;
const columns = 10;

function EditProjectModal({ openState, setOpenState, setProjectsListState }) {
	const [project, setProject] = useState(openState.project);
	const [projectName, setProjectName] = useState(project.name);
	const [startDate, setStartDate] = useState(project.startDate);
	const [endDate, setEndDate] = useState(project.deadline);
	const [budget, setBudget] = useState(0);
	const [unit, setUnit] = useState("");
	const [baseWorkingHour, setBaseWorkingHour] = useState(
		project.baseWorkingHour || 0
	);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const closeModal = function () {
		setOpenState({ project: {}, isOpen: false });
	};

	useEffect(function () {
		invoke("getProjectDetail", { projectId: project.id })
			.then(function (res) {
				let projectRes = res;
				setProjectName(projectRes.name);
				setStartDate(projectRes.startDate);
				setEndDate(projectRes.deadline);
				setBudget(projectRes.budget);
				setUnit(projectRes.budgetUnit);
				setBaseWorkingHour(projectRes.baseWorkingHour);

				setProject(projectRes);
				setIsLoaded(true);
			})
			.catch(function (error) {
				Toastify.error(error.toString());
			});
	}, []);

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

	function handleSubmitCreate() {
		setIsSubmitting(true);
		let projectObjRequest = {
			id: project.id,
			name: projectName,
			startDate,
			deadline: endDate,
			budget,
			budgetUnit: unit,
			baseWorkingHour,
		};

		invoke("editProject", { projectObjRequest })
			.then(function (res) {
				closeModal();
				openState.project.name = res.name;
				openState.project.startDate = res.startDate;
				setProjectsListState((prev) => [...prev]);
				Toastify.success("Saved");
			})
			.catch(function (error) {
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
								<ModalTitle>
									<div
										style={{
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{project.name}
									</div>
								</ModalTitle>
								{!isLoaded && <Spinner size={"medium"}></Spinner>}
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
												{() => (
													<Fragment>
														<TextField
															autoComplete="off"
															value={projectName}
															onChange={handleSetProjectName}
															isDisabled={!isLoaded}
															isRequired
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
															isDisabled={!isLoaded}
															{...fieldProps}
														/>
														<HelperMessage>
															Working hour must greater than 0 and smaller than
															24.
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
															isDisabled={!isLoaded}
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
															isDisabled={!isLoaded}
														/>
													</Fragment>
												)}
											</Field>
										</FormSection>
										<FormSection>
											<Grid spacing="compact" columns={columns}>
												<GridColumn medium={8}>
													<Field
														aria-required={true}
														name="budget"
														label="Budget"
													>
														{(fieldProps) => (
															<TextField
																autoComplete="off"
																value={budget}
																onChange={handleSetBudget}
																type="number"
																isDisabled={!isLoaded}
																{...fieldProps}
															/>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={2}>
													<Field
														aria-required={true}
														name="budgetUnit"
														label="Unit"
													>
														{(fieldProps) => (
															<TextField
																autoComplete="off"
																value={unit}
																onChange={handleSetUnit}
																isDisabled={!isLoaded}
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
										isDisabled={!isLoaded}
										isLoading={isSubmitting}
									>
										Save
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

export default EditProjectModal;
