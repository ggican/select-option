import SelectOption from "./SelectOption";
import SelectInputSearch from "./SelectInputSearch";
import { SelectOptionContainerPropsType } from "./Select.types";

const SelectOptionContainer = ({
  targetRef,
  elementPosition,
  inputSearchRef,
  onSearch,
  searchValue,
  options,
  optionLabel,
  handleOnClickOption,
  valuesOption,
  withSearch,
  onRenderOption,
}: SelectOptionContainerPropsType) => {
  return (
    <>
      <div
        ref={targetRef}
        style={elementPosition}
        className="select-form--input-search shadow-lg block bg-white"
      >
        {withSearch && <SelectInputSearch inputSearchRef={inputSearchRef} onSearch={onSearch} />}
        <SelectOption
          onRenderOption={onRenderOption}
          searchValue={searchValue}
          options={options}
          valuesOption={valuesOption}
          optionLabel={optionLabel}
          handleOnClickOption={handleOnClickOption}
        ></SelectOption>
      </div>
    </>
  );
};

export default SelectOptionContainer;
