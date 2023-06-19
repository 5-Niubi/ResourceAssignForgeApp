import React, { useCallback, useEffect, useState } from "react";
import ProjecstListHomePageHeader from "./page-header/ProjectsListHomePageHeader";
import ProjectsListHomeTable from "./table/ProjectsListHomeTable";
import Pagination from "@atlaskit/pagination";
import { useMediaQuery } from "react-responsive";
import { Grid, GridColumn } from "@atlaskit/page";
import { Desktop } from "../../../components/common/responsesive";
import { MEDIA_QUERY, MODAL_WIDTH } from "../../../common/contants";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import CreateProjectModal from "./modal/CreateProjectModal";
import { invoke } from "@forge/bridge";

function ProjectListHome() {
	const columns = 10;
	const width = MODAL_WIDTH.M;

	const [isOpen, setIsOpen] = useState(false);
	const isDesktopOrLaptop = useMediaQuery({
		query: `(min-width: ${MEDIA_QUERY.DESKTOP_LAPTOP.MIN}px)`,
	});

	const [page, setPage] = useState(1);
	const [projects, setProjects] = useState([]);
	const [pageNumberList, setPageNumberList] = useState([]);

	useEffect(
		function () {
			invoke("getProjectsList", { page }).then(function (res) {
				let projectsList = [];
				let itemProject = {};
				handlePaging(res.total);
				for (let project of res.values) {
					itemProject.id = project.id;
					itemProject.content = {
						no: 1,
						projectName: project.name,
						startDate: project.startDate,
					};
					itemProject.hasChildren = false;
					projectsList.push(itemProject);
				}
				// @ts-ignore
				setProjects(projectsList);
			}).catch();
		},
		[page]
	);

	function handlePaging(total) {
		let _pageNumberList = [];
		for (let i = 1; i <= total; i++) {
			_pageNumberList.push(i);
		}
		setPageNumberList(_pageNumberList);
	}

	const closeModal = useCallback(
		function () {
			setIsOpen(false);
		},
		[setIsOpen]
	);
	const openModal = useCallback(
		function () {
			setIsOpen(true);
		},
		[setIsOpen]
	);

	return (
		<>
			<Grid layout="fluid" spacing="comfortable" columns={columns}>
				<GridColumn medium={columns}>
					<ProjecstListHomePageHeader createProjectButtonOnClick={openModal} />
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
								setPage(p);
								setProjects([]);
							}}
						/>
					</div>
				</GridColumn>
				<Desktop>
					<GridColumn medium={3}>
						<div>Hover panel</div>
					</GridColumn>
				</Desktop>
			</Grid>

			{
				<ModalTransition>
					{isOpen && (
						<Modal onClose={closeModal} width={width}>
							<CreateProjectModal />
						</Modal>
					)}
				</ModalTransition>
			}
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
