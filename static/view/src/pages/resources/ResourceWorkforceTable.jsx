import { token } from "@atlaskit/tokens";
import React, { useEffect, useState, useCallback, Fragment } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { FC, ReactNode } from "react";
import { invoke } from "@forge/bridge";
import Toastify from "../../common/Toastify";
import Lozenge from "@atlaskit/lozenge";
import { COLOR_SKILL_LEVEL } from "../../common/contants";
import { css, jsx } from "@emotion/react";
import Avatar from "@atlaskit/avatar";
import { PiStarFill } from "react-icons/pi";
import MoreIcon from "@atlaskit/icon/glyph/more";

const wrapperStyles = css({
	position: "relative",
	table: {
		width: "100%",
	},
});

const overflow = css({
	overflowX: "auto",
	"::after": {
		width: 20,
		height: "100%",
		position: "absolute",
		top: token("space.0", "0px"),
		// // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage-spacing
		left: "calc(100% - 8px)",
		background: `linear-gradient(to right, ${token(
			"color.blanket",
			"rgba(99, 114, 130, 0)"
		)} 0px, ${token("color.blanket", "rgba(9, 30, 66, 0.13)")} 100%)`,
		content: "''",
	},
});

function ResourceWorkforceTable() {
	const [TableLoadingState, setTableLoadingState] = useState(true);
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

	function iterateThroughLorem(index) {
		return index > lorem.length ? index - lorem.length : index;
	}

	const nameWrapperStyles = css({
		display: "flex",
		alignItems: "center",
	});

	const NameWrapper = ({ children }) => (
		<span css={nameWrapperStyles}>{children}</span>
	);

	const avatarWrapperStyles = css({
		marginRight: token("space.100", "8px"),
	});

	const AvatarWrapper = ({ children }) => (
		<div css={avatarWrapperStyles}>{children}</div>
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
					width: withWidth ? 10 : undefined,
				},
				{
					key: "skill",
					content: "Skills",
					shouldTruncate: false,
					width: withWidth ? 40 : undefined,
				},
				{
					key: "salary",
					content: "Salary (Hour)",
					shouldTruncate: false,
					width: withWidth ? 10 : undefined,
				},
				{
					key: "type",
					content: "Type",
					shouldTruncate: false,
					width: withWidth ? 10 : undefined,
				},
				{
					key: "detail",
					content: "Detail",
					shouldTruncate: false,
					width: withWidth ? 5 : undefined,
				},
			],
		};
	};

	const head = createHead(true);

	const rows = workforces.map((workforce, index) => ({
		key: `row-${index}-${workforce.name}`,
		isHighlighted: false,
		cells: [
			{
				key: workforce.id,
				content: <strong>#{workforce.id}</strong>,
			},
			{
				key: createKey(workforce.name),
				content: (
					<NameWrapper>
						<AvatarWrapper>
							<Avatar
								src={workforce.avatar}
								name={workforce.displayName}
								size="medium"
							/>
						</AvatarWrapper>
						<a href="">{workforce.name}</a>
					</NameWrapper>
				),
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
				content: workforce.unitSalary,
			},
			{
				key: "type",
				content: workforce.workingType == 0 ? "Full-time" : "Part-time",
			},
			{
				key: "detail",
				content: (
					<div>
						<MoreIcon></MoreIcon>
					</div>
				),
			},
		],
	}));

	return (
		<>
			<h5 style={{ marginBottom: "3px" }}>
				We have total number: {workforces.length} members
			</h5>
			<div css={wrapperStyles}>
				<div css={overflow}>
					<DynamicTable
						head={head}
						rows={rows}
						rowsPerPage={10}
						defaultPage={1}
						isLoading={TableLoadingState}
					/>
				</div>
			</div>
		</>
	);
}

export default ResourceWorkforceTable;
