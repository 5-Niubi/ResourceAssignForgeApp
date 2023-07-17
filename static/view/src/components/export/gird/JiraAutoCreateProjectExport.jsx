import Button, { LoadingButton } from "@atlaskit/button";
import Heading from "@atlaskit/heading";
import { Grid, GridColumn } from "@atlaskit/page";
import { xcss, Box } from "@atlaskit/primitives";
import React, { useCallback, useContext, useState } from "react";
import { MODAL_WIDTH, THREAD_ACTION } from "../../../common/contants";
import Image from "@atlaskit/image";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import { ScheduleExportContext } from "../../../pages/TestModal";
import { ThreadLoadingContext } from "../../../App";

const width = MODAL_WIDTH.M;
const columns = 10;

const containerStyles = xcss({
	display: "flex",
	height: "100%",
	alignItems: "center",
	justifyContent: "center",
	width: "50%",
});

const buttonContainerStyles = xcss({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

function JiraAutoCreateProjectExport({isButtonExportLoading, onButtonExportClick}) {
	
	return (
		<Grid layout="fluid" spacing="compact" columns={columns}>
			<GridColumn medium={2}>
				<Box xcss={containerStyles}>
					<Image
						src={
							"https://assets.stickpng.com/images/62a9ad4c8ff6441a2952dab8.png"
						}
						alt="JiraSoftware Logo"
					/>
				</Box>
			</GridColumn>
			<GridColumn medium={6}>
				<Heading level="h400">
					Automatic create a Jira Software Project an import task to
				</Heading>
			</GridColumn>
			<GridColumn medium={2}>
				<Box xcss={buttonContainerStyles}>
					<LoadingButton
						isLoading={isButtonExportLoading}
						appearance="primary"
						onClick={onButtonExportClick}
					>
						Export
					</LoadingButton>
				</Box>
			</GridColumn>
		</Grid>
	);
}

export default JiraAutoCreateProjectExport;
