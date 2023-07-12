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

const options = [
	{ name: "workingType", value: "0", label: "Fulltime" },
	{ name: "workingType", value: "1", label: "Part-time" },
];

const boldStyles = css({
	fontWeight: "bold",
});



export default function ParameterWorkforceModal() {
	//CREATE WORKFORCE MODAL (CW)
	const [isCWOpen, setIsCWOpen] = useState(false);
	const openCWModal = useCallback(() => setIsCWOpen(true), []);
	const closeCWModal = useCallback(() => setIsCWOpen(false), []);

	//SELECT WORKFORCE MODAL (SW)
	const [isSWOpen, setIsSWOpen] = useState(false);
	const openSWModal = useCallback(() => setIsSWOpen(true), []);
	const closeSWModal = useCallback(() => setIsSWOpen(false), []);

	return (
		<div>
			<Button
				iconBefore={<AddCircleIcon label="" size="large" />}
				appearance="subtle"
				onClick={openCWModal}
			></Button>
			<Button appearance="primary" onClick={openSWModal}>
				Select
			</Button>

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
							<ParameterCreareWorkforceModal></ParameterCreareWorkforceModal>
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

			{/* SELECT WORKFORCE MODAL (SW) */}
			<ModalTransition>
				{isSWOpen && (
					<Modal
						onClose={closeSWModal}
						shouldScrollInViewport={true}
						width={"medium"}
					>
						<ModalHeader>
							<ModalTitle>Select Workforce</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<ParameterSelectWorkforcesTable></ParameterSelectWorkforcesTable>
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
								onClick={closeSWModal}
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
	const [isParttimeSelected, setIsParttimeSelected] = useState(false);

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
        { name: "C#", level: "3"},
        { name: "Java", level: "5"},
        { name: "Unity", level: "2"},
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

	return (
		<>
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
										{error && <ErrorMessage></ErrorMessage>}
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
												This username is already in use,
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
												This username is already in use,
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
										onChange={handleOnSelected}
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
									{({ fieldProps, error }) => (
										<Fragment>
											<TextField
												autoComplete="off"
												defaultValue={0.99}
												label="Monday"
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
														}}
													>
														Mon
													</p>
												}
												width={90}
												isCompact
											/>
											<TextField
												style={{ flex: 1 }}
												autoComplete="off"
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
														}}
													>
														Tues
													</p>
												}
												width={90}
												defaultValue={0.99}
												isCompact
											/>
											<TextField
												autoComplete="off"
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
														}}
													>
														Wed
													</p>
												}
												width={90}
												isCompact
												defaultValue={0.99}
											/>
											<TextField
												autoComplete="off"
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
														}}
													>
														Thurs
													</p>
												}
												width={90}
												isCompact
												defaultValue={0.99}
											/>
											<TextField
												defaultValue={0.99}
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
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
															fontWeight: "bold",
														}}
													>
														Sat
													</p>
												}
												width={90}
												isCompact
												defaultValue={0.99}
											/>
											<TextField
												autoComplete="off"
												elemBeforeInput={
													<p
														style={{
															fontWeight: "bold",
														}}
													>
														Sun
													</p>
												}
												width={90}
												isCompact
												defaultValue={0.99}
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
											elemAfterInput={buttonAddSkills}
											{...fieldProps}
										/>
                                        										{!error && (
											<HelperMessage>
												<InfoIcon
													size="small"
													content=""
												></InfoIcon>
												Click add circle button in order
												to add skills into table
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
							<DynamicTable head={head} rows={rows} />
							<FormFooter>
								<ButtonGroup>
									<Button appearance="subtle">Cancel</Button>
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
		</>
	);
}

export function ParameterSelectWorkforcesTable() {
	const [TableLoadingState, setTableLoadingState] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const [workforces, setWorkforces] = useState([]);

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
		filterWorkforceName(workforces, searchInput);
	}

	function handleOnSearch() {
		filterWorkforceName(workforces, searchInput);
	}

	//GET LIST WORKFORCES
	useEffect(function () {
		invoke("getAllWorkforces")
			.then(function (res) {
				setTableLoadingState(false);
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
					};
					workforces.push(itemWorkforce);
				}
				setWorkforces(workforces);
				filterWorkforceName(workforces, searchInput);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
	}, []);

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
				width: 90,
			},
		],
	};

	const rows = workforcesFilter?.map((workforce, index) => ({
		key: workforce.id,
		cells: [
			{
				key: "no",
				content: <Checkbox isChecked></Checkbox>,
			},
			{
				key: "name",
				content: workforce.name,
			},
		],
	}));

	return (
		<>
			<div style={{ display: "flex" }}>
				<div style={{ flex: "0 0 300px" }}>
					<TextField
						isCompact
						placeholder="Search Workforce Name"
						aria-label="Filter"
						onChange={handleOnSearchBoxChange}
						value={searchInput}
						onClick={handleOnSearch}
					/>
				</div>
				<div
					style={{
						flex: "0 0 300px",
					}}
				>
					<Button appearance="primary">Create new</Button>
				</div>
			</div>
			<DynamicTable
				shouldScrollInViewport
				head={head}
				rows={rows}
				isFixedSize
				isLoading={TableLoadingState}
			/>
		</>
	);
}
