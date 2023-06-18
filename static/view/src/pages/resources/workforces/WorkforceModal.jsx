import { useCallback, useState } from "react";

import { css, jsx } from "@emotion/react";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import EditIcon from "@atlaskit/icon/glyph/edit";
import Button from "@atlaskit/button";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";

const boldStyles = css({
  fontWeight: "bold",
});

export default function WorkforceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <div>
      <Button
        iconBefore={<EditIcon label="" size="medium" />}
        appearance="subtle"
        onClick={openModal}
      ></Button>
      <Button
        iconBefore={<TrashIcon label="" size="medium" />}
        appearance="subtle"
        onClick={openModal}
      ></Button>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle appearance="danger">
                Delete
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>
                Are you want to delete this?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>Cancel</Button>
              <Button appearance="danger" onClick={closeModal} autoFocus>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
