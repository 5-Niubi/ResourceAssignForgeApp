import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useParams } from "react-router";

import Button, { ButtonGroup } from "@atlaskit/button";
import { workforces } from "../../resources/workforces/table-content/workforces";
import ParameterWorkforceModal, {
	ParameterCreareWorkforceModal,
	ParameterSelectWorkforceModal,
} from "./ParameterWorkforceModal";
import PageHeader from "@atlaskit/page-header";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import EditIcon from "@atlaskit/icon/glyph/edit";
import StarIcon from "@atlaskit/icon/glyph/star";
import InfoIcon from "@atlaskit/icon/glyph/info";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import Select from "@atlaskit/select";
import { Grid, GridColumn } from "@atlaskit/page";
import Form, {
	CheckboxField,
	ErrorMessage,
	Field,
	FormFooter,
	FormHeader,
	HelperMessage,
	RequiredAsterisk,
	ValidMessage,
} from "@atlaskit/form";
import Spinner from "@atlaskit/spinner";
import AddCircle from "@atlaskit/icon/glyph/add-circle";

import DynamicTable from "@atlaskit/dynamic-table";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import { RadioGroup } from "@atlaskit/radio";
import LoadingButton from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import { findObj } from "../pertchart/VisualizeTasks";
import Rating from "react-rating";

function ParameterWorkforceList() {
	const SelectProps = {
		value: 0,
		label: "",
	};

	//GET LIST WORKFORCES
	let { projectId } = useParams();
	const [workforces, setWorkforces] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(function () {
		invoke("getWorkforceParameter", { projectId })
			.then(function (res) {
				let workforces = [];
				for (let workforce of res) {
					let itemWorkforce = {
						id: workforce.id,
						accountId: workforce.accountId,
						email: workforce.email,
						accountType: workforce.accountType,
						name: workforce.name,
						avatar: workforce.avatar,
						displayName: workforce.displayName,
						unitSalary: workforce.unitSalary,
						workingType: workforce.workingType,
						workingEffort: workforce.workingEffort,
						skills: workforce.skills,
					};
					let castWorkforceEffort = itemWorkforce.workingEffort
						.slice(1, -1)
						.split(/[,]/);
					itemWorkforce.workingEffort = castWorkforceEffort;
					workforces.push(itemWorkforce);
				}
				setIsLoading(false);
				localStorage.setItem(
					"workforce_parameter",
					JSON.stringify(workforces)
				);
				setWorkforces(workforces);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	const [selectedWorkforce, setSelectedWorkforce] = useState({
		id: 0,
		accountId: "",
		email: "",
		accountType: "",
		name: "",
		avatar: "",
		displayName: "",
		unitSalary: 0.0,
		workingType: 0,
		workingEffort: [],
		skills: [
			{
				id: 0,
				name: "",
				level: 0,
			},
		],
	});
	const [isWorkforceOpen, setIsWorkforceOpen] = useState(false);
	const openWorkforceModal = useCallback(() => setIsWorkforceOpen(true), []);
	const closeWorkforceModal = useCallback(
		() => setIsWorkforceOpen(false),
		[]
	);
	const [isParttimeSelected, setIsParttimeSelected] = useState(false);
	const options = [
		{ label: "Fulltime", value: 0 },
		{ label: "Part-time", value: 1 },
	];

	const buttonAddSkills = (
		<>
			<Button
				iconBefore={<AddCircle label="" size="medium" />}
				appearance="subtle"
			></Button>
		</>
	);

	const head = {
		cells: [
			{
				key: "skills",
				content: "Skills",
				width: 30,
			},
			{
				key: "level",
				content: "Level",
				width: 60,
			},
			{
				key: "action",
				content: "Actions",
				width: 10,
			},
		],
	};

	const rows = selectedWorkforce.skills?.map((skill, index) => ({
		key: skill.name?.toString(),
		cells: [
			{
				key: skill.name?.toString(),
				content: skill.name?.toString(),
			},
			{
				key: skill.level?.toString(),
				content: (
					<>
						<Rating
							emptySymbol={<StarIcon />}
							fullSymbol={<StarFilledIcon />}
							initialRating={skill.level}
						></Rating>
					</>
				),
			},
			{
				key: "actions",
				content: (
					<>
						<Button
							iconBefore={<EditIcon label="" size="medium" />}
							appearance="subtle"
						></Button>
						<Button
							iconBefore={<TrashIcon label="" size="medium" />}
							appearance="subtle"
						></Button>
					</>
				),
			},
		],
	}));

	const buttonActions = (
		<>
			<ParameterCreareWorkforceModal></ParameterCreareWorkforceModal>
			<ParameterSelectWorkforceModal></ParameterSelectWorkforceModal>
		</>
	);

	const handleOpenWorkforceModal = (value) => {
		var selected = findObj(workforces, value);
		setSelectedWorkforce({
			id: selected.id,
			accountId: selected.accountId,
			email: selected.email,
			accountType: selected.accountType,
			name: selected.name,
			avatar: selected.avatar,
			displayName: selected.displayName,
			unitSalary: selected.unitSalary,
			workingType: selected.workingType,
			workingEffort: selected.workingEffort,
			skills: selected.skills?.map((skill) => ({
				id: skill.id,
				name: skill.name,
				level: skill.level,
			})),
		});
		setIsWorkforceOpen(true);
		selected.workingType == 1? setIsParttimeSelected(true) : setIsParttimeSelected(false);
	};

	const styleTextfield = {
		marginLeft: 10,
		fontWeight: "bold",
	};

	const validateEmail = (value) => {
		//REQUIRES NOT NULL, AND CONTAINS @ SYMBOL
		if (!value) {
			return "NOT_VALID";
		}
		if (!value.includes("@")) {
			return "NOT_VALID";
		}
		return undefined;
	};

	const validateNumberOnly = (value) => {
		//REQUIRES NOT NULL, NUMBER ONLY
		if (!value) {
			return "NOT_VALID";
		}

		if (isNaN(parseFloat(value))) {
			return "NOT_VALID";
		}
		const regex = /^\d*\.?\d*$/;
		if (!regex.test(value)) {
			return "NOT_VALID";
		}
		return undefined;
	};

	const validateName = (value) => {
		//REQUIRES NOT NULL, LETTER ONLY, 6 CHARACTERS AT LEAST
		if (!value) {
			return "NOT_VALID";
		}
		const regex = /^[A-Za-z ]{6,}$/;
		if (!regex.test(value)) {
			return "NOT_VALID";
		}
		return undefined;
	};

	return (
		<div style={{ width: "100wh" }}>
			<div>
				<PageHeader actions={buttonActions}>Workforces</PageHeader>
			</div>
			<div>
				{isLoading ? (
					<Spinner size={"large"} />
				) : (
					<>
						{workforces?.map((workforce, index) => (
							<Button
								style={{
									marginRight: "8px",
									marginBottom: "5px",
								}}
								value={workforce.id}
								onClick={() =>
									handleOpenWorkforceModal(workforce.id)
								}
							>
								{workforce.name}
							</Button>
						))}
					</>
				)}
			</div>
			<div>
				{/* WORKFORCE MODAL  */}
				{isWorkforceOpen && (
					<ModalTransition>
						<Modal
							onClose={closeWorkforceModal}
							shouldScrollInViewport={true}
							width={"large"}
						>
							<ModalHeader>
								<ModalTitle>
									Workforce #{selectedWorkforce.id}
								</ModalTitle>
							</ModalHeader>
							<ModalBody>
								<Form
									onSubmit={(data) => {
										console.log("Form Data", data);
										return new Promise((resolve) =>
											setTimeout(resolve, 2000)
										).then(() =>
											data.username === "error"
												? {
														username: "IN_USE",
												  }
												: undefined
										);
									}}
								>
									{({ formProps, submitting }) => (
										<form {...formProps}>
											<Grid
												layout="fluid"
												spacing="compact"
											>
												<GridColumn medium={12}>
													<Field
														name="email"
														label="Email"
														isRequired
														defaultValue={
															selectedWorkforce.email
														}
														validate={(v) =>
															validateEmail(v)
														}
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<TextField
																	autoComplete="off"
																	{...fieldProps}
																	placeholder="Email only."
																/>
																{error ===
																	"NOT_VALID" && (
																	<ErrorMessage>
																		Invalid
																		email,
																		needs
																		contains
																		@
																		symbol.
																	</ErrorMessage>
																)}
																{error ===
																	"IN_USE" && (
																	<ErrorMessage>
																		Username
																		already
																		taken,
																		try
																		another
																		one
																	</ErrorMessage>
																)}
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={6}>
													<Field
														name="usernamejira"
														label="Username Jira"
														isRequired
														defaultValue={
															selectedWorkforce.displayName
														}
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<TextField
																	autoComplete="off"
																	{...fieldProps}
																	placeholder="You can use letters and numbers."
																/>
																{!error && (
																	<HelperMessage></HelperMessage>
																)}
																{error && (
																	<ErrorMessage>
																		This
																		username
																		is
																		already
																		in use,
																		try
																		another
																		one.
																	</ErrorMessage>
																)}
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={6}>
													<Field
														name="name"
														label="Name"
														isRequired
														defaultValue={
															selectedWorkforce.name
														}
														validate={(v) =>
															validateName(v)
														}
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<TextField
																	autoComplete="off"
																	{...fieldProps}
																	placeholder="Example: John Smith"
																/>
																{error ===
																	"NOT_VALID" && (
																	<ErrorMessage>
																		The name
																		field
																		should
																		only
																		contain
																		letters
																		and must
																		have a
																		minimum
																		length
																		of 6
																		characters.
																	</ErrorMessage>
																)}
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={12}>
													<Field
														name="salary"
														label="Salary (Hour)"
														isRequired
														defaultValue={
															selectedWorkforce.unitSalary
														}
														validate={(value) =>
															validateNumberOnly(
																value
															)
														}
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<TextField
																	autoComplete="off"
																	{...fieldProps}
																	placeholder="Number only"
																	elemBeforeInput={
																		<p
																			style={{
																				marginLeft: 10,
																			}}
																		>
																			$
																		</p>
																	}
																/>
																{error ===
																	"NOT_VALID" && (
																	<ErrorMessage>
																		Wrong
																		input.
																	</ErrorMessage>
																)}
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={3}>
													<Field
														label="Working Type"
														name="workingType"
														isRequired
													>
														{({
															fieldProps: {
																id,
																...rest
															},
														}) => (
															<Fragment>
																<Select
																	inputId={id}
																	{...rest}
																	options={
																		options
																	}
																	placeholder="Choose type..."
																	onChange={(newValue)=>{
                                                                        (newValue.value == 1)?setIsParttimeSelected(true):setIsParttimeSelected(false)
                                                                    }
																	}
                                                                    inputValue={selectedWorkforce.workingType}
																/>
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={9}>
													{/* WOKRING EFFORTS IN WEEEK */}
													{isParttimeSelected && (
														<Field
															name="workingEffort"
															label="Working Effort"
															isRequired
															defaultValue={
																selectedWorkforce.workingEffort
															}
														>
															{({
																fieldProps,
																error,
															}) => (
																<Grid
																	layout="fluid"
																	spacing="compact"
																>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
                                                                            isCompact
																			autoComplete="off"
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[0]
																			}
																			label="Monday"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Mon
																				</p>
																			}
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			style={{
																				flex: 1,
																			}}
																			autoComplete="off"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Tues
																				</p>
																			}
																			width={
																				90
																			}
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[1]
																			}
																			isCompact
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			autoComplete="off"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Wed
																				</p>
																			}
																			width={
																				90
																			}
																			isCompact
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[2]
																			}
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			autoComplete="off"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Thurs
																				</p>
																			}
																			width={
																				90
																			}
																			isCompact
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[3]
																			}
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[4]
																			}
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Fri
																				</p>
																			}
																			width={
																				90
																			}
																			isCompact
																			autoComplete="off"
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			autoComplete="off"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Sat
																				</p>
																			}
																			width={
																				90
																			}
																			isCompact
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[5]
																			}
																		/>
																	</GridColumn>
																	<GridColumn
																		medium={
																			1.25
																		}
																	>
																		<TextField
																			autoComplete="off"
																			elemBeforeInput={
																				<p
																					style={{
																						styleTextfield,
																					}}
																				>
																					Sun
																				</p>
																			}
																			width={
																				90
																			}
																			isCompact
																			defaultValue={
																				selectedWorkforce
																					.workingEffort[6]
																			}
																		/>
																	</GridColumn>
																</Grid>
															)}
														</Field>
													)}
												</GridColumn>

												<GridColumn medium={12}>
													<Field
														name="skills"
														label="Skills"
														isRequired
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<TextField
																	autoComplete="off"
																	elemAfterInput={
																		buttonAddSkills
																	}
																	{...fieldProps}
																	defaultValue={selectedWorkforce.skills?.map(
																		(
																			skill
																		) =>
																			skill.name +
																			"-level " +
																			skill.level
																	)}
																/>
																{!error && (
																	<HelperMessage>
																		<InfoIcon
																			size="small"
																			content=""
																		></InfoIcon>
																		Click
																		add
																		circle
																		button
																		in order
																		to add
																		skills
																		into
																		table
																	</HelperMessage>
																)}
																{error && (
																	<ErrorMessage>
																		Wrong
																		input.
																	</ErrorMessage>
																)}
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={12}>
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
																	options={
																		rows
																	}
																	// value={taskValues}
																	// onChange={
																	// 	handleChangePrecedence
																	// }
																	isMulti
																	isSearchable={
																		true
																	}
																	placeholder="Choose precedence tasks"
																/>
															</Fragment>
														)}
													</Field>
												</GridColumn>
												<GridColumn medium={12}>
													<DynamicTable
														head={head}
														rows={rows}
													/>
												</GridColumn>

												<FormFooter>
													<ButtonGroup>
														<Button appearance="subtle">
															Cancel
														</Button>
														<LoadingButton
															type="submit"
															appearance="primary"
															isLoading={
																submitting
															}
														>
															Create
														</LoadingButton>
													</ButtonGroup>
												</FormFooter>
											</Grid>
										</form>
									)}
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									appearance="subtle"
									onClick={closeWorkforceModal}
									autoFocus
								>
									Cancel
								</Button>
								<Button
									appearance="primary"
									onClick={closeWorkforceModal}
									autoFocus
								>
									Create
								</Button>
							</ModalFooter>
						</Modal>
					</ModalTransition>
				)}
			</div>
		</div>
	);
}

export default ParameterWorkforceList;
