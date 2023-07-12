import React from 'react';
import StarIcon from '@atlaskit/icon/glyph/star';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import __noop from '@atlaskit/ds-lib/noop';
import PageHeader from '@atlaskit/page-header';


function ParameterPageHeader ({name}) {
  return (
    <PageHeader >
        <div style={{width: "100%"}}>
        {name}
        </div>
    </PageHeader>
  );
};

export default ParameterPageHeader;
