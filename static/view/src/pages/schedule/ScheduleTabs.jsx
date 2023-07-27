import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPage from "./parameter/ParameterPage";
import Badge from '@atlaskit/badge';
import EstimationPage from "./estimation";
import { createContext, useCallback, useEffect, useState } from "react";
import ResultPage from "./resultpage/ResultPage";
import React from "react";
import { invoke } from "@forge/bridge";
import { useParams } from "react-router";
import Toastify from "../../common/Toastify";
import { cache, clearProjectBasedCache, getCache } from "../../common/utils";

const projectInfoContextInit = {};
export const ProjectInfoContext = createContext(projectInfoContextInit);

export default function ScheduleTabs() {
	const {projectId} = useParams();
	const [selected, setSelected] = useState(0);

	var project = getCache("project");
	if (!project) {
		clearProjectBasedCache();
		project = {};
	} else {
		var project = JSON.parse(project);
		if (!project || project.id != projectId) {
			clearProjectBasedCache();
			project = {};
		}
	}
	// const [project, setProject] = useState(projectCache);

	const handleChangeTab = useCallback(
		(index) => setSelected(index),
		[setSelected]
	);

	// useEffect(() => {
	// 	var projectCache = getCache("project");
	// 	if (!projectCache) {
	// 		invoke("getProjectDetail", { projectId })
	// 			.then((res) => {
	// 				if (res){
	// 					setProject(res);
	// 					cache("project", JSON.stringify(res));
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 				Toastify.error(error.message);
	// 			});
	// 	}
	// }, []);
	
	return (
		<ProjectInfoContext.Provider value={project}>
		<Tabs onChange={handleChangeTab} selected={selected} id="default">
			<TabList>
				<Tab>
					<Badge>{1}</Badge> Define tasks dependencies
				</Tab>
				<Tab>
					<Badge>{2}</Badge> Resource suggestion
				</Tab>
				<Tab>
					<Badge>{3}</Badge> Parameters
				</Tab>
				<Tab>
					<Badge>{4}</Badge> Schedule
				</Tab>
			</TabList>
			<TabPanel>
				<VisualizeTasksPage handleChangeTab={handleChangeTab} />
			</TabPanel>
			<TabPanel>
				<EstimationPage handleChangeTab={handleChangeTab} />
			</TabPanel>
			<TabPanel>
                <ParameterPage handleChangeTab={handleChangeTab}/>
            </TabPanel>
			<TabPanel>
				<ResultPage handleChangeTab={handleChangeTab} />
			</TabPanel>
		</Tabs>
		</ProjectInfoContext.Provider>
	);
}
