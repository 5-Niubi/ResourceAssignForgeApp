import React, {
	Fragment,
	useState,
	useCallback,
	useEffect,
	useContext,
} from "react";
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
import Lozenge from "@atlaskit/lozenge";
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
import {
    COLOR_SKILL_LEVEL,
	DATE_FORMAT,
	MODAL_WIDTH,
	THREAD_ACTION,
} from "../../../common/contants";
import { DatePicker } from "@atlaskit/datetime-picker";
import {
	getCurrentTime,
	calculateDuration,
	getCacheObject,
	saveThreadInfo,
	validateEnddate,
	extractErrorMessage,
} from "../../../common/utils";
import Spinner from "@atlaskit/spinner";
import { RadioGroup } from "@atlaskit/radio";
import Page from "@atlaskit/page";
import PageHeader from "@atlaskit/page-header";
import { ThreadLoadingContext } from "../../../components/main/MainPage";
import { AppContext } from "../../../App";
import { PiStarFill } from "react-icons/pi";

const objectiveItems = [
	{ name: "time", value: "time", label: "Time" },
	{ name: "cost", value: "cost", label: "Cost" },
	{ name: "experience", value: "quality", label: "Experience" },
	{ name: "none", value: "", label: "Neutral" },
];

export default function ParameterObjectInput({ handleChangeTab }) {
	let project_detail = getCacheObject("project", []);
	const { projectId } = useParams();
	const [startDate, setStartDate] = useState(project_detail.startDate);
	const [endDate, setEndDate] = useState(project_detail.deadline);
	const [budget, setBudget] = useState(project_detail.budget);
	const [budgetUnit, setBudgetUnit] = useState(project_detail.budgetUnit);
	const [isLoading, setIsLoading] = useState(false);
	const [isScheduling, setIsScheduling] = useState(false);
	const { setAppContextState } = useContext(AppContext);

	const handleSetStartDate = useCallback(function (value) {
		setStartDate(value);
	}, []);

	const handleSetEndDate = useCallback(function (value) {
		setEndDate(value);
	}, []);

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

	const threadLoadingContext = useContext(ThreadLoadingContext);
	const [threadStateValue, setThreadStateValue] = threadLoadingContext.state;

	const handleCreateThreadSuccess = useCallback((threadId) => {
		let threadAction = THREAD_ACTION.RUNNING_SCHEDULE;
		let threadInfo = {
			threadId,
			threadAction,
            callBack: loadScheduleSuccess
		};
		setThreadStateValue(threadInfo);
		saveThreadInfo(threadInfo);
	}, []);

	const handleCreateThreadFail = (messageRequiedSkills) => {
		setAppContextState((prev) => ({
			...prev,
			error: messageRequiedSkills,
		}));
	};

	function SaveParameters({ cost, objectives }) {
		setIsScheduling(true);
		var parameterResourcesLocal = getCacheObject("workforce_parameter", []);
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
			ObjectiveTime: objectives === "time" ? 1 : null,
			ObjectiveCost: objectives === "cost" ? 1 : null,
			ObjectiveQuality: objectives === "quality" ? 1 : null,
			StartDate: startDate,
			DeadLine: endDate,
			Budget: Number(cost),
			ParameterResources: parameterResources,
		};
		console.log("Send parameter data: ", data);

        async function saveAndSchedule() {
            try {
                let saveRes = await invoke("saveParameters", { parameter: data });
                console.log("saveParameters response: ", saveRes);
                localStorage.setItem("parameterId", saveRes.id);
                let getThreadScheduleRes = await invoke("getThreadSchedule", { parameterId: saveRes.id });
                if (getThreadScheduleRes) {
                    handleCreateThreadSuccess(getThreadScheduleRes.threadId);
                    setIsScheduling(false);
                }
            } catch (error) {
                setIsScheduling(false);
                let messageError = extractErrorMessage(error);
                let messageDisplay = messageError;
                debugger
                if (Array.isArray(messageError)) {
                    messageDisplay = (
                        <ul>
                            {messageError?.map((skillSet) => (
                                <li key={skillSet.taskId}>
                                    Task ID {skillSet.taskId} needs workers with skill sets{" "}
                                    {skillSet.skillRequireds?.map((skill, i) => (
                                        <span
                                            style={{ marginRight: "2px", marginLeft: "8px" }}
                                            key={i}
                                        >
                                            <Lozenge
                                                style={{
                                                    backgroundColor: COLOR_SKILL_LEVEL[skill.level - 1].color,
                                                    color: skill.level === 1 ? "#091e42" : "white",
                                                }}
                                                isBold
                                            >
                                                {skill.name} - {skill.level}
                                                <PiStarFill />
                                            </Lozenge>
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    );
          
                    handleCreateThreadFail(messageDisplay);
                    return;
                }
                Toastify.error(messageDisplay);
            }
        }
        saveAndSchedule();
	}

    function loadScheduleSuccess(){
        handleChangeTab(3);
        Toastify.success("Schedule successfully.");
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
				submitting
			>
				Schedule
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
										defaultValue={budget ?? 0}
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
										{({ fieldProps }) => (
											<Fragment>
												<DatePicker
													{...fieldProps}
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
										{({ fieldProps, error }) => (
											<Fragment>
												<DatePicker
													{...fieldProps}
													minDate={startDate}
													value={endDate ?? startDate}
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
