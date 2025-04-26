/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextAreaV2 from '../../lib/FormV2/TextAreaV2/TextAreaV2';
import { TextAreaV2Example } from './TextAreaV2Example';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FormV2/TextAreaV2',
  component: TextAreaV2Example
} as ComponentMeta<typeof TextAreaV2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextAreaV2> = (args) => <TextAreaV2 {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  loading: false,
  label: 'Example Field',
  dataTestId: 'example-test',
  defaultValue: '',
  name: ''
};
