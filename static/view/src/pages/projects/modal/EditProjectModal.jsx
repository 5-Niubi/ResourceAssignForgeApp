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
import Form, { Field, FormSection } from "@atlaskit/form";
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
	const [endDate, setEndDate] = useState(startDate);
	const [budget, setBudget] = useState(0);
	const [unit, setUnit] = useState("");
	// const [objTime, setObjTime] = useState(50);
	// const [objCost, setObjCost] = useState(50);
	// const [objQuality, setObjQuality] = useState(50);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const closeModal = function () {
		setOpenState({ project: {}, isOpen: false });
	};

	useEffect(function () {
		invoke("getProjectDetail", { projectId: project.id })
			.then(function (res) {
				let project = res;
				project.isLoaded = true;
				setProjectName(project.name);
				setStartDate(project.startDate);
				setEndDate(project.deadline);
				setBudget(project.budget);
				setUnit(project.budgetUnit);
				setProject(project);
			})
			.catch(function (error) {
				Toastify.error(error.toString());
			});
	}, []);

	// useEffect(
	// 	function () {
	// 		setProjectName(project.name);
	// 		setStartDate(project.startDate);
	// 		setEndDate(project.deadline);
	// 		setBudget(project.budget);
	// 		setUnit(project.budgetUnit);
	// 	},
	// 	[project]
	// );

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

	// const handleSetObjTime = useCallback(function (e) {
	// 	setObjTime(e.target.value);
	// }, []);

	// const handleRangeSetObjTime = useCallback(function (value) {
	// 	setObjTime(value);
	// }, []);

	// const handleSetObjCost = useCallback(function (e) {
	// 	setObjCost(e.target.value);
	// }, []);

	// const handleRangeSetObjCost = useCallback(function (value) {
	// 	setObjCost(value);
	// }, []);

	// const handleSetObjQuality = useCallback(function (e) {
	// 	setObjQuality(e.target.value);
	// }, []);

	// const handleRangeSetObjQuality = useCallback(function (value) {
	// 	setObjQuality(value);
	// }, []);
	
	function handleSubmitCreate() {
		setIsSubmitting(true);
		let projectObjRequest = {
			id: project.id,
			name: projectName,
			startDate,
			deadline: endDate,
			budget,
			budgetUnit: unit,
			// objectiveTime: objTime,
			// objectiveCost: objCost,
			// objectiveQuality: objQuality,
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
								<ModalTitle>{project.name}</ModalTitle>
								{project.isLoaded ? "" : <Spinner size={"medium"}></Spinner>}
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
													<TextField
														autoComplete="off"
														value={projectName}
														onChange={handleSetProjectName}
														isDisabled={!project.isLoaded}
														isRequired
													/>
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
															isDisabled={!project.isLoaded}
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
															isDisabled={!project.isLoaded}
														/>
													</Fragment>
												)}
											</Field>
										</FormSection>
										{/* <FormSection>
											<Grid spacing="compact" columns={columns}>
												<GridColumn medium={8}>
													<Field
														aria-required={true}
														name="budget"
														label="Budget"
														isRequired
													>
														{() => (
															<TextField
																autoComplete="off"
																value={budget}
																onChange={handleSetBudget}
																type="number"
																isDisabled={!project.isLoaded}
																isRequired
															/>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={2}>
													<Field
														aria-required={true}
														name="budgetUnit"
														label="Unit"
														isRequired={true}
													>
														{() => (
															<TextField
																autoComplete="off"
																value={unit}
																onChange={handleSetUnit}
																isDisabled={!project.isLoaded}
																isRequired={true}
															/>
														)}
													</Field>
												</GridColumn>
											</Grid>
										</FormSection> */}
										{/* <FormSection>
												<ObjectiveRange
													label="Objective Time"
													name="ObjectiveTime"
													value={objTime}
													onChange={handleSetObjTime}
													rangeOnChange={handleRangeSetObjTime}
												/>
												<ObjectiveRange
													name="ObjectiveCost"
													label="Objective Cost"
													value={objCost}
													onChange={handleSetObjCost}
													rangeOnChange={handleRangeSetObjCost}
												/>
												<ObjectiveRange
													name="ObjectiveQuality"
													label="Objective Quality"
													value={objQuality}
													onChange={handleSetObjQuality}
													rangeOnChange={handleRangeSetObjQuality}
												/>
											</FormSection> */}
									</GridColumn>
								</Grid>
							</ModalBody>

							<ModalFooter>
								<ButtonGroup>
									<Button appearance="default" onClick={closeModal}>
										Cancel
									</Button>
									{isSubmitting ? (
										<LoadingButton appearance="primary" isLoading>
											Create
										</LoadingButton>
									) : (
										<Button
											type="submit"
											appearance="primary"
											onClick={handleSubmitCreate}
											isDisabled={!project.isLoaded}
										>
											Save
										</Button>
									)}
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
