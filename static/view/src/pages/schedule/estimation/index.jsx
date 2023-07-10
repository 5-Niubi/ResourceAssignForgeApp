import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FlagFilledIcon from '@atlaskit/icon/glyph/flag-filled';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import TrayIcon from '@atlaskit/icon/glyph/tray';
/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function EstimationPage() {
	let navigate = useNavigate();
	return (
		<>
			<MilestonesTimeline></MilestonesTimeline>
		</>
	);
}

export default EstimationPage;

export function MilestonesTimeline() {
	return (
		<VerticalTimeline lineColor="#172B4D">
			<VerticalTimelineElement
				className="vertical-timeline-element--work"
				contentStyle={{
					background: "rgb(33, 150, 243)",
					color: "#fff",
				}}
				contentArrowStyle={{
					borderRight: "7px solid  rgb(33, 150, 243)",
				}}
				iconStyle={{ background: "rgb(33, 150, 243)", color: "black", paddingRight: "10" }}
			>
				<h3 className="vertical-timeline-element-title">
					#Milestone 1 <FlagFilledIcon size="medium"></FlagFilledIcon>
				</h3>
				<h4 className="vertical-timeline-element-subtitle">
                    Define project objectives, scope, and initial requirements
				</h4>
				<p>
                    <PeopleGroupIcon></PeopleGroupIcon> 1 PM
                </p>
                <p>
                    <TrayIcon></TrayIcon> 3 IOS Devices
				</p>
			</VerticalTimelineElement>
			<VerticalTimelineElement
				className="vertical-timeline-element--work"
				iconStyle={{ background: "#B5D33D", color: "#fff" }}
                contentStyle={{
					background: "#B5D33D",
					color: "#fff",
				}}
			>
				<h3 className="vertical-timeline-element-title" >
					#Milestone 2 <FlagFilledIcon size="medium"></FlagFilledIcon>
				</h3>
				<h4 className="vertical-timeline-element-subtitle" >
                    Conduct interviews and workshops to gather detailed software requirements
				</h4>
				<p>
                    <PeopleGroupIcon></PeopleGroupIcon> 2 Business Analyst, 1 PM, 2 Developer C#
                </p>
                <p>
                    <TrayIcon></TrayIcon> None
				</p>
			</VerticalTimelineElement>
			<VerticalTimelineElement
				className="vertical-timeline-element--work"
				iconStyle={{ background: "#EB7D58", color: "#fff" }}
                contentStyle={{
					background: "#EB7D58",
					color: "#fff",
				}}
			>
				<h3 className="vertical-timeline-element-title">
					#Milestone 3 <FlagFilledIcon size="medium"></FlagFilledIcon>
				</h3>
				<h4 className="vertical-timeline-element-subtitle">
                    Document and review software requirements with stakeholders
				</h4>
				<p>
                    <PeopleGroupIcon></PeopleGroupIcon> 1 PM
                </p>
                <p>
                    <TrayIcon></TrayIcon> 4 IOS Devices
				</p>
			</VerticalTimelineElement>
			<VerticalTimelineElement
				className="vertical-timeline-element--work"
				iconStyle={{ background: "#FED23F", color: "#fff" }}
                contentStyle={{
					background: "#FED23F",
					color: "#fff",
				}}
			>
				<h3 className="vertical-timeline-element-title">
					#Milestone 4 <FlagFilledIcon size="medium"></FlagFilledIcon>
				</h3>
				<h4 className="vertical-timeline-element-subtitle">
                    Create the high-level and detailed design of the software architecture
				</h4>
				<p>
                    <PeopleGroupIcon></PeopleGroupIcon> 1 PM
                </p>
                <p>
                    <TrayIcon></TrayIcon> 3 IOS Devices
				</p>
			</VerticalTimelineElement>
			<VerticalTimelineElement
				className="vertical-timeline-element--education"
				iconStyle={{ background: "#6CA2EA", color: "#fff" }}
                contentStyle={{
					background: "#6CA2EA",
					color: "#fff",
				}}
			>
				<h3 className="vertical-timeline-element-title">
					#Milestone 5 <FlagFilledIcon size="medium"></FlagFilledIcon>
				</h3>
				<h4 className="vertical-timeline-element-subtitle">
                    Conduct a review of the software design with relevant stakeholders
				</h4>
				<p>
                    <PeopleGroupIcon></PeopleGroupIcon> 1 PM
                </p>
                <p>
                    <TrayIcon></TrayIcon> 3 IOS Devices
				</p>
			</VerticalTimelineElement>
		</VerticalTimeline>
	);
}
