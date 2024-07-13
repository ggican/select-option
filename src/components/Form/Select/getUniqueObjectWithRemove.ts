import type { OptionsType } from "./Select.types";

export const getUniqueObjectWithRemove = (
  array: OptionsType[],
  objectToAdd: OptionsType,
  multiple?: boolean,
) => {
  if (!multiple) {
    return [objectToAdd];
  }
  const isSelected = array.some((item) => item?.value === objectToAdd?.value);

  if (isSelected) {
    return array.filter((item) => item.value !== objectToAdd.value);
  } else {
    return [...array, objectToAdd];
  }
};
