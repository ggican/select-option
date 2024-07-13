import classNames from "classnames";
import { defaultProps, INPUT_SIZE, InputPropsType } from "./Input.types";

const Input = (props: InputPropsType) => {
  const propsWithDefaults = {
    ...defaultProps,
    ...props,
  };

  const { name, type, size, block } = propsWithDefaults;

  const inputClasses = classNames(
    `inline-flex border bg-white rounded-md ${INPUT_SIZE[size as "sm" | "md" | "lg"]}`,
    {
      "w-full block": block,
    },
  );

  const parentInputClasses = classNames(`inline-flex border bg-white rounded-md`, {
    "w-full block": block,
  });

  return (
    <div className={parentInputClasses}>
      <input className={inputClasses} type={type} name={name} />
    </div>
  );
};

export default Input;
