import React from 'react';
import __noop from '@atlaskit/ds-lib/noop';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';
import PageHeader from '@atlaskit/page-header';
import Button from "@atlaskit/button";


const barContent = (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: '0 0 200px' }}>
      <TextField isCompact placeholder="Search Human Name/Key" aria-label="Filter" />
    </div>
    <div style={{ flex: '0 0 200px', marginLeft: token('space.100', '8px') }}>
      <Select
        spacing="compact"
        placeholder="Choices"
        aria-label="Choose an option"
      />
    </div>
  </div>
);

const EquipmentPageHeader = () => {
  return (
    <PageHeader
      bottomBar={barContent}
    >
        Equipment
    </PageHeader>
  );
};

export default EquipmentPageHeader;
