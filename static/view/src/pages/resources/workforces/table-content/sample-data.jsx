
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
import { workforces } from './workforces';
import WorkforceLozenge from '../WorkforceLozenge';


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
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'name',
        content: 'Name',
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'skill',
        content: 'Skills',
        shouldTruncate: false,
        width: withWidth ? 300 : undefined,
      },
      {
        key: 'salary',
        content: 'Salary (Hour)',
        shouldTruncate: true,
      },
      {
        key: 'avaiable',
        content: 'Available',
        shouldTruncate: true,
      },
      {
        key: 'type',
        content: 'Type',
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

  // Custom cell component
  function CustomCell({ cell }) {
    return <div><WorkforceLozenge name="C#"></WorkforceLozenge></div>; 
  }


export const rows = workforces.map((president, index) => ({
  key: `row-${index}-${president.name}`,
  isHighlighted: false,
  cells: [
    {
      key: president.no,
      content: president.no,
      width: 15,
    },
    {
      key: president.id,
      content: president.id,
    },
    {
      key: createKey(president.name),
      content: (
        <NameWrapper>
          <AvatarWrapper>
            <Avatar name={president.name} size="medium" /> <a href="https://atlassian.design">{president.name}</a>
          </AvatarWrapper>
        </NameWrapper>
      ),
    },
    {
      key: president.skills,
      content: (
        <WorkforceLozenge arrays={president.skills}></WorkforceLozenge>
      ),
    },
    {
      key: president.salary,
      content: president.salary,
    },
    {
      key: president.avaiable,
      content: president.avaiable,
    },
    {
      key: president.type,
      content: president.type,
    },
    {
      key: 'action',
      content: (
        <div>
          <EditIcon></EditIcon><TrashIcon></TrashIcon>
        </div>
      ),
    },
  ],
}));
 