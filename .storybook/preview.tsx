import type { Preview } from "@storybook/react";
import React from "react";

import Theme from "../src/components/theme/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <>
        <Theme mode="light" />
        <Story />
      </>
    ),
  ],
};

export default preview;
