import React from "react";
import StarIcon from "@atlaskit/icon/glyph/star";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import ButtonGroup from "@atlaskit/button/button-group";
import Button from "@atlaskit/button/standard-button";
import __noop from "@atlaskit/ds-lib/noop";
import Select from "@atlaskit/select";
import TextField from "@atlaskit/textfield";
import { token } from "@atlaskit/tokens";
import PageHeader from "@atlaskit/page-header";

const barContent = (
	<div style={{ display: "flex" }}>
		<div style={{ flex: "0 0 200px" }}>
			<TextField
				isCompact
				placeholder="Search Human Name/Key"
				aria-label="Filter"
			/>
		</div>
		<div
			style={{ flex: "0 0 200px", marginLeft: token("space.100", "8px") }}
		>
			<Select
				spacing="compact"
				placeholder="Choices"
				aria-label="Choose an option"
			/>
		</div>
	</div>
);

const actionsContent = (
	<ButtonGroup>
		<Button appearance="primary">Primary Action</Button>
		<Button>Default</Button>
	</ButtonGroup>
);

const VisualizePageHeader = ({title}) => {
	return (
		<PageHeader bottomBar={barContent} actions={actionsContent}>
            {title}
		</PageHeader>
	);
};

export default VisualizePageHeader;
