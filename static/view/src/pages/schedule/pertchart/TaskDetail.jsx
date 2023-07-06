import React, { Fragment, useEffect, useState } from "react";
import Select from "@atlaskit/select";
import Form, { Field, FormFooter } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import Button, { ButtonGroup } from "@atlaskit/button";

/**
 * Using as part of visualize task page. To show dependences of a specific task
 */
const TaskDetail = ({
	tasks,
	selectedTasks,
	currentTask,
	updateTasks,
	updateCurrentTask,
}) => {
	var sampleSkills = [
		{
			id: 1,
			name: "Skill 0",
		},
		{
			id: 2,
			name: "Skill 1",
		},
		{
			id: 3,
			name: "Skill 2",
		},
		{
			id: 4,
			name: "Skill 3",
		},
		{
			id: 5,
			name: "Skill 4",
		},
	];

	const [skills, setSkills] = useState(sampleSkills);

	const getTaskById = (arr, id) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].key == id) return arr[i];
		}
		return null;
	};

	var taskOpts = [];
	selectedTasks.forEach((task) =>
		taskOpts.push({ value: task.key, label: task.name })
	);
	var taskValues = [];
	currentTask?.precedence.forEach((pre) => {
		let task = getTaskById(selectedTasks, pre);
		if (task) taskValues.push({ value: task.key, label: task.name });
	});

	var skillOpts = [];
	skills.forEach((skill) =>
		skillOpts.push({ value: skill.id, label: skill.name })
	);

	const handleChangePrecedence = (values, action) => {
		for (let i = 0; i < tasks.length; i++) {
			if (tasks[i].key == currentTask.key) {
				var ids = [];
				values.forEach((item) => ids.push(item.value));
				tasks[i].precedence = ids;
				updateCurrentTask(tasks[i]);
				updateTasks(tasks);
				return;
			}
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
												label="Task key"
												name="key"
												isDisabled
												defaultValue={currentTask.key}
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
											<Field
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
											</Field>
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
