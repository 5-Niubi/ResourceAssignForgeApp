import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Spinner from "@atlaskit/spinner";
import { invoke } from "@forge/bridge";
import {
	cache,
	getCache,
} from "../../common/utils";
import Button, { ButtonGroup } from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import DynamicTable from "@atlaskit/dynamic-table";
import EmptyState from "@atlaskit/empty-state";
import "./style.css";
import EditIcon from "@atlaskit/icon/glyph/edit";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditorSearchIcon from "@atlaskit/icon/glyph/editor/search";
import Toastify from "../../common/Toastify";
import CreateSkillModal from "./modal/CreateSkillModal";
import DeleteSkillModal from "./modal/DeleteSkillModal";
import TextFieldColors from "@atlaskit/textfield";

/**
 * Using as Demo Homepage
 * @returns {import("react").ReactElement}
 */
function SkillsPage() {
	let navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [loadingSkills, setLoadingSkills] = useState(true);
	const [skills, setSkills] = useState([]);

	const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
	const [skillEdit, setSkillEdit] = useState(null);

	const updateSkills = (skills) => {
		cache("skills", JSON.stringify(skills));
		setSkills(skills);
	};

	useEffect(function () {
		setIsLoading(false);
		setLoadingSkills(false);
		var skillsCache = getCache("skills");
		if (!skillsCache) {
			setLoadingSkills(true);
			invoke("getAllSkills", {})
				.then(function (res) {
					setLoadingSkills(false);
					if (Object.keys(res).length !== 0) {
						setSkills(res);
						cache("skills", JSON.stringify(res));
					}
				})
				.catch(function (error) {
					setLoadingSkills(false);
					console.log(error);
					Toastify.error(error.toString());
				});
		} else {
			setSkills(JSON.parse(skillsCache));
		}
	}, []);

	const [searchInput, setSearchInput] = useState("");
	const [skillsFilter, setSkillsFilter] = useState(skills);
	const filterSkillName = useCallback(function (skills, query) {
		if (query === null || query.trim() === "") {
			setSkillsFilter(skills);
		} else {
			setSkillsFilter(
				skills.filter((e) =>
					e.name.toLowerCase().includes(query.toLowerCase().trim()))
			);
		}
	}, []);

	useEffect(
		function () {
			filterSkillName(skills, searchInput);
		},
		[skills]
	);

	function handleOnSearchBoxChange(e) {
		const newSearchInput = e.target.value;
		setSearchInput(newSearchInput);
		filterSkillName(skills, newSearchInput);
	}

	const actionsContent = (
		<ButtonGroup>
			<Button
				appearance="primary"
				onClick={() => {
					setSkillEdit(null);
					setIsModalCreateOpen(true);
				}}
			>
				Create new skill
			</Button>
		</ButtonGroup>
	);

	const barContent = (
		<div style={{ display: "flex" }}>
			<div style={{ flex: "0 0 280px" }}>
				<TextFieldColors
					isCompact
					placeholder="Filter by Skill Name"
					aria-label="Filter"
					elemAfterInput={<EditorSearchIcon label="Search" />}
					onChange={handleOnSearchBoxChange}
					value={searchInput}
				/>
			</div>
		</div>
	);

	const head = {
		cells: [
			{
				key: "no",
				content: "",
				isSortable: false,
				width: 5,
			},
			{
				key: "name",
				content: "Skill name",
				shouldTruncate: true,
				isSortable: false,
				width: 30,
			},
			{
				key: "description",
				content: "Description",
				shouldTruncate: true,
				isSortable: false,
				width: 40,
			},
			{
				key: "action",
			},
		],
	};

	var rows = skillsFilter?.map((skill, index) => {
		return {
			key: `skill-${skill.id}`,
			isHighlighted: false,
			cells: [
				{
					key: "no",
					content: <div className="text-center">{index + 1}</div>,
				},
				{
					key: "name",
					content: skill.name,
				},
				{
					key: "description",
					content: skill.description,
				},
				{
					key: "option",
					content: (
						<div className="actions">
							<ButtonGroup>
								<Button
									appearance="subtle"
									onClick={() => {
										setSkillEdit(skill);
										setIsModalCreateOpen(true);
									}}
								>
									<EditIcon />
								</Button>
								<Button
									appearance="subtle"
									onClick={() => {
										setSkillEdit(skill);
										setIsModalDeleteOpen(true);
									}}
								>
									<TrashIcon />
								</Button>
							</ButtonGroup>
						</div>
					),
				},
			],
		};
	});

	return (
		<>
			{isLoading ? (
				<Spinner size="large" />
			) : (
				<div className="skills-page">
					<PageHeader actions={actionsContent} bottomBar={barContent}>
						Manage all skills over your projects
					</PageHeader>

					<DynamicTable
						head={head}
						rows={rows}
						rowsPerPage={15}
						defaultPage={1}
						// page={1}
						isFixedSize
						onSort={() => console.log("onSort")}
						isLoading={loadingSkills}
						emptyView={
							<EmptyState
								header="Empty"
								description="There is no skill."
								primaryAction={
									<Button
										appearance="primary"
										onClick={() => {
											setSkillEdit(null);
											setIsModalCreateOpen(true);
										}}
									>
										Create new skill
									</Button>
								}
							/>
						}
					/>

					{isModalCreateOpen ? (
						<CreateSkillModal
							isOpen={isModalCreateOpen}
							setIsOpen={setIsModalCreateOpen}
							skills={skills}
							updateSkills={updateSkills}
							skillEdit={skillEdit}
							updateSkillEdit={(s) => updateSkillEdit(s)}
						/>
					) : (
						""
					)}

					{isModalDeleteOpen ? (
						<DeleteSkillModal
							setIsOpen={setIsModalDeleteOpen}
							skill={skillEdit}
							skills={skills}
							updateSkills={updateSkills}
						/>
					) : (
						""
					)}
				</div>
			)}
		</>
	);
}

export default SkillsPage;
