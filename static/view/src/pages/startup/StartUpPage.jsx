import Button from "@atlaskit/button";
import EmptyState from "@atlaskit/empty-state";
import { invoke, router, view } from "@forge/bridge";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import Toastify from "../../common/Toastify";
import LockClosedImage from "../../assets/images/LockClosed.png";
import { extractErrorMessage } from "../../common/utils";

function StartUpPage() {
	const [isSubmited, setIsSubmited] = useState(false);
	const [context, setContext] = useState({});
	const mountedRef = useRef(true);

	useEffect(() => {
		view
			.getContext()
			.then((res) => {
				if (mountedRef.current) setContext(res);
			})
			.catch((err) => {
				let errString = extractErrorMessage(err);
				Toastify.error(errString);
			});

		return () => {
			mountedRef.current = false;
		};
	}, []);

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
			imageUrl={LockClosedImage}
			header="WoTaas needs access to your site"
			description={
				<>
					<span>
						Make sure you grant permission to site <b>{context.siteUrl}</b>.
					</span>
					<br />
					<span>
						If you give wrong permission to another site please go to More and
						click grant permission again
					</span>
				</>
			}
			primaryAction={
				<Button
					appearance="primary"
					onClick={handleGrantAuthorized}
					isDisabled={isSubmited}
				>
					Grant access
				</Button>
			}
			isLoading={isSubmited}
		/>
	);
}

export default StartUpPage;
