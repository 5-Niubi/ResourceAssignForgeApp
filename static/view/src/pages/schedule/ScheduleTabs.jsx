import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";
import ParameterPageHeader from "./parameter/ParameterPageHeader";
import ParameterDynamicTable from "./parameter/ParametarDynamicTable";
import { Panel } from "../resources/ResourceTabs";

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
                </div>
            </TabPanel>
			<TabPanel>One</TabPanel>
		</Tabs>
	);
}
