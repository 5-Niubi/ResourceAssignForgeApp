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
import Avatar from "@atlaskit/avatar";
import { APP_NAME, PROJECT_NAME_DESCRIPTOR } from "../../common/contants";
import { HelperMessage } from "@atlaskit/form";
import MoreSection from "./MoreSection";

function ProjectSideBar({ rootPath = "" }) {
	const navigate = useNavigate();
	const [projectSidebar, setProjectSidebar] = useState(Object);
	const { projectId } = useParams();

	useEffect(function () {
		invoke("getProjectDetail", { projectId })
			.then(function (res) {
				setProjectSidebar(res);
				localStorage.setItem("project_detail", JSON.stringify(res));
			})
			.catch(function (error) {});
	}, []);

	return (
		<SideNavigation label="project" testId="side-navigation">
			<NavigationHeader>
				<Header
					description={PROJECT_NAME_DESCRIPTOR}
					iconBefore={
						<Avatar
							size="small"
							appearance="square"
							src={""}
							name="Project Avatar"
						/>
					}
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
				</Section>
			</NestableNavigationContent>

			<NavigationFooter>
				<p style={{ textAlign: "center", fontSize: "12px" }}>
					You are in {APP_NAME}
				</p>
			</NavigationFooter>
		</SideNavigation>
	);
}

export default ProjectSideBar;
