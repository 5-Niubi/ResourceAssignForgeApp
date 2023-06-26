import React from "react";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";

const actionsContent = (
	<ButtonGroup>
		<Button href="projects/schedule">Reschedule</Button>
		<Button appearance="primary">Sync to Jira</Button>
		<Button appearance="primary">Save</Button>
	</ButtonGroup>
);

const GanttChartPageHeader = () => {
	return (
		<PageHeader actions={actionsContent}>
            Gantt chart
		</PageHeader>
	);
};

export default GanttChartPageHeader;
