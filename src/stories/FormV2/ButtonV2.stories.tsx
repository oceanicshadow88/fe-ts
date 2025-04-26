import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonV2Example } from './ButtonV2Example';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FormV2/ButtonV2',
  component: ButtonV2Example,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ButtonV2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonV2> = (args) => <ButtonV2 {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  fill: false,
  disabled: false,
  loading: false,
  danger: false,
  size: 'md',
  text: 'Button',
  dataTestId: 'button-test'
};
