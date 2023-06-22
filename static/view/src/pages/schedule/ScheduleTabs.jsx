import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPageHeader from "./parameter/ParameterPageHeader";
import ParameterDynamicTable from "./parameter/ParameterDynamicTable";
import ParameterWorkforceList from "./parameter/ParameterWorkforceList";
import ParameterEquipmentList from "./parameter/ParameterEquipmentList";
import ParameterObjectInput from "./parameter/ParameterObjectInput";
import GanttChartPage from "./ganttchart/GanttChartPage";

export default function ScheduleTabs() {
	return (
		<Tabs
			onChange={(index) => console.log("Selected Tab", index + 1)}
			id="default"
		>
			<TabList>
				<Tab>PertChart</Tab>
				<Tab>Parameter</Tab>
				<Tab>Gantt chart</Tab>
			</TabList>
			<TabPanel>
				<VisualizeTasksPage />
			</TabPanel>
			<TabPanel>
                <div style={{width: "100%"}}>
                    <ParameterPageHeader></ParameterPageHeader>
                    <ParameterDynamicTable></ParameterDynamicTable>
                    <ParameterWorkforceList></ParameterWorkforceList>
                    <ParameterEquipmentList></ParameterEquipmentList>
                    <ParameterObjectInput></ParameterObjectInput>
                </div>
            </TabPanel>
			<TabPanel>
				<GanttChartPage/>
			</TabPanel>
		</Tabs>
	);
}
