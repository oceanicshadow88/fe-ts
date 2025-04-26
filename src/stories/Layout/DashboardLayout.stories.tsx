/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardLayoutExample } from './DashboardLayoutExample';
import DashboardLayout from '../../lib/Layout/DashboardLayout/DashboardLayout';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/DashboardLayout',
  component: DashboardLayoutExample
} as ComponentMeta<typeof DashboardLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DashboardLayout> = () => (
  <BrowserRouter>
    <DashboardLayout />
  </BrowserRouter>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
