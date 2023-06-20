import RoadmapIcon from "@atlaskit/icon/glyph/roadmap";
import IssuesIcon from "@atlaskit/icon/glyph/issues";
import GraphLineIcon from "@atlaskit/icon/glyph/graph-line";
import {
	Header,
	NavigationFooter,
	NavigationHeader,
	NestableNavigationContent,
	Section,
	SideNavigation,
} from "@atlaskit/side-navigation";
import React from "react";
import ButtonItemSideBar from "./ButtonItemSideBar";

function ProjectSideBar(rootPath = "") {
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
						text={"Schedule"}
						pathTo={"/schedule"}
						iconBefore={<RoadmapIcon label="" />}
					/>
					<ButtonItemSideBar
						rootPath={rootPath}
						text={"Task Lists"}
						pathTo={"/tasks"}
						iconBefore={<IssuesIcon label="" />}
					/>
					<ButtonItemSideBar
						rootPath={rootPath}
						text={"Reports"}
						pathTo={"/reports"}
						iconBefore={<GraphLineIcon label="" />}
					/>
				</Section>
			</NestableNavigationContent>

			<NavigationFooter>
				<div></div>
			</NavigationFooter>
		</SideNavigation>
	);
}

export default ProjectSideBar;
