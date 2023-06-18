
import { FC, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditIcon from '@atlaskit/icon/glyph/edit';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { token } from '@atlaskit/tokens';

import { lorem } from './lorem';
import { equipments } from './equipments';
import WorkforceLozenge from '../../workforces/WorkforceLozenge';
import EquipmentLozenge from '../EquipmentLozenge';


function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

function iterateThroughLorem(index) {
  return index > lorem.length ? index - lorem.length : index;
}

const nameWrapperStyles = css({
  display: 'flex',
  alignItems: 'center',
});

const NameWrapper = ({ children }) => (
  <span css={nameWrapperStyles}>{children}</span>
);

const avatarWrapperStyles = css({
  marginRight: token('space.100', '8px'),
});

const AvatarWrapper = ({ children }) => (
  <div css={avatarWrapperStyles}>{children}</div>
);

export const createHead = (withWidth) => {
  return {
    cells: [
      {
        key: 'no',
        content: 'No',
        width: 2,
      },
      {
        key: 'id',
        content: 'ID',
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'name',
        content: 'Name',
        width: withWidth ? 45 : undefined,
      },
      {
        key: 'functions',
        content: 'Function',
        shouldTruncate: false,
        width: withWidth ? 400 : undefined,
      },
      {
        key: 'amount',
        content: 'Amount',
        shouldTruncate: true,
      },
      {
        key: 'price',
        content: 'Price (Hour)',
        shouldTruncate: true,
      },
      {
        key: 'available',
        content: 'Availabel',
        shouldTruncate: true,
        width: withWidth ? 20 : undefined,
      },
      {
        key: 'action',
        content: 'Action',
        shouldTruncate: true,
        width: withWidth ? 10 : undefined,
      },
    ],
  };
};

export const head = createHead(true);

export const rows = equipments.map((equipment, index) => ({
  key: `row-${index}-${equipment.name}`,
  isHighlighted: false,
  cells: [
    {
      key: equipment.no,
      content: equipment.no,
    },
    {
      key: equipment.id,
      content: (
        <NameWrapper>
          <a href="">{equipment.id}</a>
        </NameWrapper>
      ),
    },
    {
      key: createKey(equipment.name),
      content: equipment.name,
    },
    {
      key: equipment.functions,
      content: (
        <EquipmentLozenge arrays={equipment.functions}></EquipmentLozenge>
      ),
    },
    {
      key: equipment.amount,
      content: equipment.amount,
    },
    {
      key: equipment.price,
      content: equipment.price,
    },
    {
      key: equipment.available,
      content: equipment.available,
    },
    {
      key: 'available',
      content: (
        <div>
          <EditIcon></EditIcon><TrashIcon></TrashIcon>
        </div>
      ),
    },
  ],
}));
