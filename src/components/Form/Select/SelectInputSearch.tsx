import { SelectInputSearchPropsType } from "./Select.types";

const SelectInputSearch = ({ inputSearchRef, onSearch }: SelectInputSearchPropsType) => {
  return (
    <>
      <div className="form--input-element relative block w-full border-b border-t">
        <div className="absolute top-0 left-0 pl-2 pr-2 bottom-0 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <input
          ref={inputSearchRef}
          onChange={onSearch}
          className="block w-full pl-[40px] p-2 outline-none"
          type="search"
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default SelectInputSearch;
