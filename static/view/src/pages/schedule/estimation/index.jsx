
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import __noop from '@atlaskit/ds-lib/noop';
import EstimationPageHeader from "./EstimationPageHeader";
import MilestonesTimeline from "./EstimationMilestoneTimeline";
import { invoke } from "@forge/bridge";



/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function EstimationPage({ handleChangeTab }) {
	let navigate = useNavigate();
	let { projectId } = useParams();

	const [skills, setSkills] = useState([]);
	const [milestones, setMilestones] = useState([]);
	useEffect(function () {
		invoke("getAllSkills", {})
			.then(function (res) {
				if (Object.keys(res).length !== 0) {
					setSkills(res);
				} else setSkills([]);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		setSkills([]);

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
		<div style={{ width: "100%" }}>
			<EstimationPageHeader
				handleChangeTab={handleChangeTab}
			></EstimationPageHeader>
			<MilestonesTimeline
				milestones={milestones}
				skills={skills}
			></MilestonesTimeline>
		</div>
	);
}

export default EstimationPage;


