import Button, { ButtonGroup, LoadingButton } from "@atlaskit/button";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
	useModal,
} from "@atlaskit/modal-dialog";
import Select, { CreatableSelect } from "@atlaskit/select";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState, useCallback, useEffect } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormSection } from "@atlaskit/form";
import { invoke } from "@forge/bridge";
import { cache, findObj } from "../../../../common/utils";
import Toastify from "../../../../common/Toastify";

function CreateTaskModal({
	isOpen,
	setIsOpen,
	projectId,
	milestones,
	tasks,
	skills,
	updateTasks,
	updateCurrentTaskId,
	updateSkills,
	updateMilestones
}) {
	const [taskName, setTaskName] = useState("");
	const [duration, setDuration] = useState(0);
	const [milestone, setMilestone] = useState(null);
	const [reqSkills, setReqSkills] = useState([]);
	const [precedences, setPrecedences] = useState([]);

	const [ms, setMilestones] = useState(milestones);
	const [skillsPage, setSkillsPage] = useState(skills);
	const [isSubmitting, setIsSubmitting] = useState(false);

	var milestoneOpts = [];
	ms?.forEach((milestone) => {
		milestoneOpts.push({
			value: milestone.id,
			label: milestone.name,
		});
	});

	var taskOpts = [];
	var taskValues = [];
	tasks?.forEach((task) =>
		taskOpts.push({ value: task.id, label: task.name })
	);
	precedences?.forEach((pre) => {
		let preTask = findObj(tasks, pre.precedenceId);
		if (preTask)
			taskValues.push({ value: preTask.id, label: preTask.name });
	});

	var skillOpts = [];
	var skillValues = [];
	skillsPage?.forEach((skill) => {
		for (let i = 1; i <= 5; i++) {
			skillOpts.push({
				value: skill.id + "-" + i,
				label: skill.name + " - level " + i,
			});
		}
	});
	reqSkills?.forEach((s) => {
		var skill = findObj(skillsPage, s.skillId);
		if (skill) {
			skillValues.push({
				value: skill.id + "-" + s.level,
				label: skill.name + " - level " + s.level,
			});
		}
	});

	const updateTaskName = useCallback(function (e) {
		setTaskName(e.target.value);
	}, []);

	const updateDuration = useCallback(function (e) {
		if (parseInt(e.target.value) !== NaN) {
			setDuration(e.target.value);
		} else setDuration(0);
	}, []);

	const updateMilestone = useCallback(function (objValue) {
		if (!objValue){
			setMilestone(null);
		} else {
			var milestone = findObj(ms, objValue.value);
			if (milestone) {
				setMilestone({
					value: milestone.id,
					label: milestone.name,
				});
			}
		}
	}, []);

	const updateReqSkills = useCallback(function (values) {
		var skills = [];
		values?.forEach((item) => {
			var items = item.value.split("-");
			if (items.length != 2) return;

			//check duplicate skill; update leve if needed
			let existed = false;
			skills?.forEach((s) => {
				if (s.skillId == items[0]){
					s.level = items[1];
					existed = true;
				}
			});
			if (!existed){
				skills.push({ skillId: items[0], level: items[1] });
			}
		});
		setReqSkills(skills);
	}, []);

	const updatePrecedences = useCallback(function (values) {
		var pres = [];
		values?.forEach((item) => pres.push({ precedenceId: item.value }));
		setPrecedences(pres);
	}, []);

	const handleCreateMilestone = (inputValue) => {
		let reqMilestone = {
			Name: inputValue,
			ProjectId: projectId,
		};
		setIsSubmitting(true);
		invoke("createMilestone", { milestoneObjRequest: reqMilestone })
			.then(function (res) {
				setIsSubmitting(false);
				if (res.id) {
					setMilestones([...ms, res]);
					setMilestone({
						value: res.id,
						label: res.name,
					});
					cache("milestones", JSON.stringify([...ms, res]));
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	};

	const handleCreateSkill = (inputValue) => {
		setIsSubmitting(true);
		invoke("createSkill", { skillReq: { name: inputValue } })
			.then(function (res) {
				setIsSubmitting(false);
				if (res.id) {
					setSkillsPage([...skillsPage, res]);
					
					setReqSkills([
						...reqSkills,
						{ skillId: res.id, level: 1 },
					]);

					cache("skills", JSON.stringify([...skillsPage, res]));
				}
			})
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	};

	useEffect(function () {
		setIsSubmitting(false);
	}, []);

	const closeModal = useCallback(
		function () {
			setIsOpen(false);
		},
		[setIsOpen]
	);

	function handleSubmitCreate() {
		setIsSubmitting(true);
		let taskObjRequest = {
			projectId,
			name: taskName,
			duration,
			milestoneId: milestone?.value,
			skillRequireds: reqSkills,
			precedences,
		};
		invoke("createNewTask", { taskObjRequest })
			.then(function (res) {
				setIsSubmitting(false);
				if (res.id) {
					tasks.push(res);
					updateTasks(tasks);
					updateCurrentTaskId(res.id);
					updateSkills(skillsPage);
					updateMilestones(ms);
					Toastify.success("Created task successfully");
				}
				closeModal();
			})
			.catch((error) => {
				setIsSubmitting(false);
				console.log(error);
				Toastify.error(error.toString());
			});
	}

	return (
		<ModalTransition>
			{isOpen && (
				<Modal onClose={closeModal} width={600}>
					<Form
						onSubmit={(formState) =>
							console.log("form submitted", formState)
						}
					>
						{({ formProps }) => (
							<form id="form-with-id" {...formProps}>
								<ModalHeader>
									<ModalTitle>Create new Task</ModalTitle>
								</ModalHeader>
								<ModalBody>
									<FormSection>
										<Field
											aria-required={true}
											name="taskName"
											label="Task Name"
											isRequired
										>
											{() => (
												<TextField
													autoComplete="off"
													value={taskName}
													onChange={updateTaskName}
												/>
											)}
										</Field>

										<Field
											name="duration"
											label="Duration"
											isRequired
										>
											{() => (
												<TextField
													autoComplete="off"
													value={duration}
													onChange={updateDuration}
													elemAfterInput={
														<span
															style={{
																paddingRight:
																	"10px",
															}}
														>
															DAYS
														</span>
													}
												/>
											)}
										</Field>
										<Field
											label="Group"
											name="milestone"
											defaultValue=""
											isRequired
										>
											{({ fieldProps }) => (
												<Fragment>
													<CreatableSelect
														{...fieldProps}
														inputId="select-milestone"
														className="select-milestone"
														isClearable
														options={milestoneOpts}
														value={milestone}
														onChange={
															updateMilestone
														}
														onCreateOption={
															handleCreateMilestone
														}
														isSearchable={true}
														placeholder="Choose group"
														menuPosition="fixed"
													/>
												</Fragment>
											)}
										</Field>
										<Field
											label="Required skills"
											name="skills"
											defaultValue=""
										>
											{({ fieldProps }) => (
												<Fragment>
													<CreatableSelect
														{...fieldProps}
														inputId="select-skills"
														className="select-skills"
														isClearable
														options={skillOpts}
														value={skillValues}
														onChange={
															updateReqSkills
														}
														onCreateOption={
															handleCreateSkill
														}
														isMulti
														isSearchable={true}
														placeholder="Choose skills"
														menuPosition="fixed"
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
															updatePrecedences
														}
														isMulti
														isSearchable={true}
														placeholder="Choose precedence tasks"
														menuPosition="fixed"
													/>
												</Fragment>
											)}
										</Field>
									</FormSection>
								</ModalBody>

								<ModalFooter>
									<ButtonGroup>
										<Button
											appearance="default"
											onClick={closeModal}
										>
											Cancel
										</Button>
										{isSubmitting ? (
											<LoadingButton
												appearance="primary"
												isLoading
											>
												Saving...
											</LoadingButton>
										) : (
											<Button
												type="submit"
												appearance="primary"
												onClick={handleSubmitCreate}
											>
												Create
											</Button>
										)}
									</ButtonGroup>
								</ModalFooter>
							</form>
						)}
					</Form>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default CreateTaskModal;
