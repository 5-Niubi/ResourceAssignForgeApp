
import "react-vertical-timeline-component/style.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import __noop from '@atlaskit/ds-lib/noop';
import EstimationPageHeader from "./EstimationPageHeader";
import MilestonesTimeline from "./EstimationMilestoneTimeline";


/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function EstimationPage() {
	let navigate = useNavigate();
	return (
		<>
            <EstimationPageHeader></EstimationPageHeader>
			<MilestonesTimeline></MilestonesTimeline>
		</>
	);
}

export default EstimationPage;


