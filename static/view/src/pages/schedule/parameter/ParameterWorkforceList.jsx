import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import { workforces } from '../../resources/workforces/table-content/workforces';

const ParameterWorkforceList = () => {
  return (
    <div style={{width: "100wh"}}>
        <h2 style={{margin: 5}}>Workforces</h2>
        <ButtonGroup>
            {workforces?.map(({name}) => (
                <Button>{name}</Button>
            ))}
        </ButtonGroup>   
    </div>
  );
};

export default ParameterWorkforceList;