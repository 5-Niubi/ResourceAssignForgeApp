import { Grid, GridColumn } from "@atlaskit/page";
import React from "react";

const GanttChartStat = ({title, value}) => {
    return (
		<div
			style={{
				width: "100%",
				height: "130px",
				backgroundColor: "#ebebeb",
				borderRadius: "30px",
			}}
		>
			<div
				style={{
					textAlign: "center",
					padding: "10px 0 10px 0",
					fontWeight: "bold",
				}}
			>
				{title}
			</div>
			<div
				style={{
					textAlign: "center",
                    fontSize: "40px",
				}}
			>
				{value}
			</div>
		</div>
	);
};

const GanttChartStats = () => {
	return (
        <Grid layout="fluid" spacing="comfortable" columns={3}>
            <GridColumn medium={1}>
                <GanttChartStat title="Duration" value="100 days" />
            </GridColumn>
            <GridColumn medium={1}>
                <GanttChartStat title="Cost" value="$1000.00" />
            </GridColumn>
            <GridColumn medium={1}>
                <GanttChartStat title="Quality" value="123.45%" />
            </GridColumn>   
        </Grid>
	);
};

export default GanttChartStats;
