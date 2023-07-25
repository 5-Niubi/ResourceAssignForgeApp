import Button from "@atlaskit/button";
import { Grid, GridColumn } from "@atlaskit/page";
import { Box } from "@atlaskit/primitives";
import React, { useContext } from "react";
import { AppContext } from "../../../App";
import "../styles.css";
import { formatDateDMY } from "../../../common/utils";
import Spinner from "@atlaskit/spinner";

const columns = 12;
function UserInfoGrid() {
	const appContext = useContext(AppContext);
	let subscription = appContext.subscription;

	return subscription ? (
		<>
			<Grid spacing="compact" columns={columns}>
				<GridColumn medium={10}>
					<Grid spacing="comfortable" columns={columns}>
						<GridColumn medium={columns}>
							<h1 className="" style={{ marginBottom: "1em" }}>
								User Information
							</h1>
						</GridColumn>
					</Grid>
					<hr />
					<Grid spacing="compact" columns={columns}>
						<GridColumn medium={5}>
							<h3 className="user-info-title">Your site</h3>
						</GridColumn>
						<GridColumn medium={7}>
							<p className="user-info-detail">User site</p>
						</GridColumn>

						<GridColumn medium={5}>
							<h3 className="user-info-title">User Token</h3>
						</GridColumn>

						<GridColumn medium={7}>
							<p className="user-info-detail">{subscription.token}</p>
						</GridColumn>
						<GridColumn medium={5}>
							<h3 className="user-info-title">Current Plan</h3>
						</GridColumn>
						<GridColumn medium={7}>
							<p className="user-info-detail">{subscription.plan.name}</p>
						</GridColumn>
						<GridColumn medium={5}>
							<h3 className="user-info-title">Start Date</h3>
						</GridColumn>
						<GridColumn medium={7}>
							<p className="user-info-detail">
								{formatDateDMY(subscription.currentPeriodStart)}
							</p>
						</GridColumn>
						<GridColumn medium={5}>
							<h3 className="user-info-title">End Date</h3>
						</GridColumn>
						<GridColumn medium={7}>
							<p className="user-info-detail">
								{subscription.currentPeriodEnd
									? formatDateDMY(subscription.currentPeriodEnd)
									: "∞ Unlimited"}
							</p>
						</GridColumn>
					</Grid>
				</GridColumn>
			</Grid>
			<Grid spacing="compact" columns={columns}>
				<Button appearance="primary">Change Plan</Button>
			</Grid>
		</>
	) : (
		<Spinner size={"large"} />
	);
}

export default UserInfoGrid;
