import React from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import Lozenge from '@atlaskit/lozenge';

export default ({arrays}) => (
  <>
    <div>
      {arrays?.map(({name,level,color}) => (
          <Lozenge>
            <div>
            {name}
            </div>
          </Lozenge>
      ))}
    </div>
  </>
);
