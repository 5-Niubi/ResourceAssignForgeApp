import React from "react";

import StarFilledIcon from "@atlaskit/icon/glyph/star-filled";

import Button from "@atlaskit/button";
import TrashIcon from '@atlaskit/icon/glyph/trash';


const ButtonIcon = () => {
  return (
    <Button
      iconBefore={<TrashIcon label="" size="medium" />}
      appearance="subtle"
    ></Button>
  );
};

export default ButtonIcon;
