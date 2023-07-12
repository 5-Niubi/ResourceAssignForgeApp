import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPage from "./parameter/ParameterPage";
import GanttChartPage from "./ganttchart/GanttChartPage";
import Badge from '@atlaskit/badge';
import EstimationPage from "./estimation";
import { useCallback, useState } from "react";
import ResultPage from "./resultpage/ResultPage";

export default function ScheduleTabs() {
	const [selected, setSelected] = useState(0);

	const handleChangeTab = useCallback(
		(index) => setSelected(index),
		[setSelected]
	);
	return (
		<Tabs selected={selected} id="default">
			<TabList>
				<Tab>
					<Badge>{1}</Badge> PertChart
				</Tab>
				<Tab>
					<Badge>{2}</Badge> Estimation
				</Tab>
				<Tab>
					<Badge>{3}</Badge> Parameters
				</Tab>
				<Tab>
					<Badge>{4}</Badge> Gantt chart
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
	);
}
