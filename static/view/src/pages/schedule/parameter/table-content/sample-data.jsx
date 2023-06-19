
import { FC, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';
import { token } from '@atlaskit/tokens';

import { lorem } from './lorem';
import { estimateResources } from './estimateresource';


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
        key: 'workforces',
        content: 'Workforces',
        width: "50%",
      },
      {
        key: 'equipments',
        content: 'Equipments',
        width: "50%",
      },
    ],
  };
};

export const head = createHead(true);


export const rows = estimateResources.map((estimateResource, index) => ({
  key: `row-${index}-${estimateResource.name}`,
  isHighlighted: false,
  cells: [
    {
      key: estimateResource.workforces,
      content: (
        <>
        <ul>
        {estimateResource.workforces?.map((er) => (
            <li>{er}</li>
        ))}
        </ul>
        </>
      ),
    },
    {
        key: estimateResource.equipments,
        content: (
            <>
            <ul>
            {estimateResource.equipments?.map((er) => (
                <li>{er}</li>
            ))}
            </ul>
            </>
          ),
    },
  ],
}));
 