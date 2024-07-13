import { defaultProps, OptionsType, SelectPropsType } from "./Select.types";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import useScreenSize from "../../../hooks/usScreenSize";
import SelectOptionContainer from "./SelectOptionContainer";
import {
  DetectBottomPositionResultType,
  useOnDetectBottomPosition,
} from "../../../hooks/useOnDetectBottomPosition";
import { getUniqueObjectWithRemove } from "./getUniqueObjectWithRemove";

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
    onChange,
    defaultValue,
  } = propsWithDefaults;
  const screenSize = useScreenSize();

  const [isDisplayDropdown, setDisplayDropdown] = useState<boolean>(false);
  const [optionsData, setOptionsData] = useState<OptionsType[]>([]);
  const [elementPosition, setElementPosition] = useState<React.CSSProperties>({});
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [valuesOption, setValuesOption] = useState<OptionsType[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const positionSelectForm: DetectBottomPositionResultType = useOnDetectBottomPosition(dropdownRef);

  useOnClickOutside(dropdownRef, (event) => {
    if (targetRef.current?.contains(event.target as Node)) return;
    if (dropdownRef.current?.contains(event.target as Node)) return;
    setDisplayDropdown?.(false);
  });

  const handleClickSelectArea = (isClick?: boolean, position?: string) => {
    if (dropdownRef?.current) {
      const element: DOMRect = dropdownRef.current.getBoundingClientRect();

      const coordinate: React.CSSProperties = {
        width: element.width ?? "auto",
        position: portalId === undefined || portalId === "" ? "absolute" : "fixed",
        zIndex: Z_INDEX_DROPDOWN,
        borderRadius: BORDER_RADIUS,
        flexDirection: "column",
        display: "flex",
      };

      if (portalId === undefined || portalId === "") {
        if (position === "BOTTOM") {
          coordinate.bottom = "auto";
          coordinate.top = "100%";
          coordinate.flexDirection = "column";
        }
        if (position === "TOP") {
          coordinate.bottom = "100%";
          coordinate.top = "auto";
          coordinate.flexDirection = "column-reverse";
        }
      } else {
        if (isClick) {
          coordinate.top = element.top + element.height + TOP_POSITION_PLUS - 10;
          // if (position === "BOTTOM") {
          //   coordinate.top = element.top + element.height + TOP_POSITION_PLUS - 10;
          // } else {
          //   const topPosition =
          //     element.top - MAX_HEIGHT_DROPDOWN - TOP_POSITION_PLUS - element.height + 50;
          //   coordinate.top = withSearch ? topPosition - element.height : topPosition;
          // }
        }
      }

      if (portalId === undefined || portalId === "") {
        coordinate.left = 0;
        coordinate.right = 0;
      } else {
        coordinate.left = element.left ?? "auto";
        coordinate.right = element.right ?? "auto";
      }

      setElementPosition(coordinate);
      if (isClick) {
        setDisplayDropdown(true);
      }
    }
  };

  const onHandleSetValueOption = (item: OptionsType) => {
    setValuesOption((prevState: OptionsType[]) => {
      return getUniqueObjectWithRemove(prevState, item, multiple);
    });
    if (!multiple) {
      setDisplayDropdown(false);
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
      document.addEventListener("scroll", () => handleClickSelectArea(false, positionSelectForm));
    }
    return () => {
      setOptionsData([]);
      document.removeEventListener("scroll", () =>
        handleClickSelectArea(false, positionSelectForm),
      );
    };
    // eslint-disable-next-line
  }, [isDisplayDropdown, positionSelectForm]);

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
    // eslint-disable-next-line
  }, [searchInputValue, options]);

  useEffect(() => {
    if (multiple) {
      onChange?.(valuesOption);
    } else {
      onChange?.(valuesOption[0]);
    }
    // eslint-disable-next-line
  }, [valuesOption]);

  useEffect(() => {
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        setValuesOption(defaultValue);
      } else {
        setValuesOption(defaultValue?.value === "" ? [] : [defaultValue]);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={() => handleClickSelectArea(true, positionSelectForm)}
        className="block w-full relative"
      >
        <div className="select-form border bg-white rounded-md block w-full  min-h-[40px]">
          <div className="flex items-center w-full relative py-[5px] px-[12px] min-h-[40px]">
            {valuesOption && valuesOption && valuesOption?.length > 0 ? (
              <>
                {multiple ? (
                  <ul className="flex w-full pr-[40px] flex-wrap flex-row">
                    {valuesOption &&
                      valuesOption.length > 0 &&
                      valuesOption?.map((item: OptionsType, key: number) => {
                        return (
                          <li
                            key={key}
                            className="inline-flex mr-[5px] items-center rounded-full bg-slate-50 py-1 px-2"
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
          <div id="scrollArea">
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
      </div>
    </>
  );
};

export default Select;
