import React from "react";

import SettingsIcon from "@atlaskit/icon/glyph/settings";
import ActivityIcon from "@atlaskit/icon/glyph/activity";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";

import {
	Header,
	NavigationFooter,
	NavigationHeader,
	NestableNavigationContent,
	Section,
	SideNavigation,
} from "@atlaskit/side-navigation";
import ButtonItemSideBar from "./ButtonItemSideBar";

function HomeSideBar(rootPath) {
	return (
		<SideNavigation label="project" testId="side-navigation">
			<NavigationHeader>
				<Header description="Sidebar header description">Sidebar Header</Header>
			</NavigationHeader>

			<NestableNavigationContent
				initialStack={[]}
				testId="nestable-navigation-content"
			>
				<Section hasSeparator>
					<ButtonItemSideBar
						rootPath={rootPath}
						text={"Project Lists"}
						pathTo={""}
						iconBefore={<ActivityIcon label="" />}
					/>
					<ButtonItemSideBar
						rootPath={rootPath}
						text={"Resources"}
						pathTo={"resources"}
						iconBefore={<PeopleGroupIcon label="" />}
					/>
					<ButtonItemSideBar
						rootPath={rootPath}
						text={"Settings"}
						pathTo={"settings"}
						iconBefore={<SettingsIcon label="" />}
					/>
				</Section>
			</NestableNavigationContent>

			<NavigationFooter>
				<div></div>
			</NavigationFooter>
		</SideNavigation>
	);
}

export default HomeSideBar;
