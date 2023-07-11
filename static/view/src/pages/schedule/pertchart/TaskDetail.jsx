import React, { Fragment, useEffect, useState } from "react";
import Select from "@atlaskit/select";
import Form, { Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";
import { findObj } from "./VisualizeTasks";
import { sampleSkills } from "../data";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";

/**
 * Using as part of visualize task page. To show dependences of a specific task
 */
const TaskDetail = ({
	tasks,
	skills,
	selectedTaskIds,
	currentTaskId,
	updateTasks,
}) => {
	var currentTask = findObj(tasks, currentTaskId);
	var selectedTasks = [];
	// selectedTaskIds?.forEach((id) => {
	// 	var task = findObj(tasks, id);
	// 	if (task) selectedTasks.push(task);
	// });

	//add all task to selected
	selectedTasks = JSON.parse(JSON.stringify(tasks));

	//add dummy tasks to the task list
	selectedTasks.unshift({
		id: -1,
		name: "Start",
		duration: 0,
		milestoneId: 0,
		precedences: [],
		skillRequireds: [],
	});
	selectedTasks.push({
		id: -2,
		name: "Finish",
		duration: 0,
		milestoneId: 0,
		precedences: [],
		skillRequireds: [],
	});

	// const [skills, setSkills] = useState([]);
	// useEffect(function () {
	// 	invoke("getAllSkills", {})
	// 		.then(function (res) {
	// 			if (Object.keys(res).length !== 0) {
	// 				setSkills(res);
	// 			} else setSkills([]);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 			Toastify.error(error);
	// 		});
	// 	return setSkills([]);
	// }, []);

	var taskOpts = [];
	var taskValues = [];
	selectedTasks?.forEach((task) =>
		task.id != currentTaskId
			? taskOpts.push({ value: task.id, label: task.name })
			: ""
	);
	currentTask?.precedences?.forEach((pre) => {
		let preTask = findObj(tasks, pre.precedenceId);
		if (preTask)
			taskValues.push({ value: preTask.id, label: preTask.name });
	});

	var skillOpts = [];
	var skillValues = [];
	skills?.forEach((skill) => {
		for (let i = 1; i <= 5; i++) {
			skillOpts.push({
				value: skill.id + "-" + i,
				label: skill.name + " - level " + i,
			});
		}
	});
	currentTask?.skillRequireds?.forEach((s) => {
		var skill = findObj(skills, s.skillId);
		if (skill) {
			skillValues.push({
				value: skill.id + "-" + s.level,
				label: skill.name + " - level " + s.level,
			});
		}
	});

	const handleChangePrecedence = (values) => {
		var ids = [];
		values?.forEach((item) =>
			ids.push({ taskId: currentTaskId, precedenceId: item.value })
		);

		// var task = findObj(tasks, currentTaskId);
		// if (task) {
		// 	// console.log(ids);
		// 	// console.log(task);
		// }
		for(let i = 0; i < tasks.length; i++) {
			if (tasks[i].id == currentTaskId) {
				tasks[i].precedences = ids;
				break;
			}
		}
		// tasks.every((task) => {
		// });
		// currentTask.precedence = ids;
		updateTasks(tasks);
	};

	const handleChangeSkill = (values) => {
		var skills = [];
		values?.forEach((item) => {
			var items = item.value.split("-");
			if (items.length != 2) return;
			skills.push({ skillId: items[0], level: items[1] });
		});

		// var task = findObj(tasks, currentTaskId);
		// if (currentTask) {
		// 	// console.log(ids);
		// 	// console.log(task);
		// }
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].id == currentTaskId) {
				tasks[i].skillRequireds = skills;
				break;
			}
		}
		// currentTask.precedence = ids;
		updateTasks(tasks);
	};

	return (
		<div style={{ borderTop: "1px solid #e5e5e5" }}>
			{/* <PageHeader actions={actionsContent}>Task details:</PageHeader> */}
			<PageHeader>Task details:</PageHeader>
			<div style={{ width: "100%" }}>
				<pre>
					{currentTask ? (
						<Form
							onSubmit={(formData) =>
								console.log("form data", formData)
							}
						>
							{({ formProps }) => (
								<form {...formProps} name="form">
									<div
										style={{
											display: "flex",
											justifyContent: "space-between ",
										}}
									>
										<div style={{ width: "30%" }}>
											<Field
												label="Task id"
												name="id"
												isDisabled
												defaultValue={currentTask.id}
											>
												{({ fieldProps }) => (
													<Fragment>
														<Textfield
															{...fieldProps}
														/>
													</Fragment>
												)}
											</Field>
											<Field
												label="Task name"
												name="name"
												defaultValue={currentTask.name}
											>
												{({ fieldProps }) => (
													<Fragment>
														<Textfield
															{...fieldProps}
														/>
													</Fragment>
												)}
											</Field>
											<Field
												label="Duration"
												name="duration"
												defaultValue={
													currentTask.duration
												}
											>
												{({ fieldProps }) => (
													<Fragment>
														<Textfield
															{...fieldProps}
														/>
													</Fragment>
												)}
											</Field>
										</div>

										<div style={{ width: "60%" }}>
											<Field
												label="Required skills"
												name="skills"
												defaultValue=""
											>
												{({ fieldProps }) => (
													<Fragment>
														<Select
															{...fieldProps}
															inputId="multi-select-example"
															className="multi-select"
															classNamePrefix="react-select"
															options={skillOpts}
															value={skillValues}
															isMulti
															isSearchable={true}
															onChange={
																handleChangeSkill
															}
															placeholder="Choose skills"
														/>
													</Fragment>
												)}
											</Field>
											{/* <Field
												label="Required equipments"
												name="equipments"
												defaultValue=""
											>
												{({ fieldProps }) => (
													<Fragment>
														<Select
															{...fieldProps}
															inputId="multi-select-example"
															className="multi-select"
															classNamePrefix="react-select"
															options={skillOpts}
															isMulti
															isSearchable={false}
															placeholder="Choose equipments"
														/>
													</Fragment>
												)}
											</Field> */}
											<Field
												label="Precedence tasks"
												name="precedences"
												defaultValue=""
											>
												{({ fieldProps }) => (
													<Fragment>
														<Select
															{...fieldProps}
															inputId="multi-select-example"
															className="multi-select"
															classNamePrefix="react-select"
															options={taskOpts}
															value={taskValues}
															onChange={
																handleChangePrecedence
															}
															isMulti
															isSearchable={true}
															placeholder="Choose precedence tasks"
														/>
													</Fragment>
												)}
											</Field>
											{/* <Field
												label="Milestone"
												name="milestone"
												defaultValue=""
											>
												{({ fieldProps }) => (
													<Fragment>
														<Select
															{...fieldProps}
															inputId="select-milestone"
															className="select-milestone"
															options={taskOpts}
															value={taskValues}
															// onChange={
															// 	handleChangeMilestone
															// }
															isSearchable={true}
															placeholder="Choose milestone"
														/>
													</Fragment>
												)}
											</Field> */}
										</div>
									</div>
								</form>
							)}
						</Form>
					) : (
						"Select a task to view..."
					)}
				</pre>
			</div>
		</div>
	);
};

export default TaskDetail;
