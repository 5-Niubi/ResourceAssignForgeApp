import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPageHeader from "./parameter/ParameterPageHeader";
import ParameterDynamicTable from "./parameter/ParameterDynamicTable";
import ParameterWorkforceList from "./parameter/ParameterWorkforceList";
import ParameterObjectInput from "./parameter/ParameterObjectInput";
import GanttChartPage from "./ganttchart/GanttChartPage";
import Badge from '@atlaskit/badge';
import EstimationPage from "./estimation";

export default function ScheduleTabs() {
	return (
		<Tabs
			onChange={(index) => console.log("Selected Tab", index + 1)}
			id="default"
		>
			<TabList>
				<Tab><Badge>{1}</Badge> PertChart</Tab>
				<Tab><Badge>{2}</Badge> Estimation</Tab>
				<Tab><Badge>{3}</Badge> Parameters</Tab>
				<Tab><Badge>{4}</Badge> Gantt chart</Tab>
			</TabList>
			<TabPanel>
				<VisualizeTasksPage/>
			</TabPanel>
            <TabPanel>
				<EstimationPage />
			</TabPanel>
			<TabPanel>
                <div style={{width: "100%"}}>
                    <ParameterPageHeader></ParameterPageHeader>
                    <ParameterDynamicTable></ParameterDynamicTable>
                    <ParameterWorkforceList></ParameterWorkforceList>
                    <ParameterObjectInput></ParameterObjectInput>
                </div>
            </TabPanel>
			<TabPanel>
				<GanttChartPage/>
			</TabPanel>
		</Tabs>
	);
}
