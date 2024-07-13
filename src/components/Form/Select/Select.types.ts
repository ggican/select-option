import { ChangeEvent, MouseEvent, RefObject } from "react";

type SIZE_VARIANT = "sm" | "md" | "lg";

export type OptionsType = {
  value: string;
  [key: string]: string;
};

export type SelectPropsType = {
  id?: string;
  name?: string;
  portalId?: string;
  type?: string;
  size?: SIZE_VARIANT;
  block?: boolean;
  multiple?: boolean;
  withSearch?: boolean;
  optionLabel: string;
  placeholder?: string;
  options: OptionsType[];
  filterOption?: (input: string, option: OptionsType) => boolean;
  onRenderOption?: (values: OptionsType) => React.ReactNode;
};

export type SelectPlaceHolderProps = {
  valuesOption: OptionsType[];
  handleCloseSelected: (e: MouseEvent<HTMLButtonElement>, item: OptionsType) => void;
  optionLabel: string;
  placeholder?: string;
  multiple?: boolean;
};

export type SelectOptionContainerPropsType = {
  withSearch?: boolean;
  targetRef: RefObject<HTMLDivElement>;
  inputSearchRef: RefObject<HTMLInputElement>;
  elementPosition: React.CSSProperties;
  handleOnClickOption: (event: MouseEvent<HTMLDivElement>, item: OptionsType) => void;
  valuesOption: OptionsType[];
} & SelectOptionPropsType &
  SelectInputSearchPropsType;

export type SelectOptionPropsType = {
  handleOnClickOption: (e: MouseEvent<HTMLSpanElement>, item: OptionsType) => void;
  searchValue: string;
  options: OptionsType[];
  valuesOption: OptionsType[];
  optionLabel: string;
  onRenderOption?: (values: OptionsType) => React.ReactNode;
};

export type SelectInputSearchPropsType = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  inputSearchRef: RefObject<HTMLInputElement>;
};

export const SELECT_SIZE: Record<SIZE_VARIANT, string> = {
  sm: "px-1.5 py-2 text-sm",
  md: "px-2.5 py-3 text-base",
  lg: "px-3.5 py-4 text-lg",
};

export const defaultProps: Partial<SelectPropsType> = {
  name: "input",
  type: "text",
  optionLabel: "label",
  placeholder: "Dropdown Form",
  size: "md",
  block: false,
  withSearch: false,
  multiple: false,
  options: [],
};
