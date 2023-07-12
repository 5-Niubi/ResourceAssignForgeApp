import React, { Fragment, useState } from "react";

import Button from "@atlaskit/button/standard-button";
import Form, {
	Field,
	FormFooter,
	HelperMessage,
	RangeField,
} from "@atlaskit/form";
import Range from "@atlaskit/range";

import Textfield from "@atlaskit/textfield";
import LoadingModal from "./LoadingModal";
import {
	Content,
	LeftPanel,
	PageLayout,
	RightPanel,
} from "@atlaskit/page-layout";

export default function ParameterObjectInput({handleChangeTab}) {
	const [valueTime, setValueTime] = useState(50);
	const [valueCost, setValueCost] = useState(50);
	const [valueQuality, setValueQuality] = useState(50);

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
								<Field
									isRequired
									label="Expected Cost"
									name="example-text"
								>
									{({ expectedCost }) => (
										<Fragment>
											<Textfield
												placeholder="What expected maximize project's cost?"
												{...expectedCost}
											/>
											<HelperMessage>
												Number only
											</HelperMessage>
										</Fragment>
									)}
								</Field>
								<Field
									isRequired
									label="Expected Duration (days)"
									name="example-text"
								>
									{({ expectedDuration }) => (
										<Fragment>
											<Textfield
												placeholder="What expected maximize durations for completing project?"
												{...expectedDuration}
											/>
											<HelperMessage>
												Number only
											</HelperMessage>
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
									<LoadingModal handleChangeTab={handleChangeTab}></LoadingModal>
								</FormFooter>
							</form>
						)}
					</Form>
		</div>
	);
}
