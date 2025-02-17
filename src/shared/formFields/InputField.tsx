import { forwardRef, HTMLProps, Ref, useState } from "react";
import classNames from "classnames";
import "./InputField.scss";

import IconHidePassword from "./IconHidePassword";
import IconShowPassword from "./IconShowPassword";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  isTouched?: boolean;
  isDirty?: boolean;
  isErrorMessageHidden?: boolean;
}

const InputField = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      errorMessage,
      isTouched,
      isDirty,
      isErrorMessageHidden = false,
      type,
      ...inputProps
    } = props;

    const [fieldType, setFieldType] = useState<string | undefined>(type);

    return (
      <div
        className={classNames("field_wrapper", {
          "field_wrapper--error": errorMessage && isTouched,
          "field_wrapper--success": !errorMessage && isDirty,
        })}
      >
        {label && <label htmlFor={inputProps.name}>{label}</label>}
        <input {...inputProps} ref={ref} type={fieldType} />
        {type === "password" && (
          <span
            className="field_wrapper__toggle"
            role="button"
            // in general not good idea to use whatever instead button, but implement nice button component to handle all cases take extra time.
            onClick={() =>
              setFieldType((prev) =>
                prev === "password" ? "text" : "password"
              )
            }
          >
            {fieldType === "password" ? (
              <IconHidePassword />
            ) : (
              <IconShowPassword />
            )}
          </span>
        )}
        {!isErrorMessageHidden && errorMessage && isTouched && (
          <small>{errorMessage}</small>
        )}
      </div>
    );
  }
);

export default InputField;
