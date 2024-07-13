import React from "react";
import type { Preview } from "@storybook/react";
import MainProviders from "../src/providers/MainProviders";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MainProviders>
        <Story />
      </MainProviders>
    ),
  ],
};

export default preview;
