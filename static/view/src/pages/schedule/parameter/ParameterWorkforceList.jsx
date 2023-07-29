import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import Button, { ButtonGroup } from "@atlaskit/button";
import {
	ParameterCreareWorkforceModal,
	ParameterSelectWorkforceModal,
} from "./ParameterWorkforceModal";
import PageHeader from "@atlaskit/page-header";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import InfoIcon from "@atlaskit/icon/glyph/info";
import Select from "@atlaskit/select";
import { Grid, GridColumn } from "@atlaskit/page";
import { PiStarFill, PiStarBold } from "react-icons/pi";
import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import Spinner from "@atlaskit/spinner";
import DynamicTable from "@atlaskit/dynamic-table";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import LoadingButton from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Rating from "react-rating";
import CreatableAdvanced from "./creatable-selection";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";
import { validateEmail, validateNumberOnly, validateWorkingEffort, validateName } from "../../../common/utils";
function ParameterWorkforceList() {
	let { projectId } = useParams();
	const [workforces, setWorkforces] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [skillDB, setSkillDB] = useState([]);
	const [selectedWorkforce, setSelectedWorkforce] = useState(Object);
	const [skillsTable, setSkillsTable] = useState([]);
	const [isWorkforceOpen, setIsWorkforceOpen] = useState(false);
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [loadingDetail, setLoadingDetail] = useState(false);
	const [loadingDetailId, setLoadingDetailId] = useState();
	const [isParttimeSelected, setIsParttimeSelected] = useState(false);
	const closeWorkforceModal = useCallback(
		() => setIsWorkforceOpen(false),
		[]
	);
	const handleSelectedWorkforces = (selectedWorkforcesArray) => {
		setWorkforces(selectedWorkforcesArray);
	};

	useEffect(function () {
		invoke("getWorkforceParameter", { projectId })
			.then(function (res) {
				let workforces = [];
				for (let workforce of res) {
					let itemWorkforce = {
						id: workforce.id,
						name: workforce.name,
					};
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
                localStorage.setItem(
					"all_skills_DB",
					JSON.stringify(res)
				);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	const options = [
		{ label: "Fulltime", value: 0 },
		{ label: "Part-time", value: 1 },
	];

	const onSelectedValue = (childValue) => {
		console.log("Received value from child:", childValue);

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

	const handleOpenWorkforceModal = (id) => {
		//SET BUTTON LOADING
		setLoadingDetail(true);
		setLoadingDetailId(id);
		setIsWorkforceOpen(true);

		invoke("getWorkforceById", { id })
			.then(function (res) {
				if (res) {
					var selected = res;
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
						workingEfforts: selected.workingEfforts,
						skills: selected.skills?.map((skill) => ({
							id: skill.id,
							name: skill.name,
							level: skill.level,
						})),
					});
					selected.workingType == 1
						? setIsParttimeSelected(true)
						: setIsParttimeSelected(false);

					//CLOSE BUTTON LOADING
					setLoadingDetail(false);
					setIsWorkforceOpen(true);
				}
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	};

	function updateWorkforce(workforce_request) {
		setLoadingSubmit(true);
		invoke("updateWorkforce", { workforce_request })
			.then(function (res) {
				if (res) {
					console.log("updated workforce", res);
					let workforce_name_display = res.name;
					Toastify.success(
						"Workforce '" + workforce_name_display + "' is saved"
					);
					setLoadingSubmit(false);
					setIsWorkforceOpen(false);
				}
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
				setLoadingSubmit(false);
			});
	}

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
									initialRating={
										skill.level === null ? 1 : skill.level
									}
									onClick={(value) => {
										skill.level =
											value === null ? 1 : value;
									}}
								></Rating>
							</>
						),
					},
				],
		  }))
		: null;

	const [displayedWorkforces, setDisplayedWorkforces] = useState(10);
	const [showAllWorkforces, setShowAllWorkforces] = useState(false);

	const handleShowMore = () => {
		if (showAllWorkforces) {
			// SHOW ONLY 10 WORKFORCE WHEN CLICK ON "SHOW LESS" BUTTON
			setDisplayedWorkforces(10);
			setShowAllWorkforces(false);
		} else {
			// DISPLAY ALL WORKFORCE WHEN CLICK ON "SHOW ALL" BUTTON
			setDisplayedWorkforces(workforces.length);
			setShowAllWorkforces(true);
		}
	};

	return (
		<div>
			<div>
				<PageHeader actions={buttonActions}>Employees</PageHeader>
			</div>
			{/* DISPLAY WORKFORCE PARMETER BUTTONS  */}
			<div>
				{isLoading ? (
					<Spinner size={"large"} />
				) : (
					<>
						<h5>Total number: {workforces.length}</h5>
						{workforces
							.slice(0, displayedWorkforces)
							.map((workforce, index) =>
								// BUTTON CLICK TO OPEN WORKFORCE INFORMATION DETAIL
								loadingDetail &&
								loadingDetailId === workforce.id ? (
									<LoadingButton
										style={{
											marginTop: "5px",
											marginRight: "8px",
										}}
										appearance="primary"
										isLoading
									>
										Loading...
									</LoadingButton>
								) : (
									<LoadingButton
										style={{
											marginTop: "5px",
											marginRight: "8px",
										}}
										value={workforce.id}
										onClick={() =>
											handleOpenWorkforceModal(
												workforce.id
											)
										}
									>
										{workforce.name}
									</LoadingButton>
								)
							)}
						{/* BUTTON CLICK TO SHOW ALL/SHOW LESS WORKFORCE */}
						{workforces.length > 10 && (
							<Button
								appearance="primary"
								onClick={handleShowMore}
								disabled={isLoading}
							>
								{showAllWorkforces ? "Show Less" : "Show More"}
							</Button>
						)}
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
								{loadingDetail ? (
									<Spinner size={"medium"}></Spinner>
								) : (
									""
								)}
							</ModalHeader>
							<Form
								onSubmit={(data) => {
									setLoadingSubmit(true);
									let workforce_request = {
										id: selectedWorkforce.id,
										accountId: selectedWorkforce.accountId,
										email: data.email,
										accountType:
											selectedWorkforce.accountType,
										name: data.name,
										avatar: selectedWorkforce.avatar,
										displayName: data.usernamejira,
										unitSalary: data.salary,
										workingType:
											isParttimeSelected === true ? 1 : 0,
										workingEfforts:
											isParttimeSelected === true
												? [
														data.mon,
														data.tues,
														data.wed,
														data.thurs,
														data.fri,
														data.sat,
														data.sun,
												  ].map((value) =>
														parseFloat(value)
												  )
												: null,
										Skills: skillsTable
											.filter((s) => s.id != null)
											.map((skill) => ({
												skillId: skill.id,
												level: parseInt(
													skill.level === null
														? 1
														: skill.level
												),
											})),
										newSkills: skillsTable
											.filter((s) => s.id == null)
											.map((skill) => ({
												name: skill.value,
												level: parseInt(
													skill.level === null
														? 1
														: skill.level
												),
											})),
									};

									console.log("Form data", workforce_request);
									updateWorkforce(workforce_request);
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
														isDisabled={
															loadingDetail
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
														isDisabled={
															loadingDetail
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
														isDisabled={
															loadingDetail
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
														isDisabled={
															loadingDetail
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
														isDisabled={
															loadingDetail
														}
													>
														{({
															fieldProps,
															error,
														}) => (
															<Fragment>
																<Select
																	{...fieldProps}
																	options={
																		options
																	}
																	placeholder="Choose type..."
																	onChange={(
																		newValue
																	) => {
																		setIsParttimeSelected(
																			newValue.value ===
																				1
																				? true
																				: false
																		);
																	}}
																	value={options.find(
																		(
																			option
																		) =>
																			option.value ===
																			(isParttimeSelected
																				? 1
																				: 0)
																	)}
																/>
															</Fragment>
														)}
													</Field>
													{isParttimeSelected && (
														<HelperMessage>
															<InfoIcon
																size="small"
																content=""
															></InfoIcon>
															Working hours
															per day
														</HelperMessage>
													)}
												</GridColumn>
												{/* WORKING EFFORT (PART-TIME) */}
												<GridColumn medium={9}>
													{isParttimeSelected && (
														<>
															{/* MONDAY*/}
															<Field
																name="mon"
																label="Monday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[0]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* TUESDAY */}
															<Field
																name="tues"
																label="Tuesday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[1]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* WEDNESDAY */}
															<Field
																name="wed"
																label="Wednesday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[2]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* THURSDAY */}
															<Field
																name="thurs"
																label="Thursday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[3]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* FRIDAY */}
															<Field
																name="fri"
																label="Friday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[4]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* SATURDAY */}
															<Field
																name="sat"
																label="Saturday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[5]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
															{/* SUNDAY */}
															<Field
																name="sun"
																label="Sunday"
																isRequired
																defaultValue={
																	selectedWorkforce
																		.workingEfforts[6]
																}
																validate={(
																	value
																) =>
																	validateWorkingEffort(
																		value
																	)
																}
																isDisabled={
																	loadingDetail
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
																		/>
																		{error ===
																			"NOT_VALID" && (
																			<ErrorMessage>
																				Wrong
																				input.
																			</ErrorMessage>
																		)}
																		{error ===
																			"OUT_SCOPE" && (
																			<ErrorMessage>
																				Value
																				raging
																				from
																				0.0
																				to
																				8.0
																			</ErrorMessage>
																		)}
																	</Fragment>
																)}
															</Field>
														</>
													)}
												</GridColumn>
												{!loadingDetail && (
													<>
														{/* SKILL CREATABLE MULTIPLE SELECT */}
														<GridColumn medium={12}>
															<Field
																name="skills"
																label="Skills"
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
																			level
																			in
																			table,
																			can
																			not
																			store
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
																head={
																	headSkillTable
																}
																rows={
																	rowsSkillTable
																}
															/>
														</GridColumn>
													</>
												)}
											</Grid>
										</ModalBody>
										<ModalFooter>
											<Button
												appearance="subtle"
												onClick={closeWorkforceModal}
												autoFocus
											>
												Cancel
											</Button>
											{loadingSubmit ? (
												<LoadingButton
													appearance="primary"
													isLoading
												>
													Saving...
												</LoadingButton>
											) : (
												<LoadingButton
													type="submit"
													appearance="primary"
													autoFocus
												>
													Save
												</LoadingButton>
											)}
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
