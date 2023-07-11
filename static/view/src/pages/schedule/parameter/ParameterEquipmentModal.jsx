import { css, jsx } from "@emotion/react";
import { useCallback, useState, Fragment } from "react";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import Button from "@atlaskit/button";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import TextField from "@atlaskit/textfield";

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
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
	//CREATE EQUIPMENT MODAL (CW)
	const [isCEOpen, setisCEOpen] = useState(false);
	const openCEModal = useCallback(() => setisCEOpen(true), []);
	const closeCEModal = useCallback(() => setisCEOpen(false), []);

	return (
		<div>
			<Button
				iconBefore={<AddCircleIcon label="" size="large" />}
				appearance="subtle"
				onClick={openCEModal}
			></Button>

			{/* CREATE WORKFORCE MODAL (CW) */}
			<ModalTransition>
				{isCEOpen && (
					<Modal
						onClose={closeCEModal}
						shouldScrollInViewport={true}
						width={"large"}
					>
						<ModalHeader>
							<ModalTitle>Add new equipment</ModalTitle>
						</ModalHeader>
						<ModalBody>
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
															already in use, try
															another one.
														</ErrorMessage>
													)}
												</Fragment>
											)}
										</Field>
										<Field
											name="amount"
											label="Amount"
											isRequired
											defaultValue=""
										>
											{({ fieldProps, error }) => (
												<Fragment>
													<TextField
														autoComplete="off"
														{...fieldProps}
														placeholder="Numbers only."
													/>
													{!error && (
														<HelperMessage></HelperMessage>
													)}
													{error && (
														<ErrorMessage>
															This username is
															already in use, try
															another one.
														</ErrorMessage>
													)}
												</Fragment>
											)}
										</Field>
										<Field
											name="unit"
											label="Equipment Unit"
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
															Wrong input.
														</ErrorMessage>
													)}
												</Fragment>
											)}
										</Field>
										<Field
											name="price"
											label="Hired price hour"
											isRequired
											defaultValue=""
										>
											{({ fieldProps, error }) => (
												<Fragment>
													<TextField
														autoComplete="off"
														{...fieldProps}
														placeholder="$"
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
										<FormFooter>
											{/* <ButtonGroup>
									<Button appearance="subtle">Cancel</Button>
									<LoadingButton
										type="submit"
										appearance="primary"
										isLoading={submitting}
									>
										Create
									</LoadingButton>
								</ButtonGroup> */}
										</FormFooter>
									</form>
								)}
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button
								appearance="subtle"
								onClick={closeCEModal}
								autoFocus
							>
								Cancel
							</Button>
							<Button
								appearance="primary"
								onClick={closeCEModal}
								autoFocus
							>
								Create
							</Button>
						</ModalFooter>
					</Modal>
				)}
			</ModalTransition>
		</div>
	);
}
