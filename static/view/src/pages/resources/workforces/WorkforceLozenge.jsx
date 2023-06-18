import React from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import Lozenge from '@atlaskit/lozenge';

export default ({arrays}) => (
  <>
    <div>
      {arrays?.map(({name,level,color}) => (
          <Lozenge style={{backgroundColor: color,color: '#42526E' }}>
            <div>
            {name} {level}<StarIcon size='small'></StarIcon> <span> </span>
            </div>
          </Lozenge>
      ))}
    </div>
  </>
);
