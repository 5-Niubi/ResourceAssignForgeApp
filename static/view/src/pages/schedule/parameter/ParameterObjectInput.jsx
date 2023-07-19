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

const boldStyles = css({
	fontWeight: "bold",
});

export default function ParameterObjectInput({ handleChangeTab }) {
	const { projectId } = useParams();
	const [startDate, setStartDate] = useState(getCurrentTime());
	const [endDate, setEndDate] = useState(getCurrentTime());
	const [budget, setBudget] = useState();
	const [budgetUnit, setBudgetUnit] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(function () {
		invoke("getProjectDetail", { projectId })
			.then(function (res) {
				let project = {
					startDate: res.startDate,
					endDate: res.deadline,
					budgetUnit: res.budgetUnit,
					budget: res.budget,
				};
				setStartDate(project.startDate);
				setEndDate(project.endDate);
				setBudget(project.budget);
				setBudgetUnit(project.budgetUnit);
				console.log(
					"PROJECT DATE: ",
					project.startDate +
						", " +
						project.endDate +
						", " +
						project.budget +
						", " +
						project.budgetUnit
				);

				setIsLoading(false);
			})
			.catch(function (error) {
				console.log("PROJECT DATE: ", error);
			});
	}, []);

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

	function SaveParameters({ cost }) {
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
			StartDate: startDate,
			DeadLine: endDate,
			Budget: Number(cost),
			ParameterResources: parameterResources,
		};
		console.log("Send parameter data: ", data);

		invoke("saveParameters", { parameter: data })
			.then(function (res) {
				if (res) {
					Toastify.info(res.toString());
					handleChangeTab(3);
				}
                // DISPLAY SUCCESSFUL MESSAGE OR NEED MORE SKILL REQUIRED MESSAGE (NOT DONE)
				Toastify.info(res);
                console.log("message required skills in task", res);
			})
			.catch(function (error) {
				Toastify.error(error.toString());
			});
	}

	return (
		<div style={{ width: "100%" }}>
			{isLoading ? <Spinner size={"large"} /> : null}
			<Form
				onSubmit={({ cost }) => {
					console.log("Form Submitted: ", cost);
					SaveParameters({ cost });
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
						<FormSection>
							<Grid spacing="compact" columns={16}>
								{/* EXPECTED COST TEXTFIELD */}
								<GridColumn medium={16}>
									<Field
										isRequired
										label="Expected Cost"
										name="cost"
										validate={(value) =>
											validateNumberOnly(value)
										}
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
								<GridColumn medium={8}>
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
								<GridColumn medium={8}>
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
													isDisabled={!endDate}
													isRequired
												/>
											</Fragment>
										)}
									</Field>
								</GridColumn>
							</Grid>
						</FormSection>
						<FormFooter>
							<ButtonGroup>
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
							</ButtonGroup>
						</FormFooter>
					</form>
				)}
			</Form>
		</div>
	);
}
