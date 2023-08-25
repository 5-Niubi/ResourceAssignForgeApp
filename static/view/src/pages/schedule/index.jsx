import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ScheduleTabs from "./ScheduleTabs";
import Spinner from "@atlaskit/spinner";
import { invoke } from "@forge/bridge";
import { cache, clearAllCache, getCache } from "../../common/utils";
import Toastify from "../../common/Toastify";
import EmptyState from "@atlaskit/empty-state";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function SchedulePage() {
	let navigate = useNavigate();
	let { projectId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(function () {
		invoke("getProjectDetail", { projectId })
			.then(function (res) {
				setIsLoading(false);
				if (res.id) {
					cache("project", JSON.stringify(res));
				}
			})
			.catch(function (error) {
				setIsLoading(false);
				setError(true);
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<Spinner size="large" />
			) : error ? (
				<ScheduleTabs />
			) : (
				<EmptyState
					header="Can not found this project"
					description="Make sure the projects exists. If it not, please create a new one."
				/>
			)}
		</>
	);
}

export default SchedulePage;
