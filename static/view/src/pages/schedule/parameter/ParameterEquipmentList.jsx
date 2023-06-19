import React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import { equipments } from '../../resources/equipments/table-content/equipments';

const ParameterEquipmentList = () => {
  return (
    <>
        <h2 style={{margin: 5}}>Equipment Resources</h2>
        <ButtonGroup>
            {equipments?.map(({name}) => (
                <Button>{name}</Button>
            ))}
        </ButtonGroup>   
    </>
  );
};

export default ParameterEquipmentList;