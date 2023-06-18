import Button, { ButtonGroup } from "@atlaskit/button";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  useModal,
} from "@atlaskit/modal-dialog";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment, useState } from "react";
import TextField from "@atlaskit/textfield";
import Form, { Field, FormSection } from "@atlaskit/form";
import { DatePicker } from "@atlaskit/datetime-picker";
import ObjectiveRange from "../form/ObjectiveRange";

function CreateProjectModal() {
  const columns = 10;
  const { onClose } = useModal();

  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [unit, setUnit] = useState("");
  const [objTime, setObjTime] = useState(50);
  const [objCost, setObjCost] = useState(50);
  const [objQuality, setObjQuality] = useState(50);

  


  return (
    <Fragment>
      <Form onSubmit={(formState) => console.log('form submitted', formState)}>
        {({ formProps }) => (
          <form id="form-with-id" {...formProps}>
            <ModalHeader>
              <ModalTitle>Create new Software Project</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Grid layout="fluid" spacing="compact" columns={columns}>
                <GridColumn medium={7}>
                  <FormSection>
                    <Field
                      aria-required={true}
                      name="projectName"
                      label="Project Name"
                    >
                      {() => <TextField autoComplete="off" />}
                    </Field>
                  </FormSection>
                  <FormSection>
                    <Field
                      name="startDate"
                      label="Start Date"
                      defaultValue=""
                      isRequired
                    >
                      {() => (
                        <Fragment>
                          <DatePicker />
                        </Fragment>
                      )}
                    </Field>
                    <Field
                      name="endDate"
                      label="End Date"
                      defaultValue=""
                      isRequired
                    >
                      {() => (
                        <Fragment>
                          <DatePicker />
                        </Fragment>
                      )}
                    </Field>
                  </FormSection>
                  <FormSection>
                    <Grid spacing="compact" columns={columns}>
                      <GridColumn medium={8}>
                        <Field
                          aria-required={true}
                          name="budget"
                          label="Budget"
                        >
                          {() => <TextField autoComplete="off" />}
                        </Field>
                      </GridColumn>
                      <GridColumn medium={2}>
                        <Field
                          aria-required={true}
                          name="budgetUnit"
                          label="Unit"
                        >
                          {() => <TextField autoComplete="off" />}
                        </Field>
                      </GridColumn>
                    </Grid>
                  </FormSection>
                  <FormSection>
                    <ObjectiveRange
                      label="Objective Time"
                      name="ObjectiveTime"
                      value={objTime}
                      onChange={undefined}
                    />
                    <ObjectiveRange
                      name="ObjectiveCost"
                      label="Objective Cost"
                      value={objCost}
                      onChange={undefined}
                    />
                    <ObjectiveRange
                      name="ObjectiveQuality"
                      label="Objective Quality"
                      value={objQuality}
                      onChange={undefined}
                    />
                  </FormSection>
                </GridColumn>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button appearance="default" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" appearance="primary" autoFocus>
                  Create
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Fragment>
  );
}

export default CreateProjectModal;
