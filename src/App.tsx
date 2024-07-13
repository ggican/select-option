import { useState } from "react";
import Select from "./components/Form/Select";
import { OptionsType } from "./components/Form/Select/Select.types";

const FormControlSelect = () => {
  const [values, setValues] = useState<OptionsType | OptionsType[]>([
    {
      label: "Indonesia",
      value: "JP",
    },
  ]);
  const handleOnChange = (valuesOption: OptionsType | OptionsType[]) => {
    setValues(valuesOption);
  };
  return (
    <Select
      withSearch
      optionLabel="label"
      placeholder="Select Country"
      filterOption={(input, option: OptionsType) => {
        return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
      }}
      // portalId="select-id"
      defaultValue={values}
      onChange={handleOnChange}
      multiple
      options={[
        { value: "ID", label: "Indonesia" },
        { value: "JP", label: "Japan" },
        { value: "AL", label: "Albania" },
        { value: "DZ", label: "Algeria" },
        { value: "AD", label: "Andorra" },
        { value: "AO", label: "Angola" },
        { value: "AI", label: "Anguilla" },
        { value: "AG", label: "Antigua and Barbuda" },
        { value: "AR", label: "Argentina" },
        { value: "AM", label: "Armenia" },
        { value: "AW", label: "Aruba" },
      ]}
    />
  );
};

function App() {
  return (
    <>
      <div className="p-4 min-h-[100vh] flex justify-between flex-col">
        <FormControlSelect></FormControlSelect>
      </div>
      <div id="select-id"></div>
    </>
  );
}

export default App;
