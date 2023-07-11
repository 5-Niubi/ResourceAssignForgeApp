import React from 'react';

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import PageHeader from '@atlaskit/page-header';
import { MilestonesTimeline } from '.';


const actionsContent = (
	<ButtonGroup>
		<Button appearance="primary">Next</Button>
	</ButtonGroup>
);


const EstimationPageHeader = () => {
	return (
		<PageHeader
			actions={actionsContent}
		>
			Resource Estimation
		</PageHeader>
	);
};

export default EstimationPageHeader;
