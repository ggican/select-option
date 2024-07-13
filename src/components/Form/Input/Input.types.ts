type SIZE_VARIANT = "sm" | "md" | "lg";

export type InputPropsType = {
  name?: string;
  type?: string;
  size?: SIZE_VARIANT;
  block?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
};

export const INPUT_SIZE: { [key in SIZE_VARIANT]: string } = {
  sm: "px-1.5 py-2 text-sm",
  md: "px-2.5 py-3 text-base",
  lg: "px-3.5 py-4 text-lg",
};

export const defaultProps: Partial<InputPropsType> = {
  name: "input",
  type: "text",
  size: "md",
  block: false,
};
