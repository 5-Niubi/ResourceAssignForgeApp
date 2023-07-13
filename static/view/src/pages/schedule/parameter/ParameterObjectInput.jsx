import React, { Fragment, useState, useCallback } from "react";
import Button from "@atlaskit/button/standard-button";
import Form, {
	Field,
	FormFooter,
	HelperMessage,
	RangeField,
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
	const [expectedCost, setExpectedCost] = useState(50);
	const [expectedDuration, setExpectedDuration] = useState(50);
    const [isScheduling, setIsScheduling] = useState(false);

	const [valueTime, setValueTime] = useState(50);
	const [valueCost, setValueCost] = useState(50);
	const [valueQuality, setValueQuality] = useState(50);
	const [isOpen, setIsOpen] = useState(false);
	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	function SaveParameters() {
        setIsScheduling(true);
		var data = {
			ProjectId: Number(projectId),
			Duration: expectedDuration,
			Budget: expectedCost,
			ParameterResources: [
				{
					ResourceId: 1,
					Type: "workforce",
				},
			],
		};

		invoke("saveParameters", { parameter: data })
			.then(function (res) {
				if (res) {
					Toastify.info(res.toString());
					handleChangeTab(3);
					setIsScheduling(false);
				}
			})
			.catch(function (error) {
					handleChangeTab(3);
				Toastify.error(error.toString());
			});
	}

	return (
		<div style={{ width: "100%" }}>
			<Form
				onSubmit={(formState) =>
					console.log("form submitted", formState)
				}
			>
				{({
					formProps,
					expectedDuration,
					expectedCost,
					time,
					cost,
					quality,
				}) => (
					<form {...formProps}>
						<Field isRequired label="Expected Cost" name="cost">
							{({ expectedCost }) => (
								<Fragment>
									<Textfield
										placeholder="What expected maximize project's cost?"
										{...expectedCost}
									/>
									<HelperMessage>Number only</HelperMessage>
								</Fragment>
							)}
						</Field>
						<Field
							isRequired
							label="Expected Duration (days)"
							name="duration"
						>
							{({ expectedDuration }) => (
								<Fragment>
									<Textfield
										placeholder="What expected maximize durations for completing project?"
										{...expectedDuration}
									/>
									<HelperMessage>Number only</HelperMessage>
								</Fragment>
							)}
						</Field>
						{/* OBJECTIVE PARAMETER SLIDE */}
						{/* <RangeField
									isRequired
									label="Time"
									name="example-text"
									defaultValue={50}
								>
									{({ time }) => (
										<>
											<Range
												{...time}
												onChange={(time) =>
													setValueTime(time)
												}
											/>
											<p>
												The time value is: {valueTime}
											</p>
										</>
									)}
								</RangeField>
								<RangeField
									isRequired
									label="Cost"
									name="example-text"
									defaultValue={50}
								>
									{({ cost }) => (
										<>
											<Range
												{...cost}
												onChange={(cost) =>
													setValueCost(cost)
												}
											/>
											<p>
												The cost value is: {valueCost}
											</p>
										</>
									)}
								</RangeField>
								<RangeField
									isRequired
									label="Quality"
									name="example-text"
									defaultValue={50}
								>
									{({ quality }) => (
										<>
											<Range
												{...quality}
												onChange={(quality) =>
													setValueQuality(quality)
												}
											/>
											<p>
												The cost value is:{" "}
												{valueQuality}
											</p>
										</>
									)}
								</RangeField> */}
						<FormFooter>
							<div>
								<Button onClick={() => handleChangeTab(1)}>
									Back
								</Button>
								{isScheduling ? (
									<LoadingButton
										appearance="primary"
										isLoading
									>
										Scheduling...
									</LoadingButton>
								) : (
                                    <Button
									appearance="primary"
									onClick={openModal && SaveParameters}
								>
									Schedule
								</Button>
								)}

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
