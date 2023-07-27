import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import FlagFilledIcon from "@atlaskit/icon/glyph/flag-filled";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";
import TrayIcon from "@atlaskit/icon/glyph/tray";
import { findObj, getCache, getColor } from "../../../common/utils";

export default function MilestonesTimeline({ milestones, skills, handleChangeTab }) {
	var estimation = getCache("estimation");
	if (estimation){
		estimation = JSON.parse(estimation);
	} else {
		handleChangeTab(0);
		return "";
	}

	return (
		<>
			<VerticalTimeline lineColor="#172B4D">
				{estimation.workforceWithMilestoneList?.map(
					(milestone, index) => {
						let obj = findObj(milestones, milestone.id);
						if (obj) {
							return (
								<VerticalTimelineElement
									className="vertical-timeline-element--work"
									contentStyle={{
										background: getColor(milestone.id),
										color: "#444",
									}}
									contentArrowStyle={{
										borderRight:
											"7px solid " +
											getColor(milestone.id),
									}}
									iconStyle={{
										background: getColor(milestone.id),
										color: "black",
										paddingRight: "10",
									}}
								>
									<h3 className="vertical-timeline-element-title">
										#Milestone {index + 1}{" "}
										<FlagFilledIcon size="medium"></FlagFilledIcon>
									</h3>
									<h4 className="vertical-timeline-element-subtitle">
										{obj.name}
									</h4>
									{milestone?.workforceOutputList?.map(
										(workers, index) => {
											let skills = [];
											workers.skillOutputList?.forEach(
												(skill) =>
													skills.push(
														skill.name +
															" level " +
															skill.level
													)
											);
											return (
												<p>
													<PeopleGroupIcon></PeopleGroupIcon>{" "}
													{workers.quantity} workers
													with skills set (
													{skills.join("; ")})
												</p>
											);
										}
									)}
								</VerticalTimelineElement>
							);
						}
					}
				)}
			</VerticalTimeline>
		</>
	);
}
