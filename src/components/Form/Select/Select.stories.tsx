import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { OptionsType } from "./Select.types";

const meta = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  //   args: { onClick: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectDefault: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    optionLabel: "label",
    options: [
      {
        value: "123123123123",
        label: "Long Long",
      },
      {
        value: "123123123",
        label: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        label: "tiga ratus",
      },
      {
        value: "123123",
        label: "tiga Pas Ma",
      },
      {
        value: "1213",
        label: "tiga Pas Terbaik",
      },
      {
        value: "jakarta",
        label: "Jakarta",
      },
    ],
  },
};

export const SelectOptionLabel: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};

export const SelectDropdownMultiple: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    multiple: true,
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
      {
        value: "123112323123",
        name: "tiga Pas Ma",
      },
      {
        value: "1213",
        name: "tiga Pas Terbaik",
      },
      {
        value: "jakarta",
        name: "Jakarta",
      },
    ],
  },
};

export const SelectDropdownWithSearch: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    withSearch: true,
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};

export const SelectDropdownWithSearchMultiple: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    withSearch: true,
    multiple: true,
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};

export const SelectOnRenderElementOptions: Story = {
  decorators: [
    (Story) => (
      <div className="h-96">
        <Story />
      </div>
    ),
  ],
  args: {
    name: "input",
    type: "text",
    size: "md",
    withSearch: true,
    multiple: true,
    optionLabel: "name",
    onRenderOption: (values: OptionsType) => {
      return `${values?.name} <> <> TESTING`;
    },
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};

export const SelectOnFilterOption: Story = {
  render: (args) => {
    return (
      <Select
        {...args}
        filterOption={(input, option: OptionsType) => {
          return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
        }}
      />
    );
  },
  args: {
    name: "input",
    type: "text",
    size: "md",
    withSearch: true,
    multiple: true,
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};

export const SelectDropdownUsePortal: Story = {
  args: {
    name: "input",
    type: "text",
    size: "md",
    withSearch: true,
    multiple: true,
    optionLabel: "name",
    options: [
      {
        value: "123123123123",
        name: "Long Long",
      },
      {
        value: "123123123",
        name: "Long Long tiga ratus",
      },
      {
        value: "123123123as",
        name: "tiga ratus",
      },
    ],
  },
};
