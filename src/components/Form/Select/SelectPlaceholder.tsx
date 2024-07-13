import { OptionsType, SelectPlaceHolderProps } from "./Select.types";
import { SINGLE_KEY_SELECTED_NUMBER } from "./Select";

const SelectPlaceholder = ({
  valuesOption,
  handleCloseSelected,
  optionLabel,
  placeholder,
  multiple,
}: SelectPlaceHolderProps) => {
  return (
    <>
      <div className="flex items-center w-full relative py-[5px] px-[12px] min-h-[40px]">
        {valuesOption && valuesOption && valuesOption?.length > 0 ? (
          <>
            {multiple ? (
              <ul className="block w-full pr-[40px]">
                {valuesOption &&
                  valuesOption.length > 0 &&
                  valuesOption?.map((item: OptionsType, key: number) => {
                    return (
                      <li
                        key={key}
                        className="inline-flex mr-[10px] items-center rounded-full bg-slate-50 py-1 px-2"
                      >
                        <span className="text-[14px] mr-2 text-gray-600">{item[optionLabel]}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            handleCloseSelected(e, item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <span>
                {valuesOption &&
                  valuesOption &&
                  valuesOption?.length > 0 &&
                  valuesOption[SINGLE_KEY_SELECTED_NUMBER]?.[optionLabel]}
              </span>
            )}
          </>
        ) : (
          <span className="block w-full text-gray-400">{placeholder}</span>
        )}
        <div className="absolute top-0 bottom-0 right-0 pr-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default SelectPlaceholder;
