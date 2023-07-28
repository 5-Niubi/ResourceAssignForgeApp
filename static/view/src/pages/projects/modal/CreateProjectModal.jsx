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
import { useNavigate } from "react-router";

const width = MODAL_WIDTH.M;
function CreateProjectModal({ isOpen, setIsOpen, setProjectsDisplay }) {
	const columns = 10;
	const navigate = useNavigate();

	const [projectName, setProjectName] = useState("");
	const [startDate, setStartDate] = useState(getCurrentTime());
	const [endDate, setEndDate] = useState(startDate);
	const [budget, setBudget] = useState(0);
	const [unit, setUnit] = useState("");
	const [objTime, setObjTime] = useState(50);
	const [objCost, setObjCost] = useState(50);
	const [objQuality, setObjQuality] = useState(50);

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

	const handleSetObjTime = function (e) {
		setObjTime(e.target.value);
	};

	const handleRangeSetObjTime = function (value) {
		setObjTime(value);
	};

	const handleSetObjCost = function (e) {
		setObjCost(e.target.value);
	};

	const handleRangeSetObjCost = function (value) {
		setObjCost(value);
	};

	const handleSetObjQuality = function (e) {
		setObjQuality(e.target.value);
	};

	const handleRangeSetObjQuality = function (value) {
		setObjQuality(value);
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
			objectiveTime: objTime,
			objectiveCost: objCost,
			objectiveQuality: objQuality,
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
								<ModalTitle>Create new Software Project</ModalTitle>
							</ModalHeader>
							<ModalBody>
								<Grid layout="fluid" spacing="compact" columns={columns}>
									<GridColumn medium={7}>
										<FormSection>
											<Field
												aria-required={true}
												name="projectName"
												label="Project Name"
											>
												{() => (
													<TextField
														autoComplete="off"
														value={projectName}
														onChange={handleSetProjectName}
													/>
												)}
											</Field>
										</FormSection>
										<FormSection>
											<Field name="startDate" label="Start Date" isRequired>
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
											<Field name="endDate" label="End Date" isRequired>
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
										{/* <FormSection>
											<Grid spacing="compact" columns={columns}>
												<GridColumn medium={8}>
													<Field
														aria-required={true}
														name="budget"
														label="Budget"
													>
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
													<Field
														aria-required={true}
														name="budgetUnit"
														label="Unit"
													>
														{() => (
															<TextField
																autoComplete="off"
																value={unit}
																onChange={handleSetUnit}
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
													rangeOnChange={
														handleRangeSetObjTime
													}
												/>
												<ObjectiveRange
													name="ObjectiveCost"
													label="Objective Cost"
													value={objCost}
													onChange={handleSetObjCost}
													rangeOnChange={
														handleRangeSetObjCost
													}
												/>
												<ObjectiveRange
													name="ObjectiveQuality"
													label="Objective Quality"
													value={objQuality}
													onChange={
														handleSetObjQuality
													}
													rangeOnChange={
														handleRangeSetObjQuality
													}
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
										>
											Create
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

export default CreateProjectModal;
