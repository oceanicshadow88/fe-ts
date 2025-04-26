/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputV2Example } from './InputV2Example';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FormV2/InputV2',
  component: InputV2Example
} as ComponentMeta<typeof InputV2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputV2> = (args) => <InputV2 {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  loading: false,
  label: 'Example Field',
  dataTestId: 'example-test'
};
