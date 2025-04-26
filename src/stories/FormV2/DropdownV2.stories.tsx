/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import { DropdownV2Example } from './DropdownV2Example';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FormV2/DropdownV2',
  component: DropdownV2Example
} as ComponentMeta<typeof DropdownV2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropdownV2> = (args) => <DropdownV2 {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  loading: false,
  label: 'Example Field',
  name: 'dropdownV2',
  options: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' }
  ]
};
