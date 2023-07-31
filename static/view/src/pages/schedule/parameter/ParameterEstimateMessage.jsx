import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import SectionMessage from "@atlaskit/section-message";
import { invoke } from "@forge/bridge";
import __noop from "@atlaskit/ds-lib/noop";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";
import { PiStarFill } from "react-icons/pi";
import { findObj, getCache } from "../../../common/utils";
import Toastify from "../../../common/Toastify";
import Spinner from "@atlaskit/spinner";

export default function ParameterEstimateMessage() {
	const [estimations, setEstimations] = useState([]);
	let { projectId } = useParams();
	const [isEstimating, setIsEstimating] = useState(true);

	useEffect(function () {
		invoke("estimate", { projectId })
			.then(function (res) {
				setIsEstimating(false);
				if (res.id || res.id === 0) {
					setEstimations(res);
				} else {
					Toastify.error("Error in estimate");
				}
				console.log("Get All Estimation", estimations);
			})
			.catch(function (error) {
				setIsEstimating(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	return (
		<>
			{isEstimating ? (
				<Spinner size={"large"} />
			) : (
				<SectionMessage
					title="We need these resources:"
					appearance="warning"
				>
					<ul>
						{estimations.workforceWithMilestoneList?.map(
							(workforceWithMilestone) =>
								workforceWithMilestone?.workforceOutputList?.map(
									(workers) => {
										let skills = [];
										workers.skillOutputList?.forEach(
											(skill) =>
												skills.push(
													skill.name +
														" level " +
														skill.level
												)
										);
										console.log("workers", workers);
										return (
											<>
												<li>
													{workers.quantity} workers
													with skills set (
													{workers.skillOutputList?.map(
														(skill, i) => (
															<span
																style={{
																	marginRight:
																		"2px",
																}}
															>
																<Lozenge
																	key={i}
																	style={{
																		marginLeft:
																			"8px",
																		backgroundColor:
																			COLOR_SKILL_LEVEL[
																				skill.level -
																					1
																			]
																				.color,
																		color: "white",
																	}}
																	isBold
																>
																	{skill.name}{" "}
																	-{" "}
																	{
																		skill.level
																	}
																	<PiStarFill />
																</Lozenge>
															</span>
														)
													)}
													)
												</li>
											</>
										);
									}
								)
						)}
					</ul>
				</SectionMessage>
			)}
		</>
	);
}
