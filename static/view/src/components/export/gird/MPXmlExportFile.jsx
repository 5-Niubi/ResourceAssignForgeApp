import { LoadingButton } from "@atlaskit/button";
import Heading from "@atlaskit/heading";
import { Grid, GridColumn } from "@atlaskit/page";
import { Box, xcss } from "@atlaskit/primitives";
import React from "react";
import { MODAL_WIDTH } from "../../../common/contants";
import Image from "@atlaskit/image";

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
	height: "3rem",
});

const descriptionContainerStyles = xcss({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "3rem",
});

const MSPLogo = "https://i.ibb.co/znTzdzQ/2346px-Microsoft-Project-2019-present-svg.png";

function MPXmlExportFile({ isButtonExportLoading, onButtonExportClick }) {
	return (
		<Grid layout="fluid" spacing="compact" columns={columns}>
			<GridColumn medium={2}>
				<Box xcss={containerStyles}>
					<Image
						src={
							MSPLogo
						}
						alt="Project logo"
						testId="image"
					/>
				</Box>
			</GridColumn>
			<GridColumn medium={6}>
				<Box xcss={descriptionContainerStyles}>
					<Heading level="h400">
						Export this solution to Microsoft Project XML file
					</Heading>
				</Box>
			</GridColumn>
			<GridColumn medium={2}>
				<Box xcss={buttonContainerStyles}>
					<LoadingButton
						isLoading={isButtonExportLoading}
						appearance="primary"
						onClick={onButtonExportClick}
						autoFocus={false}
					>
						Export
					</LoadingButton>
				</Box>
			</GridColumn>
		</Grid>
	);
}

export default MPXmlExportFile;
