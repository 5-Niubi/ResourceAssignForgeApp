import React, { Fragment, useState, useCallback, useEffect } from "react";
import Button from "@atlaskit/button/standard-button";
import Form, {
	Field,
	FormFooter,
	HelperMessage,
	ErrorMessage,
	RangeField,
	ValidMessage,
	FormSection,
	FormHeader,
} from "@atlaskit/form";
import Range from "@atlaskit/range";
import { Grid, GridColumn } from "@atlaskit/page";
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
import { ButtonGroup, LoadingButton } from "@atlaskit/button";
import { DATE_FORMAT, MODAL_WIDTH } from "../../../common/contants";
import { DatePicker } from "@atlaskit/datetime-picker";
import { getCurrentTime, calculateDuration } from "../../../common/utils";
import Spinner from "@atlaskit/spinner";
import { RadioGroup } from "@atlaskit/radio";
import Page from "@atlaskit/page";
import PageHeader from "@atlaskit/page-header";

const boldStyles = css({
	fontWeight: "bold",
});
const objectiveItems = [
	{ name: "time", value: "time", label: "Time" },
	{ name: "cost", value: "cost", label: "Cost" },
	{ name: "experience", value: "quality", label: "Experience" },
	{ name: "none", value: "", label: "Neutral" },
];

export default function ParameterObjectInput({ handleChangeTab }) {
	let project_detail = JSON.parse(localStorage.getItem("project_detail"));
	const { projectId } = useParams();
	const [startDate, setStartDate] = useState(project_detail.startDate);
	const [endDate, setEndDate] = useState(project_detail.deadline);
	const [budget, setBudget] = useState(project_detail.budget);
	const [budgetUnit, setBudgetUnit] = useState(project_detail.budgetUnit);
	const [isLoading, setIsLoading] = useState(false);
	const [isScheduling, setIsScheduling] = useState(false);

	// useEffect(function () {
	// 	invoke("getProjectDetail", { projectId })
	// 		.then(function (res) {
	// 			let project = {
	// 				startDate: res.startDate,
	// 				endDate: res.deadline,
	// 				budgetUnit: res.budgetUnit,
	// 				budget: res.budget,
	// 			};
	// 			setStartDate(project.startDate);
	// 			setEndDate(project.endDate);
	// 			setBudget(project.budget);
	// 			setBudgetUnit(project.budgetUnit);
	// 			console.log(
	// 				"PROJECT DATE: ",
	// 				project.startDate +
	// 					", " +
	// 					project.endDate +
	// 					", " +
	// 					project.budget +
	// 					", " +
	// 					project.budgetUnit
	// 			);

	// 			setIsLoading(false);
	// 		})
	// 		.catch(function (error) {
	// 			console.log("PROJECT DATE: ", error);
	// 		});
	// }, []);

	const handleSetStartDate = useCallback(function (value) {
		setStartDate(value);
	}, []);

	const handleSetEndDate = useCallback(function (value) {
		setEndDate(value);
	}, []);

	const [isOpen, setIsOpen] = useState(false);
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
	};

	function SaveParameters({ cost, objectives }) {
		setIsScheduling(true);
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
			Duration: calculateDuration({ startDate, endDate }),
            ObjectiveTime: (objectives === "time")?1:null,
            ObjectiveCost: (objectives === "cost")?1:null,
            ObjectiveQuality: (objectives === "quality")?1:null,
			StartDate: startDate,
			DeadLine: endDate,
			Budget: Number(cost),
			ParameterResources: parameterResources,
		};
		console.log("Send parameter data: ", data);

		invoke("saveParameters", { parameter: data })
			.then(function (res) {
				if (res) {
					// Toastify.info("Save successfully.");
					// handleChangeTab(3);
					// setIsScheduling(false);
					localStorage.setItem("parameterId", res.id);

					//call api to schedule
					invoke("getThreadSchedule", { parameterId: res.id })
						.then(function (res) {
							if (res) {
								//Getting result
								var scheduleInterval = setInterval(function () {
									invoke("schedule", {
										threadId: res.threadId,
									})
										.then(function (res) {
											setIsScheduling(false);
											if (res && res.status == "success") {
												clearInterval(scheduleInterval);

												Toastify.success("Schedule successfully.");

												handleChangeTab(3);
											}
										})
										.catch(function (error) {
											setIsScheduling(false);
											Toastify.error(error.toString());
										});
								}, 5000);
							}
						})
						.catch(function (error) {
							setIsScheduling(false);
							Toastify.error(error.toString());
						});
				}
				// DISPLAY SUCCESSFUL MESSAGE OR NEED MORE SKILL REQUIRED MESSAGE (NOT DONE)
				Toastify.info(res);
				console.log("message required skills in task", res);
				setIsScheduling(false);
			})
			.catch(function (error) {
				// handleChangeTab(3);
				setIsScheduling(false);
				Toastify.error(error.toString());
				setIsScheduling(false);
			});
	}

	const actionsContent = (
		<ButtonGroup>
			<LoadingButton onClick={() => handleChangeTab(1)}>
				Back
			</LoadingButton>
			<LoadingButton
				type="submit"
				appearance="primary"
				isLoading={isScheduling}
			>
				Scheduling
			</LoadingButton>
		</ButtonGroup>
	);

	return (
		<div style={{ width: "100%" }}>
			{isLoading ? <Spinner size={"large"} /> : null}
			<Form
				onSubmit={({ cost, objectives }) => {
					console.log("Form Submitted: ", objectives);
					SaveParameters({ cost, objectives });
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
						<PageHeader actions={actionsContent}>
							<div style={{ width: "100%" }}>Parameters</div>
						</PageHeader>
						<FormSection>
							<Grid layout="fluid" medium={0}>
								{/* EXPECTED COST TEXTFIELD */}
								<GridColumn medium={0}>
									<Field
										isRequired
										label="Expected Cost"
										name="cost"
										validate={(value) =>
											validateNumberOnly(value)
										}
										defaultValue={budget}
									>
										{({ fieldProps, error }) => (
											<Fragment>
												<Textfield
													{...fieldProps}
													placeholder="What expected maximize project's cost?"
													elemBeforeInput={
														<p
															style={{
																marginLeft: 10,
																fontWeight:
																	"bold",
															}}
														>
															{budgetUnit}
														</p>
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
								</GridColumn>
								{/* START DATE DATETIMEPICKER */}
								<GridColumn medium={0}>
									<Field
										name="startDate"
										label="Start Date"
										isRequired
									>
										{() => (
											<Fragment>
												<DatePicker
													value={startDate}
													onChange={
														handleSetStartDate
													}
													dateFormat={DATE_FORMAT.DMY}
													isRequired
												/>
											</Fragment>
										)}
									</Field>
								</GridColumn>
								{/* END DATE DATETIMEPICKER */}
								<GridColumn medium={0}>
									<Field
										name="endDate"
										label="End Date"
										isRequired
									>
										{() => (
											<Fragment>
												<DatePicker
                                                    minDate={startDate}
													value={endDate}
													onChange={handleSetEndDate}
													dateFormat={DATE_FORMAT.DMY}
													isRequired
												/>
											</Fragment>
										)}
									</Field>
								</GridColumn>
								{/* SLECT OBJECT RADIO */}
								<GridColumn medium={18}>
									<Field
										label="Objective Estimation"
										name="objectives"
										defaultValue=""
										isRequired
									>
										{({ fieldProps }) => (
											<RadioGroup
												{...fieldProps}
												options={objectiveItems}
											/>
										)}
									</Field>
								</GridColumn>
							</Grid>
						</FormSection>
					</form>
				)}
			</Form>
		</div>
	);
}
