import { token } from "@atlaskit/tokens";
import React, { useEffect, useState, useCallback, Fragment } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { invoke } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL, ROW_PER_PAGE } from "../../common/contants";
import { css, jsx } from "@emotion/react";
import { PiStarFill } from "react-icons/pi";
import EditIcon from "@atlaskit/icon/glyph/edit";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import Button, { ButtonGroup } from "@atlaskit/button";
import InlineMessage from "@atlaskit/inline-message";
import __noop from "@atlaskit/ds-lib/noop";
import TextField from "@atlaskit/textfield";
import PageHeader from "@atlaskit/page-header";
import InfoMessageColor from "../../components/InfoMessageColor";
import EditorSearchIcon from "@atlaskit/icon/glyph/editor/search";
import ResourceDeleteWorkforceModal from "./ResourceWorkforceModal";

const modalInitState = { workforce: {}, isOpen: false };

function ResourceWorkforceTable() {
	const [TableLoadingState, setTableLoadingState] = useState(true);
    const [modalDeleteState, setModalDeleteState] = useState(modalInitState);
	const [modalEditState, setModalEditState] = useState(modalInitState);
	const [workforces, setWorkforces] = useState([]);
	useEffect(() => {
		Promise.all([invoke("getAllWorkforces"), invoke("getAllUserJira")])
			.then(([workforcesResponse, jiraUsersResponse]) => {
				const workforces = workforcesResponse.map((workforce) => ({
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
				}));

				console.log("GetAllUserJira", jiraUsersResponse);
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

				// setWorkforces([...workforces, ...jiraUsers]);
				setWorkforces(workforces);
				setTableLoadingState(false);
			})
			.catch((error) => {
				console.log(error);
				Toastify.error(error.toString());
			});
	}, []);

	function createKey(input) {
		return input
			? input.replace(/^(the|a|an)/, "").replace(/\s/g, "")
			: input;
	}

	const [searchInput, setSearchInput] = useState("");
	const [workforcesFilter, setWorkforcesFilter] = useState(workforces);
	const filterWorkforceName = useCallback(function (workforces, query) {
		if (query === null || query.trim() === "") {
			setWorkforcesFilter(workforces);
		} else {
			setWorkforcesFilter(
				workforces.filter((e) => {
					const lowercaseQuery = query.toLowerCase().trim();
					const nameMatch = e.name
						.toLowerCase()
						.includes(lowercaseQuery);
					const skillMatch = e.skills?.some((skill) =>
						skill.name
							.replace("-", " ")
							.toLowerCase()
							.includes(lowercaseQuery)
					);
					return nameMatch || skillMatch;
				})
			);
		}
	}, []);

	useEffect(
		function () {
			filterWorkforceName(workforces, searchInput);
		},
		[workforces]
	);

	function handleOnSearchBoxChange(e) {
		const newSearchInput = e.target.value;
		setSearchInput(newSearchInput);
		filterWorkforceName(workforces, newSearchInput);
	}

    function deleteOnClick(workforce) {
		setModalDeleteState({ workforce, isOpen: true });
	}


	const barContent = (
		<div style={{ display: "flex" }}>
			<div style={{ flex: "0 0 280px" }}>
				<TextField
					isCompact
					placeholder="Filter by Employee's Name or Skill"
					aria-label="Filter"
					elemAfterInput={<EditorSearchIcon label="Search" />}
					onChange={handleOnSearchBoxChange}
					value={searchInput}
				/>
			</div>
		</div>
	);

	const createHead = (withWidth) => {
		return {
			cells: [
				{
					key: "id",
					content: "ID",
					width: withWidth ? 5 : undefined,
				},
				{
					key: "name",
					content: "Name",
					isSortable: true,
					width: withWidth ? 12 : undefined,
				},
				{
					key: "skill",
					content: "Skills",
					shouldTruncate: false,
					width: withWidth ? 50 : undefined,
				},
				{
					key: "salary",
					content: "Salary (Hour)",
					shouldTruncate: false,
					width: withWidth ? 7 : undefined,
				},
				{
					key: "type",
					content: "Type",
					shouldTruncate: false,
					width: withWidth ? 7 : undefined,
				},
				{
					key: "actions",
					content: "Actions",
					shouldTruncate: true,
					width: 6,
				},
			],
		};
	};

	const head = createHead(true);

	const rows = workforcesFilter?.map((workforce, index) => ({
		key: `row-${index}-${workforce.name}`,
		isHighlighted: false,
		cells: [
			{
				key: workforce.id,
				content: <strong>#{workforce.id}</strong>,
			},
			{
				key: createKey(workforce.name),
				content: workforce.name,
			},
			{
				key: workforce.skills,
				content: (
					<div>
						{workforce.skills?.map((skill, i) => (
							<span style={{ marginRight: "2px" }}>
								<Lozenge
									key={i}
									style={{
										marginLeft: "8px",
										backgroundColor:
											COLOR_SKILL_LEVEL[skill.level - 1]
												.color,
										color:
											skill.level === 1
												? "#091e42"
												: "white",
									}}
									isBold
								>
									{skill.name} - {skill.level}
									<PiStarFill />
								</Lozenge>
							</span>
						))}
					</div>
				),
			},
			{
				key: workforce.salary,
				content: "$ " + workforce.unitSalary,
			},
			{
				key: "type",
				content: workforce.workingType == 0 ? "Full-time" : "Part-time",
			},
			{
				key: "actions",
				content: (
					<ButtonGroup>
						<Button
							onClick={() => {
								deleteOnClick(workforce);
							}}
							appearance="subtle"
							iconBefore={<TrashIcon label="delete" />}
						></Button>
						<Button
							onClick={() => {
								editOnClick(workforce);
							}}
							appearance="subtle"
							iconBefore={<EditIcon label="edit" />}
						></Button>
					</ButtonGroup>
				),
			},
		],
	}));

	return (
		<>
			<PageHeader bottomBar={barContent}>
				Employee List <InfoMessageColor />
			</PageHeader>

			<InlineMessage
				title={"We have total number: "}
				secondaryText={workforcesFilter.length + " members"}
			/>

			<DynamicTable
				head={head}
				rows={rows}
				rowsPerPage={ROW_PER_PAGE}
				defaultPage={1}
				isLoading={TableLoadingState}
				emptyView={<h2>Not found any employee</h2>}
			/>

			{modalDeleteState.isOpen ? (
				<ResourceDeleteWorkforceModal
					openState={modalDeleteState}
					setOpenState={setModalDeleteState}
				/>
			) : (
				""
			)}

			{/* {modalEditState.isOpen ? (
				<EditProjectModal
					openState={modalEditState}
					setOpenState={setModalEditState}
					setProjectsListState={setProjects}
				/>
			) : (
				""
			)} */}
		</>
	);
}

export default ResourceWorkforceTable;
