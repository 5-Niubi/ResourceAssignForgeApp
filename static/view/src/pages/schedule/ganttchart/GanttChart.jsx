import ForgeUI, { render, Fragment, Text } from "@forge/ui";
import { Chart, Gantt } from "react-google-charts";

const GanttChart = () => {
	const chartData = [
		[
			"Task ID",
			"Task Name",
			"Start Date",
			"End Date",
			"Duration",
			"Percent Complete",
			"Dependencies",
		],
		[
			"1",
			"Task 1",
			new Date(2023, 6, 1),
			new Date(2023, 6, 5),
			null,
			100,
			null,
		],
		[
			"2",
			"Task 2",
			new Date(2023, 6, 6),
			new Date(2023, 6, 10),
			null,
			100,
			null,
		],
		[
			"3",
			"Task 3",
			new Date(2023, 6, 11),
			new Date(2023, 6, 15),
			null,
			50,
			"2",
		],
		[
			"4",
			"Task 4",
			new Date(2023, 6, 16),
			new Date(2023, 6, 20),
			null,
			0,
			"2",
		],
	];

	return (
			<Chart
				chartType="Gantt"
				width="100%"
				height="400px"
				data={chartData}
			/>
	);
};

export default GanttChart;

export const run = render(<GanttChart />);
