import Tabs, { Tab, TabList, TabPanel } from "@atlaskit/tabs";
import VisualizeTasksPage from "./pertchart/VisualizeTasks";

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
			<TabPanel>One</TabPanel>
			<TabPanel>One</TabPanel>
		</Tabs>
	);
}
