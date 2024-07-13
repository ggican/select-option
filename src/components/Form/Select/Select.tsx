import { defaultProps, OptionsType, SelectPropsType } from "./Select.types";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import useScreenSize from "../../../hooks/usScreenSize";
import SelectOptionContainer from "./SelectOptionContainer";

export const MAX_HEIGHT_DROPDOWN = 250;
export const Z_INDEX_DROPDOWN = 1100;
export const TOP_POSITION_PLUS = 10;
export const BORDER_RADIUS = 8;
export const SINGLE_KEY_SELECTED_NUMBER = 0;

const Select = (props: SelectPropsType) => {
  const propsWithDefaults = {
    ...defaultProps,
    ...props,
  };
  const {
    placeholder,
    options,
    optionLabel,
    multiple,
    withSearch,
    portalId,
    onRenderOption,
    filterOption,
  } = propsWithDefaults;
  const screenSize = useScreenSize();

  const [isDisplayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [optionsData, setOptionsData] = useState<OptionsType[]>([]);
  const [elementPosition, setElementPosition] = useState<React.CSSProperties>({});
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [valuesOption, setValuesOption] = useState<OptionsType[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(dropdownRef, (event) => {
    if (targetRef.current?.contains(event.target as Node)) return;
    if (dropdownRef.current?.contains(event.target as Node)) return;
    setDisplayDropdown?.(false);
  });

  const handleClickSelectArea = (isClick?: boolean) => {
    if (isClick && isDisplayDropdown) {
      return true;
    }
    if (dropdownRef?.current) {
      const element = dropdownRef.current.getBoundingClientRect();
      const windowsHeight = window.innerHeight;
      const bottom = element.bottom;
      const calculatePercentageTop = (bottom / windowsHeight) * 100;

      const coordinate: React.CSSProperties = {
        width: element.width ?? "auto",
        position: portalId === undefined || portalId === "" ? "absolute" : "fixed",
        zIndex: Z_INDEX_DROPDOWN,
        borderRadius: BORDER_RADIUS,
      };

      if (calculatePercentageTop < 65) {
        coordinate.top =
          portalId === undefined || portalId === ""
            ? element.top + element.height + TOP_POSITION_PLUS - 10
            : element.top + element.height + TOP_POSITION_PLUS + 2;
      } else {
        coordinate.top =
          portalId === undefined || portalId === ""
            ? element.top - MAX_HEIGHT_DROPDOWN - TOP_POSITION_PLUS - element.height + 10
            : element.height + TOP_POSITION_PLUS - 5;
      }

      if (portalId === undefined || portalId === "") {
        coordinate.left = 0;
        coordinate.right = 0;
      } else {
        coordinate.left = element.left ?? "auto";
        coordinate.right = element.right ?? "auto";
      }

      setElementPosition(coordinate);
      setDisplayDropdown(true);
    }
  };

  const onHandleSetValueOption = (item: OptionsType) => {
    setValuesOption((prevState: OptionsType[]) => {
      return addUniqueObjectWithRemove(prevState, item);
    });
    if (!multiple) {
      setDisplayDropdown(false);
    }
  };
  const addUniqueObjectWithRemove = (array: OptionsType[], objectToAdd: OptionsType) => {
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

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchInputValue(value);
  };

  const handleOnClickOption = (e: MouseEvent<HTMLSpanElement>, item: OptionsType) => {
    e.stopPropagation();
    e.preventDefault();
    onHandleSetValueOption(item);
  };

  const handleCloseSelected = (e: React.MouseEvent<HTMLButtonElement>, item: OptionsType) => {
    e.stopPropagation();
    e.preventDefault();
    onHandleSetValueOption(item);
  };

  useEffect(() => {
    setDisplayDropdown?.(false);
  }, [screenSize]);

  useEffect(() => {
    if (isDisplayDropdown) {
      setOptionsData(options);
      if (inputSearchRef?.current) {
        inputSearchRef?.current?.focus();
      }
      document.addEventListener("wheel", () => handleClickSelectArea(false));
    }
    return () => {
      setOptionsData([]);
      document.removeEventListener("wheel", () => handleClickSelectArea(false));
    };
  }, [isDisplayDropdown]);

  useEffect(() => {
    if (filterOption) {
      if (isDisplayDropdown && searchInputValue.length > 0) {
        setOptionsData(
          options.filter((item) => {
            return filterOption?.(searchInputValue, {
              ...item,
              label: item[optionLabel],
            });
          }),
        );
      } else {
        setOptionsData(options);
      }
    }
    return () => {
      setOptionsData(options);
    };
  }, [searchInputValue, options]);

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={() => handleClickSelectArea(true)}
        className="block w-full relative"
      >
        <div className="select-form border bg-white rounded-md block w-full  min-h-[40px]">
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
                            <span className="text-[14px] mr-2 text-gray-600">
                              {item[optionLabel]}
                            </span>
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
          {portalId === undefined || portalId === ""
            ? isDisplayDropdown && (
                <SelectOptionContainer
                  onRenderOption={onRenderOption}
                  targetRef={targetRef}
                  elementPosition={elementPosition}
                  inputSearchRef={inputSearchRef}
                  withSearch={withSearch}
                  onSearch={handleOnChangeSearch}
                  searchValue={searchInputValue}
                  options={optionsData}
                  valuesOption={valuesOption}
                  optionLabel={optionLabel}
                  handleOnClickOption={handleOnClickOption}
                />
              )
            : isDisplayDropdown && (
                <SelectOptionContainer
                  onRenderOption={onRenderOption}
                  targetRef={targetRef}
                  elementPosition={elementPosition}
                  inputSearchRef={inputSearchRef}
                  withSearch={withSearch}
                  onSearch={handleOnChangeSearch}
                  searchValue={searchInputValue}
                  options={optionsData}
                  valuesOption={valuesOption}
                  optionLabel={optionLabel}
                  handleOnClickOption={handleOnClickOption}
                />
              )}
        </div>
      </div>
    </>
  );
};

export default Select;
