import RoadmapIcon from "@atlaskit/icon/glyph/roadmap";
import IssuesIcon from "@atlaskit/icon/glyph/issues";
import GraphLineIcon from "@atlaskit/icon/glyph/graph-line";
import FolderIcon from "@atlaskit/icon/glyph/folder";
import ArrowLeftCircleIcon from "@atlaskit/icon/glyph/arrow-left-circle";
import { ButtonItem } from "@atlaskit/side-navigation";
import { invoke } from "@forge/bridge";
import Spinner from "@atlaskit/spinner";

import {
	Header,
	NavigationFooter,
	NavigationHeader,
	NestableNavigationContent,
	Section,
	SideNavigation,
} from "@atlaskit/side-navigation";
import React, { useEffect, useState } from "react";
import ButtonItemSideBar from "./ButtonItemSideBar";
import { useNavigate, useParams } from "react-router";
import { AtlassianIcon } from "@atlaskit/logo";

function ProjectSideBar(rootPath = "") {
	const navigate = useNavigate();
	const [projectSidebar, setProjectSidebar] = useState(Object);
	const { projectId } = useParams();

	useEffect(function () {
		invoke("getProjectDetail", { projectId })
			.then(function (res) {
				setProjectSidebar(res);
                localStorage.setItem(
                    "project_detail",
                    JSON.stringify(res)
                );

			})
			.catch(function (error) {});
	}, []);

	return (
		<SideNavigation label="project" testId="side-navigation">
			<NavigationHeader>
				<Header
					description="Sidebar header description"
					iconBefore={<AtlassianIcon appearance="neutral" />}
				>
					{projectSidebar.name ? (
						projectSidebar.name
					) : (
						<Spinner interactionName="load" />
					)}{" "}
				</Header>
			</NavigationHeader>

			<NestableNavigationContent
				initialStack={[]}
				testId="nestable-navigation-content"
			>
				<Section>
					<ButtonItem
						iconBefore={<ArrowLeftCircleIcon label="" />}
						onClick={() => navigate("../")}
					>
						Go back
					</ButtonItem>
				</Section>
				<Section hasSeparator>
					<ButtonItemSideBar
						key="schedule"
						rootPath={rootPath}
						text={"Schedule"}
						pathTo={"schedule"}
						iconBefore={<RoadmapIcon label="" />}
					/>
					<ButtonItemSideBar
						key="task-list"
						rootPath={rootPath}
						text={"Task Lists"}
						pathTo={"tasks"}
						iconBefore={<IssuesIcon label="" />}
					/>
					<ButtonItemSideBar
						key="task-group"
						rootPath={rootPath}
						text={"Task Groups"}
						pathTo={"groups"}
						iconBefore={<FolderIcon label="" />}
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
