# Select Option

This Repo demonstrates a customized Select component with filtering options based on input text.

## Deploy To Website

- [CHROMATIC](https://www.chromatic.com/component?appId=6691f8d852b1d32f0c8c5a01&csfId=form-select--select-option-label&buildNumber=3&k=6691ffbf6f3d377867f41c2b-1200px-interactive-true&h=20&b=-2)
- [Storybook](https://select-option-beta.vercel.app/)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Storybook

#### `npm run storybook`

Runs Storybook in development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

#### `npm run build-storybook`

Builds Storybook for production to the `storybook-static` folder.

### Code Quality

#### `npm run lint`

Runs ESLint.

#### `npm run lint:fix`

Runs ESLint and fixes issues.

#### `npm run format`

Checks formatting using Prettier.

#### `npm run format:fix`

Formats files using Prettier.

#### `npm run type-check`

Checks TypeScript types.

### Continuous Integration

#### `npm run test:ci`

Runs tests with coverage.

#### `npm run check-all`

Runs type-check, linting, and formatting checks.

### Chromatic

#### `npm run chromatic`

Runs Chromatic for UI component testing.

## Usage

In your React application, you can render the `SelectOnFilterOption` Story component. It provides a Select component with the following props:


- `size`: Specifies the size of the Select component.
- `withSearch`: Enables search functionality within the Select component.
- `portalId`: Enables portalId functionality within the Select component.
- `multiple`: Allows multiple selections.
- `optionLabel`: Defines the label for the options.
- `options`: An array of objects representing selectable options.

### Example

```jsx
export const Default = () => <Select  
    name="input" 
    type="text" 
    optionLabel="label" 
    placeholder="Dropdown Form" 
    size="md" 
    options={[]}  
/>;
```

### Description

The `SelectO` Story demonstrates a customized `Select` component from your library with enhanced filtering capabilities based on user input. Key features include:

- **Custom Filter Functionality:** The `filterOption` prop is used to customize how options are filtered based on user input.
- **Multiple Selection:** Enables users to select multiple options simultaneously (`multiple: true`).
- **Search Functionality:** Includes a search input within the Select component (`withSearch: true`) for easy option discovery.
- **Example Options:** Displays a set of example options with varying lengths and labels for testing the filtering functionality.

This repo is useful for scenarios where you need a Select component with advanced filtering and multi-selection capabilities, tailored to fit specific user interaction patterns in your application.


