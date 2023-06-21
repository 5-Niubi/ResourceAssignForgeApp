import { useCallback, useState, Fragment } from "react";

import { css, jsx } from "@emotion/react";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import Button, { ButtonGroup } from "@atlaskit/button";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";

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
							<CreareWorkforceModal></CreareWorkforceModal>
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
								Confirm
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
						<ModalBody>This is a select table</ModalBody>
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

export function CreareWorkforceModal() {
	return (
		<>
			<div
				style={
					{
						// display: "flex",
						// width: "400px",
						// maxWidth: "100%",
						// margin: "0 auto",
						// flexDirection: "column",
					}
				}
			>
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
										/>
										{!error && (
											<HelperMessage>
												You can use letters, numbers,
												and periods.
											</HelperMessage>
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
										/>
										{!error && (
											<HelperMessage>
												You can use letters, numbers,
												and periods.
											</HelperMessage>
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
										/>
										{!error && (
											<HelperMessage>
												Number only.
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
											{...fieldProps}
										/>
										{!error && (
											<HelperMessage>
												Number only.
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

							<FormFooter>
								<ButtonGroup>
									<Button
										appearance="subtle"
									>
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
		</>
	);
}
