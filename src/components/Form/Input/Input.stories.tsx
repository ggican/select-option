import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  //   args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputDefault: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
  },
};

export const InputNumber: Story = {
  args: {
    name: "input",
    type: "number",
    size: "md",
  },
};

export const SizeSmall: Story = {
  args: {
    name: "input",
    type: "number",
    size: "sm",
  },
};

export const SizeLarge: Story = {
  args: {
    name: "input",
    type: "number",
    size: "lg",
  },
};

export const InputBlock: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    block: true,
  },
};
