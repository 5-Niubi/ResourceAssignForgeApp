import { events, invoke, router, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
import Button from "@atlaskit/button";
import { useNavigate } from "react-router";
import TableTree from "../components/TableTree";
import TextArea from "../components/TextArea";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function HomePage() {
	let navigate = useNavigate();

	return (
		<>
			<h3>Three type of link</h3>
			<div>
				<Link to="/projects">Get Project From Jira Throught .Net</Link>
			</div>
			<div>
				<Button appearance="link" onClick={() => navigate("/projects")}>
					Link to Get Project (Same to URL above)
				</Button>
			</div>
			<div>
				<Button onClick={() => navigate("/projects")}>
					Link to Get Project (Same to URL above)
				</Button>
			</div>
		</>
	);
}

export default HomePage;
