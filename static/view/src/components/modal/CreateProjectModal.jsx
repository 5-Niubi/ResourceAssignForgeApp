import Button, { ButtonGroup } from "@atlaskit/button";
import { ModalBody, useModal } from "@atlaskit/modal-dialog";
import { Grid, GridColumn } from "@atlaskit/page";
import React, { Fragment } from "react";

function CreateProjectModal() {
  const columns = 2;
  const { onClose, titleId } = useModal();

  return (
    <Fragment>
      <ModalBody>
        <Grid layout="fluid" spacing="comfortable" columns={columns}>
        <GridColumn medium={1}>
            
        </GridColumn>
        </Grid>
      </ModalBody>
      <ButtonGroup>
        <Button appearance="subtle-link">Remind me later</Button>
        <Button onClick={onClose} appearance="primary" autoFocus>
          Switch to the new Jira
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}

export default CreateProjectModal;
