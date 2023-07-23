import { useCallback, useEffect, useState, Fragment } from "react";
import { css, jsx } from "@emotion/react";
import DynamicTable from "@atlaskit/dynamic-table";
import Button, { ButtonGroup } from "@atlaskit/button";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import StarIcon from "@atlaskit/icon/glyph/star";
import InfoIcon from "@atlaskit/icon/glyph/info";
import { useParams } from "react-router";
import Avatar from "@atlaskit/avatar";
import Select from '@atlaskit/select';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import { invoke } from "@forge/bridge";
import Toastify from "../../../common/Toastify";
import { RadioGroup } from "@atlaskit/radio";
import LoadingButton from "@atlaskit/button";
import { Checkbox } from "@atlaskit/checkbox";
import Lozenge from "@atlaskit/lozenge";
import TextField from "@atlaskit/textfield";
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
import AddCircle from "@atlaskit/icon/glyph/add-circle";
import { COLOR_SKILL_LEVEL } from "../../../common/contants";

const options = [
	{ name: "workingType", value: "0", label: "Fulltime" },
	{ name: "workingType", value: "1", label: "Part-time" },
];

const boldStyles = css({
	fontWeight: "bold",
});

export function ParameterSelectWorkforceModal({ onSelectedWorkforces }) {
	//SELECT WORKFORCE MODAL (SW)
	let { projectId } = useParams();
	let workforce_local = JSON.parse(
		localStorage.getItem("workforce_parameter")
	);
	const [isSWOpen, setIsSWOpen] = useState(false);
	const openSWModal = useCallback(() => setIsSWOpen(true), []);
	const closeSWModal = useCallback(() => setIsSWOpen(false), []);
	const [TableLoadingState, setTableLoadingState] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const [workforces, setWorkforces] = useState([]);

	const [selectedWorkforces, setSelectedWorkforces] = useState([]);
	useEffect(function () {
		invoke("getAllWorkforces")
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
					workforces.push(itemWorkforce);
				}
				setTableLoadingState(false);
				setWorkforces(workforces);

				const localWorkforceIds = workforce_local.map((workforce) =>
					workforce.id.toString()
				);

				setSelectedWorkforces(localWorkforceIds);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	//FILTER WORKFORCE SELECT TABLE
	const [workforcesFilter, setWorkforcesFilter] = useState(workforces);
	const filterWorkforceName = useCallback(function (workforces, query) {
		setWorkforcesFilter(
			workforces.filter((e) =>
				e.name.toLowerCase().includes(query.toLowerCase())
			)
		);
	}, []);

	useEffect(
		function () {
			filterWorkforceName(workforces, searchInput);
		},
		[workforces]
	);

	function handleOnSearchBoxChange(e) {
		setSearchInput(e.target.value);
		if (e.target.value != null) {
			filterWorkforceName(workforces, searchInput);
		}
	}

	function CheckSelectedWorkforce(workforceId) {
		workforce_local.map((workforce, index) => {
			return workforce.id.toString() == workforceId.toString()
				? true
				: false;
		});
		return false;
	}

	function handleCheckboxChange(workforceId) {
		setSelectedWorkforces((prevSelectedWorkforces) => {
			if (prevSelectedWorkforces.includes(workforceId.toString())) {
				return prevSelectedWorkforces.filter(
					(id) => id !== workforceId.toString()
				);
			} else {
				return [...prevSelectedWorkforces, workforceId.toString()];
			}
		});
	}

	const head = {
		cells: [
			{
				key: "no",
				content: "No",
				width: 10,
			},
			{
				key: "name",
				content: "Name",
				width: 35,
			},
			{
				key: "skills",
				content: "Skills",
				width: 55,
			},
		],
	};

	const rows = workforcesFilter?.map((workforce, index) => ({
		key: workforce.id,
		cells: [
			{
				key: "no",
				content: (
					<Checkbox
						size="xlarge"
						isChecked={selectedWorkforces.includes(
							workforce.id.toString()
						)}
						onChange={() => handleCheckboxChange(workforce.id)}
					/>
				),
			},
			{
				key: "name",
				content: workforce.name,
			},
			{
				key: "skills",
				content: (
					<>
						{workforce.skills?.map((skill, i) => (
							<Lozenge
								key={i}
								style={{
									backgroundColor:
										COLOR_SKILL_LEVEL[skill.level - 1]
											.color,
									color: "white",
								}}
							>
								{skill.name}
							</Lozenge>
						))}
					</>
				),
			},
		],
	}));

	function saveSelectedWorkforces() {
		const selectedWorkforcesArray = selectedWorkforces.map(
			(workforceId) => {
				return workforces.find(
					(workforce) => workforce.id.toString() === workforceId
				);
			}
		);

		console.log("selected_workforces", selectedWorkforcesArray);

		localStorage.setItem(
			"selected_workforces",
			JSON.stringify(selectedWorkforcesArray)
		);

		onSelectedWorkforces(selectedWorkforcesArray);
	}

	function handleConfirm() {
		saveSelectedWorkforces();
		closeSWModal();
	}

	function CheckSelectedWorkforce(workforceId) {
		return selectedWorkforces.includes(workforceId.toString());
	}

	//SELECT ALL BUTTON
	const [selectAll, setSelectAll] = useState(false);
	function handleSelectAll() {
		if (selectAll) {
			setSelectedWorkforces([]);
		} else {
			const allWorkforceIds = workforces.map((workforce) =>
				workforce.id.toString()
			);
			setSelectedWorkforces(allWorkforceIds);
		}
		setSelectAll(!selectAll);
	}

	//HANDLE ROW SELECTED
	function handleRowClick(workforceId) {
		setSelectedWorkforces((prevSelectedWorkforces) => {
			if (prevSelectedWorkforces.includes(workforceId.toString())) {
				return prevSelectedWorkforces.filter(
					(id) => id !== workforceId.toString()
				);
			} else {
				return [...prevSelectedWorkforces, workforceId.toString()];
			}
		});
	}

	return (
		<div>
			<Button appearance="primary" onClick={openSWModal}>
				Select
			</Button>
			{/* SELECT WORKFORCE MODAL (SW) */}
			<ModalTransition>
				{isSWOpen && (
					<Modal
						onClose={closeSWModal}
						shouldScrollInViewport={false}
						width={"medium"}
					>
						<ModalHeader>
							<ModalTitle>Select Workforce</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div style={{ display: "flex" }}>
								<div style={{ flex: "0 0 300px" }}>
									<TextField
										isCompact
										placeholder="Search Workforce Name"
										aria-label="Filter"
										onChange={handleOnSearchBoxChange}
										value={searchInput}
									/>
								</div>
								<div
									style={{
										flex: "0 0 300px",
									}}
								>
									<Button
										appearance="primary"
										onClick={() => {
											closeSWModal();
										}}
									>
										Create new
									</Button>
									{/* SELECT ALL BUTTON */}
									<Button
										appearance="primary"
										onClick={handleSelectAll}
									>
										{selectAll
											? "Deselect All"
											: "Select All"}
									</Button>
								</div>
							</div>
							<DynamicTable
								shouldScrollInViewport
								head={head}
								rows={rows}
								isFixedSize
								isLoading={TableLoadingState}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								appearance="subtle"
								onClick={closeSWModal}
								autoFocus
							>
								Cancel
							</Button>
							<Button
								appearance="primary"
								onClick={handleConfirm}
								autoFocus
							>
								Confirm
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}

export function ParameterCreareWorkforceModal() {
	//CREATE WORKFORCE MODAL (CW)
	const [isCWOpen, setIsCWOpen] = useState(false);
	const openCWModal = useCallback(() => setIsCWOpen(true), []);
	const closeCWModal = useCallback(() => setIsCWOpen(false), []);
	const [isParttimeSelected, setIsParttimeSelected] = useState(false);

	const [workforcesJiraAccount, setWorkforcesJiraAccount] = useState([]);

	useEffect(function () {
		invoke("getAllUserJira")
			.then(function (jiraUsersResponse) {
				const jiraUsers = jiraUsersResponse
					.filter((user) => user.accountType === "atlassian")
					.map((user) => ({
						accountId: user.accountId,
						email: user.emailAddress,
						accountType: user.accountType,
						name: user.displayName,
						avatar: user.avatarUrls["48x48"],
						displayName: user.displayName,
					}));
				setWorkforcesJiraAccount(jiraUsers);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	function handleOnSelected(e) {
		if (e.currentTarget.value == "1") {
			setIsParttimeSelected(true);
		} else {
			setIsParttimeSelected(false);
		}
	}

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
				key: "star",
				content: "Star",
				width: 60,
			},
			{
				key: "action",
				content: "Actions",
				width: 10,
			},
		],
	};

	const rows = [
		{ name: "C#", level: "3" },
		{ name: "Java", level: "5" },
		{ name: "Unity", level: "2" },
	].map((skill, index) => ({
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
						<StarFilledIcon></StarFilledIcon>
						<StarFilledIcon></StarFilledIcon>
						<StarFilledIcon></StarFilledIcon>
						<StarFilledIcon></StarFilledIcon>
						<StarIcon></StarIcon>
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
							// onClick={openModal}
						></Button>
						<Button
							iconBefore={<TrashIcon label="" size="medium" />}
							appearance="subtle"
							// onClick={openModal}
						></Button>
					</>
				),
			},
		],
	}));

    function formatOptionLabel(user) {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.avatar} alt={user.label} size="medium" />
            <div style={{ marginLeft: '8px' }}>{user.label}</div>
          </div>
        );
      }

	return (
		<>
			<Button
				onClick={openCWModal}
			>Create new</Button>
			{/* CREATE WORKFORCE MODAL (CW) */}
			<ModalTransition>
				{isCWOpen && (
					<Modal
						onClose={closeCWModal}
						shouldScrollInViewport={true}
						width={"large"}
					>
						<ModalHeader>
							<ModalTitle>Add new workforce</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div>
								<Form
									onSubmit={(data) => {
										console.log("form data", data);
										return new Promise((resolve) =>
											setTimeout(resolve, 2000)
										).then(() =>
											data.username === "error"
												? { username: "IN_USE" }
												: undefined
										);
									}}
								>
									{({ formProps, submitting }) => (
										<form {...formProps}>
											<Field
												name="jiraAccount"
												label="Jira Account"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
													<Fragment>
														<Select
															inputId="single-select-example"
															className="single-select"
															classNamePrefix="react-select"
															options={[workforcesJiraAccount.map((user)=>({
                                                                label: user.displayName,
                                                                value: user.displayName,
                                                                avatar: user.avatar,
                                                            }))]}
                                                            formatOptionLabel={formatOptionLabel}
															placeholder="Choose a Jira account"
														/>
														{!error && (
															<HelperMessage></HelperMessage>
														)}
														{error && (
															<ErrorMessage></ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<Field
												name="email"
												label="Email"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
													<Fragment>
														<TextField
															autoComplete="off"
															{...fieldProps}
															placeholder="Email only."
														/>
														{!error && (
															<HelperMessage></HelperMessage>
														)}
														{error && (
															<ErrorMessage></ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<Field
												name="usernamejira"
												label="Username Jira"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
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
																This username is
																already in use,
																try another one.
															</ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<Field
												name="name"
												label="Name"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
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
																This username is
																already in use,
																try another one.
															</ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<Field
												name="salary"
												label="Salary (Hour)"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
													<Fragment>
														<TextField
															autoComplete="off"
															{...fieldProps}
															placeholder="Number only"
														/>
														{!error && (
															<HelperMessage></HelperMessage>
														)}
														{error && (
															<ErrorMessage>
																Wrong input.
															</ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<Field
												label="Working Type"
												name="workingType"
												defaultValue=""
												isRequired
											>
												{({ fieldProps }) => (
													<RadioGroup
														{...fieldProps}
														options={options}
														onChange={
															handleOnSelected
														}
													/>
												)}
											</Field>
											{/* WOKRING EFFORTS IN WEEEK */}
											{isParttimeSelected && (
												<Field
													name="workingEffort"
													label="Working Effort"
													isRequired
													defaultValue=""
												>
													{({
														fieldProps,
														error,
													}) => (
														<Fragment>
															<TextField
																autoComplete="off"
																defaultValue={
																	0.99
																}
																label="Monday"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Mon
																	</p>
																}
																width={90}
																isCompact
															/>
															<TextField
																style={{
																	flex: 1,
																}}
																autoComplete="off"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Tues
																	</p>
																}
																width={90}
																defaultValue={
																	0.99
																}
																isCompact
															/>
															<TextField
																autoComplete="off"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Wed
																	</p>
																}
																width={90}
																isCompact
																defaultValue={
																	0.99
																}
															/>
															<TextField
																autoComplete="off"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Thurs
																	</p>
																}
																width={90}
																isCompact
																defaultValue={
																	0.99
																}
															/>
															<TextField
																defaultValue={
																	0.99
																}
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Fri
																	</p>
																}
																width={90}
																isCompact
																autoComplete="off"
															/>{" "}
															<TextField
																autoComplete="off"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Sat
																	</p>
																}
																width={90}
																isCompact
																defaultValue={
																	0.99
																}
															/>
															<TextField
																autoComplete="off"
																elemBeforeInput={
																	<p
																		style={{
																			fontWeight:
																				"bold",
																		}}
																	>
																		Sun
																	</p>
																}
																width={90}
																isCompact
																defaultValue={
																	0.99
																}
															/>
														</Fragment>
													)}
												</Field>
											)}
											<Field
												name="skills"
												label="Skills"
												isRequired
												defaultValue=""
											>
												{({ fieldProps, error }) => (
													<Fragment>
														<TextField
															autoComplete="off"
															elemAfterInput={
																buttonAddSkills
															}
															{...fieldProps}
														/>

														{!error && (
															<HelperMessage>
																<InfoIcon
																	size="small"
																	content=""
																></InfoIcon>
																Click add circle
																button in order
																to add skills
																into table
															</HelperMessage>
														)}
														{error && (
															<ErrorMessage>
																Wrong input.
															</ErrorMessage>
														)}
													</Fragment>
												)}
											</Field>
											<DynamicTable
												head={head}
												rows={rows}
											/>
											<FormFooter>
												<ButtonGroup>
													<Button appearance="subtle">
														Cancel
													</Button>
													<LoadingButton
														type="submit"
														appearance="primary"
														isLoading={submitting}
													>
														Create
													</LoadingButton>
												</ButtonGroup>
											</FormFooter>
										</form>
									)}
								</Form>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								appearance="subtle"
								onClick={closeCWModal}
								autoFocus
							>
								Cancel
							</Button>
							<Button
								appearance="primary"
								onClick={closeCWModal}
								autoFocus
							>
								Create
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</>
	);
}
