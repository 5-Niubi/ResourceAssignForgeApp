import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import WorkforcePageHeader from "../../resources/workforces/WorkforcePageHeader";

/**
 * Using as part of visualize task page. To show dependences of a specific task
 * @returns {import("react").ReactElement}
 */
const TaskDetail = () => {
	const [task, setTask] = useState(null);
	useEffect(function () {
		// invoke("getProjectFromNet").then(function (res) {
		// 	setProject(JSON.stringify(res, null, 2));
		// });
	}, []);

	return (
		<>
			<h2>Task dependences: </h2>
			<div style={{width: "100%"}}>
				<pre>{task ? task : "Select a task to view..."}</pre>
			</div>
		</>
	);
}

export default TaskDetail;
