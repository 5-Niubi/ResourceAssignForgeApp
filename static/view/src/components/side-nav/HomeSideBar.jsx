import React, { useCallback } from "react";
import { useNavigate } from "react-router";

import SettingsIcon from "@atlaskit/icon/glyph/settings";
import ActivityIcon from "@atlaskit/icon/glyph/activity";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";
import SignOutIcon from "@atlaskit/icon/glyph/sign-out";

import {
	Header,
	NavigationFooter,
	NavigationHeader,
	NestableNavigationContent,
	Section,
	SideNavigation,
	ButtonItem,
} from "@atlaskit/side-navigation";
import { invoke, router } from "@forge/bridge";

import ButtonItemSideBar from "./ButtonItemSideBar";

function HomeSideBar(rootPath) {

	const handleSignout = useCallback(function () {
		invoke("signout")
			.then(function (res) {
				router.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

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
				<Section hasSeparator>
					<ButtonItem
						iconBefore={<SignOutIcon label="signout" />}
						onClick={handleSignout}
					>
						Sign out
					</ButtonItem>
				</Section>
			</NavigationFooter>
		</SideNavigation>
	);
}

export default HomeSideBar;
