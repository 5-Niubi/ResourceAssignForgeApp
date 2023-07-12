import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPageHeader from "./parameter/ParameterPageHeader";
import ParameterWorkforceList from "./parameter/ParameterWorkforceList";
import ParameterEstimateMessage from "./parameter/ParameterEstimateMessage";
import ParameterObjectInput from "./parameter/ParameterObjectInput";
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
		<Tabs onChange={handleChangeTab} selected={selected} id="default">
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
				<div style={{ width: "100%" }}>
					<ParameterPageHeader name={"Resource Estimation"}></ParameterPageHeader>
					<ParameterEstimateMessage></ParameterEstimateMessage>
                    <ParameterWorkforceList></ParameterWorkforceList>
					<ParameterPageHeader name={"Parameter"}></ParameterPageHeader>
					<ParameterObjectInput></ParameterObjectInput>
				</div>
			</TabPanel>
			<TabPanel>
				<ResultPage handleChangeTab={handleChangeTab} />
			</TabPanel>
		</Tabs>
	);
}
