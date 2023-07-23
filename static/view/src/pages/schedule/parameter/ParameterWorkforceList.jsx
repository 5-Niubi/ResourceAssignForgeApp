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
import Select, { AsyncSelect } from "@atlaskit/select";
import { Grid, GridColumn } from "@atlaskit/page";
import { PiStarFill, PiStarBold } from "react-icons/pi";

import Form, {
	CheckboxField,
	ErrorMessage,
	Field,
	FormFooter,
	FormHeader,
	FormSection,
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
import CreatableAdvanced from "./creatable-selection";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";

function ParameterWorkforceList() {
	//GET LIST WORKFORCES
	let { projectId } = useParams();
	const [workforces, setWorkforces] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [skillDB, setSkillDB] = useState([]);
	const [selectedWorkforce, setSelectedWorkforce] = useState(Object);
	const [skillsTable, setSkillsTable] = useState([]);
	const [isWorkforceOpen, setIsWorkforceOpen] = useState(false);
	const openWorkforceModal = useCallback(() => setIsWorkforceOpen(true), []);
	const closeWorkforceModal = useCallback(
		() => setIsWorkforceOpen(false),
		[]
	);
	const [isParttimeSelected, setIsParttimeSelected] = useState(false);
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
					//PARSE STRING ARRAY WORKING EFFORT TO ARRAY
					let castWorkforceEffort = JSON.parse(
						workforce.workingEffort
					);
					itemWorkforce.workingEffort = castWorkforceEffort;
					workforces.push(itemWorkforce);
				}
				setIsLoading(false);
				localStorage.setItem(
					"workforce_parameter",
					JSON.stringify(workforces)
				);
				setWorkforces(workforces);
				console.log("Cac workforce", workforces);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});

		invoke("getAllSkills", {})
			.then(function (res) {
				setSkillDB(res);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	// const [selectedWorkforcesArray, setSelectedWorkforcesArray] = useState([]);

	const handleSelectedWorkforces = (selectedWorkforcesArray) => {
		setWorkforces(selectedWorkforcesArray);
		console.log("Cac workforce moi", workforces);
	};

	const options = [
		{ label: "Fulltime", value: 0 },
		{ label: "Part-time", value: 1 },
	];

	const onSelectedValue = (childValue) => {
		console.log("Received value from child:", childValue);
		//LOAD DATA TO TABLE

		setSkillsTable(childValue.selectedValue);
		console.log("Received value display in table:", skillsTable);
	};

	const buttonActions = (
		<>
			<ButtonGroup>
				<ParameterCreareWorkforceModal></ParameterCreareWorkforceModal>
				<ParameterSelectWorkforceModal
					onSelectedWorkforces={handleSelectedWorkforces}
				></ParameterSelectWorkforceModal>
			</ButtonGroup>
		</>
	);

	const handleOpenWorkforceModal = (value) => {
		var selected = findObj(workforces, value);
		setSkillsTable(
			selected.skills?.map((skill) => ({
				id: skill.id,
				label: skill.name,
				level: skill.level,
			}))
		);
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
		console.log("workforce da chon: ", selectedWorkforce);
		console.log("selected skill: ", selected.skills);
		setIsWorkforceOpen(true);
		selected.workingType == 1
			? setIsParttimeSelected(true)
			: setIsParttimeSelected(false);
	};

	const styleTextfield = {
		marginLeft: 3,
		fontWeight: "bold",
		size: 12,
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

	const validateNumberWorkingEffort = (value) => {
		//REQUIRES NUMBER ONLY AND NUMBER FROM 0.0 to 1.0 IN ARRAY
		for (let element in value) {
			const numValue = parseFloat(element);
			if (isNaN(numValue)) {
				return "NOT_VALID";
			}

			if (numValue < 0.0 || numValue > 1.0) {
				return "NOT_VALID";
			}
		}
		return undefined;
	};

	const headSkillTable = {
		cells: [
			{
				key: "skills",
				content: "Skills",
				width: 40,
			},
			{
				key: "level",
				content: "Level",
				width: 60,
			},
		],
	};

	const rowsSkillTable = skillsTable
		? skillsTable?.map((skill, index) => ({
				key: skill.name?.toString(),
				cells: [
					{
						key: skill.label?.toString(),
						content: skill.label?.toString(),
					},
					{
						key: skill.level?.toString(),
						content: (
							<>
								<Rating
									emptySymbol={<PiStarBold size={25} />}
									fullSymbol={[
										<PiStarFill
											size={25}
											fill={COLOR_SKILL_LEVEL[0].color}
											border
										/>,
										<PiStarFill
											size={25}
											fill={COLOR_SKILL_LEVEL[1].color}
											border
										/>,
										<PiStarFill
											size={25}
											fill={COLOR_SKILL_LEVEL[2].color}
											border
										/>,
										<PiStarFill
											size={25}
											fill={COLOR_SKILL_LEVEL[3].color}
											border
										/>,
										<PiStarFill
											size={25}
											fill={COLOR_SKILL_LEVEL[4].color}
											border
										/>,
									]}
									initialRating={skill.level}
									onClick={(value) => {
										skill.level = value;
										console.log(
											"skill value: ",
											skill.label +
												", level" +
												skill.level
										);
									}}
								></Rating>
							</>
						),
					},
				],
		  }))
		: null;

	return (
		<div>
			<div>
				<PageHeader actions={buttonActions}>Workforces</PageHeader>
			</div>
			{/* DISPLAY WORKFORCE PARMETER BUTTONS  */}
			<div>
				{isLoading ? (
					<Spinner size={"large"} />
				) : (
					<>
						{workforces?.map((workforce, index) => (
							// BUTTON CLICK TO OPEN WORKFORCE INFORMATION DETAIL
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
			{/* WORKFORCE INFORMATION MODAL */}
			<div>
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
							<Form
								onSubmit={(data) => {
									console.log("Form Data", data);
                                    setIsWorkforceOpen(false);
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
										<ModalBody>
											<Grid
												layout="fluid"
												spacing="compact"
											>
												{/* EMAIL TEXTFIELD */}
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
												{/* USERNAME JIRA TEXTFIELD */}
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
												{/* NAME TEXTFIELD */}
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
												{/* SALARY TEXTFIELD */}
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
												{/* WORKING TYPE SELECT  */}
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
                                                                    onChange={(newValue) => {
                                                                        setIsParttimeSelected(newValue.value === 1 ? true : false);
                                                                    }}
                                                                      value={options.find((option) => option.value === (isParttimeSelected ? 1 : 0))}
																/>
															</Fragment>
														)}
													</Field>
												</GridColumn>
												{/* WORKING EFFORT (FULL-TIME) */}
												<GridColumn medium={9}>
													{isParttimeSelected && (
														<Field
															name="workingEffort"
															label="Working Effort"
															isRequired
															defaultValue={
																selectedWorkforce.workingEffort
															}
															validate={(value) =>
																validateNumberWorkingEffort(
																	value
																)
															}
														>
															{({
																fieldProps,
																error,
															}) => (
																<>
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
																						style={
																							styleTextfield
																						}
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
																						style={
																							styleTextfield
																						}
																					>
																						Tues
																					</p>
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
																						style={
																							styleTextfield
																						}
																					>
																						Wed
																					</p>
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
																						style={
																							styleTextfield
																						}
																					>
																						Thurs
																					</p>
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
																						style={
																							styleTextfield
																						}
																					>
																						Fri
																					</p>
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
																						style={
																							styleTextfield
																						}
																					>
																						Sat
																					</p>
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
																						style={
																							styleTextfield
																						}
																					>
																						Sun
																					</p>
																				}
																				isCompact
																				defaultValue={
																					selectedWorkforce
																						.workingEffort[6]
																				}
																			/>
																		</GridColumn>
																	</Grid>
																	{error ===
																		"NOT_VALID" && (
																		<ErrorMessage>
																			Wrong
																			input.
																		</ErrorMessage>
																	)}
																</>
															)}
														</Field>
													)}
												</GridColumn>
												{/* SKILL CREATABLE MULTIPLE SELECT */}
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
																<CreatableAdvanced
																	isRequired
																	defaultOptions={skillDB.map(
																		(
																			skill
																		) => ({
																			id: skill.id,
																			value: skill.name,
																			label: skill.name,
																			level: skill.level,
																		})
																	)}
																	selectedValue={selectedWorkforce.skills?.map(
																		(
																			skill
																		) => ({
																			id: skill.id,
																			value: skill.name,
																			label: skill.name,
																			level: skill.level,
																		})
																	)}
																	onSelectedValue={
																		onSelectedValue
																	}
																></CreatableAdvanced>
																<HelperMessage>
																	<InfoIcon
																		size="small"
																		content=""
																	></InfoIcon>
																	Change
																	skill's
																	level in
																	table, can
																	not store
																	non-word
																	characters
																</HelperMessage>
															</Fragment>
														)}
													</Field>
												</GridColumn>
												{/* SKILL DISPLAYING WITH LEVEL TABLE */}
												<GridColumn medium={12}>
													<DynamicTable
														head={headSkillTable}
														rows={rowsSkillTable}
													/>
												</GridColumn>
											</Grid>
										</ModalBody>
										<ModalFooter>
                                            <Button appearance="subtle"
                                            onClick={closeWorkforceModal}
                                            autoFocus>
														Cancel
													</Button>
													<LoadingButton
														type="submit"
														appearance="primary"
														isLoading={submitting}
												        autoFocus
													>
														Save
													</LoadingButton>
										</ModalFooter>
									</form>
								)}
							</Form>
						</Modal>
					</ModalTransition>
				)}
			</div>
		</div>
	);
}

export default ParameterWorkforceList;
