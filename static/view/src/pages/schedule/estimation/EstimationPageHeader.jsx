import React from "react";

import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";
import { MilestonesTimeline } from ".";

const EstimationPageHeader = ({ handleChangeTab }) => {
	const actionsContent = (
		<ButtonGroup>
			<Button appearance="primary" onClick={() => handleChangeTab(2)}>
				Next
			</Button>
		</ButtonGroup>
	);
	return (
		<PageHeader actions={actionsContent}>Resource Estimation</PageHeader>
	);
};

export default EstimationPageHeader;
