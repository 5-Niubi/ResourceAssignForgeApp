import React, { useState, useEffect } from "react";
import { findObj } from "../pertchart/VisualizeTasks";
import { useNavigate, useParams } from "react-router";
import SectionMessage from "@atlaskit/section-message";
import { invoke } from "@forge/bridge";
import __noop from "@atlaskit/ds-lib/noop";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";
import { PiStarFill } from "react-icons/pi";

export default function ParameterEstimateMessage() {
	var estimation = JSON.parse(localStorage.getItem("estimation"));
	let { projectId } = useParams();
	var milestones = JSON.parse(localStorage.getItem("milestones"));

	return (
		<SectionMessage title="We need these resources:" appearance="warning">
			{estimation.workforceWithMilestoneList?.map((ml, index) => {
				let obj = findObj(milestones, ml.id);
				if (obj) {
					return (
						<ul>
							{ml?.workforceOutputList?.map((workers, index) => {
								let skills = [];
								workers.skillOutputList?.forEach((skill) =>
									skills.push(
										skill.name + " level " + skill.level
									)
								);
								return (
									<li>
										{workers.quantity} workers with skills
										set (
										{workers.skillOutputList?.map(
											(skill, i) => (
												<span
													style={{
														marginRight: "2px",
													}}
												>
													<Lozenge
														key={i}
														style={{
															marginLeft: "8px",
															backgroundColor:
																COLOR_SKILL_LEVEL[
																	skill.level -
																		1
																].color,
															color: "white",
														}}
														isBold
													>
														{skill.name} -{" "}
														{skill.level}
														<PiStarFill />
													</Lozenge>
												</span>
											) 
										)}
										) 
									</li>
								);
							})}
						</ul>
					);
				}
			})}
		</SectionMessage>
	);
}
