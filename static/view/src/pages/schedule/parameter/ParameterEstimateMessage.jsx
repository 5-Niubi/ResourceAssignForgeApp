import React, {useState, useEffect} from "react";
import { findObj } from "../pertchart/VisualizeTasks";
import { useNavigate, useParams } from "react-router";
import SectionMessage from "@atlaskit/section-message";
import { invoke } from "@forge/bridge";
import __noop from '@atlaskit/ds-lib/noop';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';

export default function ParameterEstimateMessage() {
	var estimation = JSON.parse(localStorage.getItem("estimation"));
    let { projectId } = useParams();
    const [milestones, setMilestones] = useState([]);
	useEffect(function () {

		invoke("getAllMilestones", { projectId })
			.then(function (res) {
				if (Object.keys(res).length !== 0) {
					setMilestones(res);
				} else setMilestones([]);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		setMilestones([]);
		return;
	}, []);
	return (
		<SectionMessage title="We need these resources:" appearance="warning">
			{estimation.workforceWithMilestoneList?.map((milestone, index) => {
				let obj = findObj(milestones, milestone.id);
				if (obj) {
					return (
						<ul>
                            {milestone?.workforceOutputList?.map(
										(workers, index) => {
											let skills = [];
											workers.skillOutputList?.forEach(skill => skills.push(skill.name + " level " + skill.level))
											return (
												<li>
													{workers.quantity} workers with skills set ({skills.join("; ")})
												</li>
											);
										}
									)}
						</ul>
					);
				}
			})}
		</SectionMessage>
	);
}
