/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ModalExample } from './ModalExample';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modal/ModalExample',
  component: ModalExample
} as ComponentMeta<typeof ModalExample>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalExample> = (args) => <ModalExample {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  title: 'Modal Title'
};
