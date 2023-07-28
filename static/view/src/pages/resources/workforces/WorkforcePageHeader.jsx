import React from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';
import PageHeader from '@atlaskit/page-header';
import WorkforceLozenge from './WorkforceLozenge';
import InfoMessageColor from '../../../components/InfoMessageColor';

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
    <div style={{ flex: '0 0 200px', paddingTop: "5px", paddingLeft:"5px" }}>
    <InfoMessageColor/>
    </div>

  </div>
);

const WorkforcePageHeader = () => {
  return (
    <PageHeader
      bottomBar={barContent}
    >
      Employee List
    </PageHeader>
  );
};

export default WorkforcePageHeader;
