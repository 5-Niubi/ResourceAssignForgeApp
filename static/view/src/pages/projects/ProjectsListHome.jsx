// @ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjecstListHomePageHeader from "./page-header/ProjectsListHomePageHeader";
import ProjectsListHomeTable from "./table/ProjectsListHomeTable";
import Pagination from "@atlaskit/pagination";
import { useMediaQuery } from "react-responsive";
import { Grid, GridColumn } from "@atlaskit/page";
import { Desktop } from "../../components/common/responsesive";
import { MEDIA_QUERY, MODAL_WIDTH } from "../../common/contants";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import CreateProjectModal from "./modal/CreateProjectModal";
import { invoke } from "@forge/bridge";

const width = MODAL_WIDTH.M;

function ProjectListHome() {
	const columns = 10;
	const [isOpen, setIsOpen] = useState(false);

	const isDesktopOrLaptop = useMediaQuery({
		query: `(min-width: ${MEDIA_QUERY.DESKTOP_LAPTOP.MIN}px)`,
	});

	const [searchBoxValue, setSearchBoxValue] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(
		searchParams.get("page") ? searchParams.get("page") : 1
	);

	const [projects, setProjects] = useState([]);
	const [pageNumberList, setPageNumberList] = useState([]);

	const openModal = useCallback(
		function () {
			setIsOpen(true);
		},
		[setIsOpen]
	);

	useEffect(
		function () {
			invoke("getProjectsList", { page })
				.then(function (res) {
					let projectsList = [];
					handlePaging(res.total);
					for (let project of res.values) {
						let itemProject = {};
						itemProject.id = project.id;
						itemProject.content = {
							no: 1,
							projectId: project.id,
							projectName: project.name,
							startDate: project.startDate,
						};
						itemProject.hasChildren = false;
						projectsList.push(itemProject);
					}
					setProjects(projectsList);
				})
				.catch(function (error) {
					console.log(error);
				});
			return setProjects([]);
		},
		[page]
	);

	const handlePaging = useCallback(function (total) {
		for (let i = 1; i <= total; i++) {
			pageNumberList.push(i);
		}
		pageNumberList;
		setPageNumberList((prev) => [...prev]);
	}, []);

	function handleOnSearchBoxChange(e) {
		setSearchBoxValue(e.target.value);
	}

	return (
		<>
			<Grid layout="fluid" spacing="comfortable" columns={columns}>
				<GridColumn medium={columns}>
					<ProjecstListHomePageHeader
						createProjectButtonOnClick={openModal}
						searchBoxValue={searchBoxValue}
						onSearchBoxChange={handleOnSearchBoxChange}
					/>
				</GridColumn>
				<GridColumn medium={isDesktopOrLaptop ? 7 : columns}>
					<div style={{ marginBottom: "1rem" }}>
						<ProjectsListHomeTable items={projects} />
					</div>
					<div style={{ marginTop: "3rem" }}>
						<Pagination
							pages={pageNumberList}
							nextLabel="Next"
							label="Page"
							pageLabel="Page"
							previousLabel="Previous"
							selectedIndex={page - 1}
							onChange={(e, p) => {
								setSearchParams({ page: p });
								setPage(p);
							}}
						/>
					</div>
				</GridColumn>
				<Desktop>
					<GridColumn medium={3}>{/* <div>Hover panel</div> */}</GridColumn>
				</Desktop>
			</Grid>

			{<CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen}/>}
		</>
	);
}

export default ProjectListHome;
const items = [
	{
		id: "item1",
		content: {
			no: "1",
			projectName: "First top-level item",
			projectImage:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREabvR30BJaXiYN2Azwc8fPUWJmv1nzMatw9YIxxrygA&s",
			startDate: "11/10/11",
			amount: 10,
		},
		hasChildren: false,
		children: [],
	},
];
