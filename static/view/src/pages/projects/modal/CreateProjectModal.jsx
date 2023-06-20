import Button, { ButtonGroup } from "@atlaskit/button";
import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	useModal,
} from "@atlaskit/modal-dialog";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState, useCallback } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormSection } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import ObjectiveRange from "../form/ObjectiveRange";
import { getCurrentTime } from "../../../common/utils";

function CreateProjectModal() {
	const columns = 10;
	const { onClose } = useModal();

	const [projectName, setProjectName] = useState("");
	const [startDate, setStartDate] = useState(getCurrentTime());
	const [endDate, setEndDate] = useState(getCurrentTime());
	const [budget, setBudget] = useState(0);
	const [unit, setUnit] = useState("");
	const [objTime, setObjTime] = useState(50);
	const [objCost, setObjCost] = useState(50);
	const [objQuality, setObjQuality] = useState(50);

	const handleSetProjectName = useCallback(function (e) {
		setProjectName(e.target.value);
	}, []);

	const handleSetStartDate = useCallback(function (value) {
		setStartDate(value);
	}, []);

	const handleSetEndDate = useCallback(function (value) {
		setEndDate(value);
	}, []);

	const handleSetBudget = useCallback(function (e) {
		setBudget(e.target.value);
	}, []);

	const handleSetUnit = useCallback(function (e) {
		setUnit(e.target.value);
	}, []);

	const handleSetObjTime = useCallback(function (e) {
		setObjTime(e.target.value);
	}, []);

	const handleRangeSetObjTime = useCallback(function (value) {
		setObjTime(value);
	}, []);

	const handleSetObjCost = useCallback(function (e) {
		setObjCost(e.target.value);
	}, []);

	const handleRangeSetObjCost = useCallback(function (value) {
		setObjCost(value);
	}, []);

	const handleSetObjQuality = useCallback(function (e) {
		setObjQuality(e.target.value);
	}, []);

	const handleRangeSetObjQuality = useCallback(function (value) {
		setObjQuality(value);
	}, []);

	return (
		<Fragment>
			<Form onSubmit={(formState) => console.log("form submitted", formState)}>
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
									</FormSection>
									<FormSection>
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
									</FormSection>
								</GridColumn>
							</Grid>
						</ModalBody>

						<ModalFooter>
							<ButtonGroup>
								<Button appearance="default" onClick={onClose}>
									Cancel
								</Button>
								<Button type="submit" appearance="primary" autoFocus>
									Create
								</Button>
							</ButtonGroup>
						</ModalFooter>
					</form>
				)}
			</Form>
		</Fragment>
	);
}

export default CreateProjectModal;