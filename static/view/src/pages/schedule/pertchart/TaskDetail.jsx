import React, { Fragment, useEffect, useState } from "react";
import Select from "@atlaskit/select";
import Form, { Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";
import { findObj } from "./VisualizeTasks";
import { sampleSkills } from "../data";

/**
 * Using as part of visualize task page. To show dependences of a specific task
 */
const TaskDetail = ({
	tasks,
	selectedTaskIds,
	currentTaskId,
	updateTasks,
}) => {
	var currentTask = findObj(tasks, currentTaskId);
	var selectedTasks = [];
	selectedTaskIds?.forEach((id) => {
		var task = findObj(tasks, id);
		if (task) selectedTasks.push(task);
	});

	const [skills, setSkills] = useState(sampleSkills);

	var taskOpts = [];
	selectedTasks?.forEach((task) =>
		task.id != currentTaskId ? taskOpts.push({ value: task.id, label: task.name }) : ""
	);
	var taskValues = [];
	currentTask?.precedence?.forEach((pre) => {
		let task = findObj(tasks, pre.precedenceId);
		if (task) taskValues.push({ value: task.id, label: task.name });
	});

	var skillOpts = [];
	skills?.forEach((skill) =>
		skillOpts.push({ value: skill.id, label: skill.name })
	);

	const handleChangePrecedence = (values, action) => {
		var ids = [];
		values?.forEach((item) => ids.push({taskId: currentTaskId, precedenceId: item.value}));

		var task = findObj(tasks, currentTaskId);
		if (task) {
			// console.log(ids);
			// console.log(task);
			task.precedence = ids;
			updateTasks(tasks);
		}
	};

	const actionsContent = (
		<ButtonGroup>
			<Button>Save</Button>
		</ButtonGroup>
	);

	return (
		<div style={{ borderTop: "1px solid #e5e5e5" }}>
			<PageHeader actions={actionsContent}>Task details:</PageHeader>
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
															isMulti
															isSearchable={true}
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
