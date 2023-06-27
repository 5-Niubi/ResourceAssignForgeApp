import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";
import { invoke, router } from "@forge/bridge";
import React, { useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Toastify from "../../common/Toastify";

function StartUpPage() {
	const [isSubmited, setIsSubmited] = useState(false);

	async function handleAuthenOAuth(authenUrl) {
		await router.open(authenUrl);
	}

	// Check authenticate every time reload page
	const handleGrantAuthorized = useCallback(function () {
		setIsSubmited(true);
		invoke("getAuthenUrl")
			.then(function (res) {
				setIsSubmited(false);
				if (!res.isAuthenticated) {
					handleAuthenOAuth(res.authenUrl);
				}
			})
			.catch(function (error) {});
	}, []);

	return (
		<EmptyState
			header="You don't have access to this application"
			description="Make sure the issue exists in this project. If it does, ask a project admin for permission to see the project's issues."
			primaryAction={
				<Button
					appearance="primary"
					onClick={handleGrantAuthorized}
					isDisabled={isSubmited}
				>
					Request access
				</Button>
			}
			isLoading={isSubmited}
		/>
	);
}

export default StartUpPage;
