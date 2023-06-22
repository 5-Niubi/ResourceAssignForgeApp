import { ReactNode } from "react";

import { css, jsx } from "@emotion/react";

import { N20, N200 } from "@atlaskit/theme/colors";
import { borderRadius as getBorderRadius } from "@atlaskit/theme/constants";
import { token } from "@atlaskit/tokens";

import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import WorkforcePageHeader from "./workforces/WorkforcePageHeader";
import WorkforceDynamicTable from "./workforces/WorkforceDynamicTable";
import EquipmentPageHeader from "./equipments/EquipmentHeader";
import EquipmentDynamicTable from "./equipments/EquipmentDynamicTable";

const borderRadius = getBorderRadius();

const panelStyles = css({
	display: "flex",
	marginTop: token("space.200", "16px"),
	marginBottom: token("space.100", "8px"),
	padding: token("space.400", "32px"),
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	flexGrow: 1,
	backgroundColor: token("color.background.neutral", N20),
	borderRadius: `${borderRadius}px`,
	color: token("color.text.subtlest", N200),
	fontSize: "4em",
	fontWeight: 500,
	width: "100%",
});

export const Panel = ({ children, testId }) => (
	<div css={panelStyles} data-testid={testId}>
		{children}
	</div>
);

export default function ResourceTabs() {
	return (
		<Tabs
			onChange={(index) => console.log("Selected Tab", index + 1)}
			id="default"
		>
			<TabList>
				<Tab>Workforces</Tab>
				<Tab>Equipments</Tab>
			</TabList>
			<TabPanel>
                <div style={{width: "100%"}}>   
					<WorkforcePageHeader></WorkforcePageHeader>
					<WorkforceDynamicTable></WorkforceDynamicTable>
				</div>
			</TabPanel>
			<TabPanel>
                <div style={{width: "100%"}}>   
					<EquipmentPageHeader></EquipmentPageHeader>
					<EquipmentDynamicTable></EquipmentDynamicTable>
				</div>
			</TabPanel>
		</Tabs>
	);
}
