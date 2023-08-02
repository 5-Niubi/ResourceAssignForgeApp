import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";
import { invoke, router } from "@forge/bridge";
import React, { useState } from "react";
import { useCallback } from "react";
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
				} else {
					Toastify.info("You already have permission.");
					router.reload();
				}
			})
			.catch(function (error) {
				Toastify.error(error.message);
			});
	}, []);

	return (
		<EmptyState
			header="You don't have access to this application"
			description="Make sure you have right in this app. If it does, ask a project admin for permission to access."
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
