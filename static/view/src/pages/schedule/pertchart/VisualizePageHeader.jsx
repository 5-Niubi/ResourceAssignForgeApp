import React from "react";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import PageHeader from "@atlaskit/page-header";

const actionsContent = (
	<ButtonGroup>
		<Button>Select tasks</Button>
		<Button appearance="primary">Estimate</Button>
	</ButtonGroup>
);

const VisualizePageHeader = ({title}) => {
	return (
		<PageHeader actions={actionsContent}>
            {title}
		</PageHeader>
	);
};

export default VisualizePageHeader;
