// @ts-nocheck
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import ProjectListDynamicTable from "./table/ProjectListDynamicTable";
import EditProjectModal from "./modal/EditProjectModal";
import DeleteProjectModal from "./modal/DeleteProjectModal";
import Toastify from "../../common/Toastify";

const width = MODAL_WIDTH.M;
const modalInitState = { project: {}, isOpen: false };

const ModalStateContext = useContext();
function ProjectListHome() {
	const columns = 10;

	const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

	const [modalDeleteState, setModalDeleteState] = useState(modalInitState);
	const [modalEditState, setModalEditState] = useState(modalInitState);

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

	// useCallback(
	// 	function () {
	// 		invoke("getProjectsList", { page })
	// 			.then(function (res) {
	// 				let projectsList = [];
	// 				handlePaging(res.total);
	// 				for (let project of res.values) {
	// 					let itemProject = {};
	// 					itemProject.id = project.id;
	// 					itemProject.content = {
	// 						no: 1,
	// 						projectId: project.id,
	// 						projectName: project.name,
	// 						startDate: project.startDate,
	// 					};
	// 					itemProject.hasChildren = false;
	// 					projectsList.push(itemProject);
	// 				}
	// 				setProjects(projectsList);
	// 			})
	// 			.catch(function (error) {
	// 				console.log(error);
	// 			});
	// 		return setProjects([]);
	// 	},
	// 	[page]
	// );

	useEffect(function () {
		invoke("getProjectsList", { page })
			.then(function (res) {
				let projectsList = [];
				for (let project of res) {
					let itemProject = {};
					itemProject = {
						id: project.id,
						imageAvatar: project.imageAvatar,
						name: project.name,
						startDate: project.startDate,
						tasks: project.tasksNumber,
					};
					projectsList.push(itemProject);
				}
				setProjects(projectsList);
			})
			.catch(function (error) {
				console.log(error);
				Toastify.error(error);
			});
		return setProjects([]);
	}, []);

	function handleOnSearchBoxChange(e) {
		setSearchBoxValue(e.target.value);
	}

	function handleOnSearchButtonClick() {
		searchBoxValue;
	}

	return (
		<>
			<Grid layout="fluid" spacing="comfortable" columns={columns}>
				<GridColumn medium={columns}>
					<ProjecstListHomePageHeader
						createProjectButtonOnClick={() => setIsModalCreateOpen(true)}
						searchBoxValue={searchBoxValue}
						onSearchBoxChange={handleOnSearchBoxChange}
						onSearchButtonClick={handleOnSearchButtonClick}
					/>
				</GridColumn>
				<GridColumn medium={isDesktopOrLaptop ? 7 : columns}>
					<div style={{ marginBottom: "1rem" }}>
						{/* <ProjectsListHomeTable items={projects} /> */}
						<ModalStateContext.Provider value={}>
							<ProjectListDynamicTable
								content={projects}
								setEditModalState={setModalEditState}
								setDeleteModalState={setModalDeleteState}
							/>
						</ModalStateContext.Provider>
					</div>
					{/* <div style={{ marginTop: "3rem" }}>
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
					</div> */}
				</GridColumn>
				<Desktop>
					<GridColumn medium={3}>{/* <div>Hover panel</div> */}</GridColumn>
				</Desktop>
			</Grid>

			<CreateProjectModal
				isOpen={isModalCreateOpen}
				setIsOpen={setIsModalCreateOpen}
			/>

			<DeleteProjectModal
				openState={modalDeleteState}
				setOpenState={setModalDeleteState}
			/>

			<EditProjectModal
				openState={modalEditState}
				setOpenState={setModalEditState}
			/>
		</>
	);
}

export default ProjectListHome;
