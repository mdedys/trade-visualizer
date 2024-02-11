import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Button";

const meta: Meta<typeof Component> = {
  title: "Button",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Button: Story = {
  args: {
    variant: "secondary",
    size: "md",
  },
  render: args => <Component {...args}>Button</Component>,
};
