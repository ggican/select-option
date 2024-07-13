import classNames from "classnames";
import { OptionsType, SelectOptionPropsType } from "./Select.types";

const MAX_HEIGHT_DROPDOWN = 250;

const SelectOption = ({
  handleOnClickOption,
  searchValue,
  options,
  valuesOption,
  optionLabel,
  onRenderOption,
}: SelectOptionPropsType) => {
  const onHighlightInputMatch = (item: string | undefined, keyword: string) => {
    if (!item || !keyword) return item;
    const lowerCasedInputValue = keyword.toLowerCase();
    const hitIndex = item.toLocaleLowerCase().indexOf(lowerCasedInputValue);
    if (hitIndex === -1) return item;
    const before = item.slice(0, hitIndex);
    const match = item.slice(hitIndex, hitIndex + keyword.length);
    const after = item.slice(hitIndex + keyword.length);
    return (
      <span>
        {before}
        <span className="bg-emerald-400">{match}</span>
        {after}
      </span>
    );
  };
  return (
    <>
      <div className={`block w-full overflow-auto max-h-[${MAX_HEIGHT_DROPDOWN}px]`}>
        {options && options.length > 0 ? (
          options?.map((item: OptionsType, key: number) => {
            return (
              <span
                key={`${key}-${item?.value}`}
                className={classNames(
                  "p-[12px] block w-full cursor-pointer hover:bg-emerald-100 first:rounded-t-md last:rounded-b-md",
                  {
                    "bg-emerald-200": valuesOption?.find(
                      (itemOption: OptionsType) => itemOption?.value === item.value,
                    ),
                  },
                )}
                onClick={(e) => handleOnClickOption(e, item)}
              >
                {onRenderOption
                  ? onRenderOption(item)
                  : onHighlightInputMatch(item[optionLabel], searchValue)}
              </span>
            );
          })
        ) : (
          <span
            className={`p-[12px] h-40 flex items-center justify-center w-full cursor-pointer rounded-md text-[20px] text-bold text-gray-400`}
          >
            No Data
          </span>
        )}
      </div>
    </>
  );
};

export default SelectOption;
