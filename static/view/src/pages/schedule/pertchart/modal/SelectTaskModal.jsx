import { Checkbox } from "@atlaskit/checkbox";
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from "@atlaskit/modal-dialog";
import { CheckboxSelect } from "@atlaskit/select";
import TableTree from "@atlaskit/table-tree";
import Button from "@atlaskit/button";
import { useCallback, useState } from "react";

function SelectTaskModal({isOpen, updateOpenSelectModal}) {
	const [shouldScrollInViewport, setShouldScrollInViewport] = useState(false);

	const setShouldScrollInViewportAndOpen = useCallback(
		(shouldScrollInViewport) => {
			setShouldScrollInViewport(shouldScrollInViewport);
			requestAnimationFrame(() => setIsOpen(true));
		},
		[setShouldScrollInViewport]
	);

    function close(){
        updateOpenSelectModal(false);
    }

	const items = [
		{
			id: "1",
			content: {
				id: "1",
				name: "Task 1",
				precedenceTasks: [1, 2, 3],
			},
			hasChildren: false,
			children: [],
		},
		{
			id: "2",
			content: {
				id: "2",
				name: "Task 2",
				precedenceTasks: [1, 2, 3],
			},
			hasChildren: false,
			children: [],
		},
		{
			id: "3",
			content: {
				id: "3",
				name: "Task 3",
				precedenceTasks: [1, 2, 3],
			},
			hasChildren: false,
			children: [],
		},
		{
			id: "4",
			content: {
				id: "4",
				name: "Task 4",
				precedenceTasks: [1, 2, 3],
			},
			hasChildren: false,
			children: [],
		},
	];

	const TaskName = (props) => <span>{props.name}</span>;
	const Dependencies = (props) => {
		var opts = [];
		items.forEach((item) => {
			if (item.id == props.id) {
				return;
			}
			opts.push({ value: item.id, label: item.content.name });
		});
		return (
			<CheckboxSelect
				inputId={"precedence-" + props.id}
				options={opts}
				isMulti
				isSearchable={true}
				placeholder="Choose precedence tasks"
			/>
		);
	};
	const Selected = (props) => (
		<Checkbox value={props.id} name="task" size="large" />
	);

	return (
		<ModalTransition>
			{isOpen && (
				<Modal
					onClose={close}
					shouldScrollInViewport={shouldScrollInViewport}
					height={600}
				>
					<ModalHeader>
						<ModalTitle>Select tasks to schedule</ModalTitle>
					</ModalHeader>
					<ModalBody>
						<TableTree
							columns={[Selected, TaskName, Dependencies]}
							headers={["", "Tasks", "Precedence tasks"]}
							columnWidths={["10px", "300px", "500px"]}
							items={items}
						/>
					</ModalBody>
					<ModalFooter>
						<Button appearance="primary" onClick={close}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			)}
		</ModalTransition>
	);
}

export default SelectTaskModal;