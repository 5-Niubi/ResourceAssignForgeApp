
import { FC, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { token } from '@atlaskit/tokens';

import { lorem } from './lorem';
import { presidents } from './president';


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
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'id',
        content: 'ID',
        width: withWidth ? 25 : undefined,
      },
      {
        key: 'name',
        content: 'Name',
        width: withWidth ? 80 : undefined,
      },
      {
        key: 'skill',
        content: 'Skills',
        shouldTruncate: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'salary',
        content: 'Salary',
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
      },
    ],
  };
};

export const head = createHead(true);

export const rows = presidents.map((president, index) => ({
  key: `row-${index}-${president.name}`,
  isHighlighted: false,
  cells: [
    {
      key: president.no,
      content: president.no,
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
            <Avatar name={president.name} size="medium" />
          </AvatarWrapper>
          <a href="https://atlassian.design">{president.name}</a>
        </NameWrapper>
      ),
    },
    {
      key: president.skills,
      content: president.skills,
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
      key: 'MoreDropdown',
      content: (
        <DropdownMenu trigger="More">
          <DropdownItemGroup>
            <DropdownItem>{president.name}</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      ),
    },
  ],
}));
