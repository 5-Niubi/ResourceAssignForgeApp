import Button, { LoadingButton } from "@atlaskit/button";
import Heading from "@atlaskit/heading";
import { Grid, GridColumn } from "@atlaskit/page";
import { xcss, Box, Flex } from "@atlaskit/primitives";
import React, { useCallback, useContext, useState } from "react";
import { MODAL_WIDTH, THREAD_ACTION } from "../../../common/contants";
import Image from "@atlaskit/image";

const width = MODAL_WIDTH.M;
const columns = 10;

const containerStyles = xcss({
	display: "flex",
	height: "3rem",
	justifyContent: "left",
});

const buttonContainerStyles = xcss({
	display: "flex",
	justifyContent: "right",
	alignItems: "center",
	height: "3rem"
});

const descriptionContainerStyles = xcss({
	display: "flex", alignItems: "center", justifyContent: "center", height: "3rem"
});
const jiraSoftwarelogo = "https://i.ibb.co/wR3CZ6v/Jira-Emblem.png"
function JiraCreateProjectExportGrid({
	isButtonExportLoading,
	onButtonExportClick,
}) {
	return (
		<Grid layout="fluid" spacing="compact" columns={columns}>
			<GridColumn medium={2}>
				<Box xcss={containerStyles}>
					<Image
						src={
							jiraSoftwarelogo
						}
						alt="JiraSoftware Logo"
					/>
				</Box>
			</GridColumn>
			<GridColumn medium={6}>
				<Box xcss={descriptionContainerStyles}>
					<Heading level="h400">
						Automatic create a Jira Software Project an import task to
					</Heading>
				</Box>
			</GridColumn>
			<GridColumn medium={2}>
				<Box xcss={buttonContainerStyles}>
					<LoadingButton
						isLoading={isButtonExportLoading}
						appearance="primary"
						onClick={onButtonExportClick}
					>
						Create
					</LoadingButton>
				</Box>
			</GridColumn>
		</Grid>
	);
}

export default JiraCreateProjectExportGrid;
