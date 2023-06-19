
import React, { Fragment, useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import Form, { Field, FormFooter, HelperMessage, RangeField } from '@atlaskit/form';
import Range from '@atlaskit/range';

import Textfield from '@atlaskit/textfield';

export default function ParameterObjectInput() {
    const [valueTime, setValueTime] = useState(50);
  return (
    <Form
      onSubmit={(formState) =>
        console.log( 'form submitted', formState)
      }
    >
      {({ formProps, time, cost, quality }) => (
        <form {...formProps}>
          <Field label="Expected Cost" name="example-text">
            {({ fieldProps }) => (
              <Fragment>
                <Textfield
                  placeholder="What expected maximize project's cost?"
                  {...fieldProps}
                />
              </Fragment>
            )}
          </Field>
          <Field label="Expected Duration" name="example-text">
            {({ fieldProps }) => (
              <Fragment>
                <Textfield
                  placeholder="What expected maximize durations for completing project?"
                  {...fieldProps}
                />
              </Fragment>
            )}
          </Field>
          <RangeField label="Time" name="example-text" defaultValue={50}>
            {({ fieldProps }) => (
              <>
                <Range {...fieldProps} />
                <p>The current value is: {valueTime}</p>
              </>
            )}
          </RangeField>
          <RangeField label="Cost" name="example-text" defaultValue={50}>
            {({ fieldProps }) => (
              <>
                <Range {...fieldProps} />
              </>
            )}
          </RangeField>
          <RangeField label="Quality" name="example-text" defaultValue={50}>
            {({ quality }) => (
              <>
                <Range {...quality} />
              </>
            )}
          </RangeField>
          <FormFooter>
            <Button type="submit" appearance="primary">
              Schedule
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
  );
}
