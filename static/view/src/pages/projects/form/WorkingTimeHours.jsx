import Button from "@atlaskit/button";
import { TimePicker } from "@atlaskit/datetime-picker";
import { Field, FormSection, HelperMessage } from "@atlaskit/form";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import CrossIcon from "@atlaskit/icon/glyph/cross";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState } from "react";

const columns = 9;
let timeRange = {
	start: "9",
	finish: "12",
};
function WorkingTimeHours() {
	const removeButton = (index) => (
		<Button
			iconBefore={<CrossIcon label="v" />}
			appearance="subtle"
			onClick={() => handleRemoveBtnClick(index)}
		></Button>
	);
	const addButton = () => (
		<Button
			iconBefore={<AddCircleIcon label="v" />}
			appearance="subtle"
			onClick={handleAddBtnClick}
		></Button>
	);

	function setTimeRangeStart(e, index) {
		console.log(e);
		setTimeRangeValues((prev) => {
			prev[index].finish = e;
			return prev;
		});
	}

	function setTimeRangeFinish(e, index) {
		console.log(e);
		setTimeRangeValues((prev) => {
			prev[index].finish = e;
			return prev;
		});
	}

	const [timeRangeValues, setTimeRangeValues] = useState([timeRange, timeRange]);

	let fieldTimeInput = (actionButton, index) => (
		<Grid columns={columns} layout="fluid" spacing="compact">
			<GridColumn medium={1}>{actionButton}</GridColumn>
			<GridColumn medium={4}>
				<TimePicker
					value={timeRangeValues[index].start}
					onChange={(e) => {
						setTimeRangeStart(e, index);
					}}
				/>
			</GridColumn>
			<GridColumn medium={4}>
				<TimePicker
					value={timeRangeValues[index].finish}
					onChange={(e) => {
						setTimeRangeFinish(e, index);
					}}
				/>
			</GridColumn>
		</Grid>
	);

	const [arrWorkingHourInput, setArrWorkingHourInput] = useState([
		fieldTimeInput,
	]);

	function handleAddBtnClick() {
		let timeRangeAdd = {
			start: "9:30",
			finish: "12:30",
		};
		setTimeRangeValues((prev) => [...prev, timeRange]);
		setArrWorkingHourInput((prev) => [...prev, fieldTimeInput]);
	}

	function handleRemoveBtnClick(index) {
		setArrWorkingHourInput((prev) => prev.filter((e, i) => i != index));
		setTimeRangeValues((prev) => prev.filter((e, i) => i != index));
	}

	return (
		<Fragment>
			{arrWorkingHourInput.map((element, index) => {
				let actionButton = removeButton(index);

				if (index == arrWorkingHourInput.length - 1) {
					actionButton = addButton();
				}
				return element(actionButton, index);
			})}
		</Fragment>
	);
}

export default WorkingTimeHours;
