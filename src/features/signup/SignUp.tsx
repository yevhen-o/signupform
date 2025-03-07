import "./SignUpUseForm.scss";

import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Button from "src/shared/Button";
import InputField from "src/shared/formFields/InputField";
import { signUpSchema } from "./PasswordValidationSchemas";
import PasswordValidationHelper from "./PasswordValidationHelper";

type FormValues = z.infer<typeof signUpSchema>;

type FormFieldsType = {
  name: keyof FormValues;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
};

const SignUp: React.FC = () => {
  const initialValues = {
    first_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const formFields: FormFieldsType[] = [
    { name: "first_name", placeholder: "Your name" },
    {
      name: "email",
      placeholder: "your_email@example.com",
      autoComplete: "off",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Strong password",
      autoComplete: "new-password",
    },
    {
      name: "confirm_password",
      type: "password",
      placeholder: "Repeat your password",
    },
  ];

  const submitFunction: SubmitHandler<FormValues> = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmittedData(data);
        resolve(true);
      }, 5 * 1000);
    });
  };

  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const passwordValue = watch("password");

  const handleBlur = (field: keyof FormValues) =>
    setTouchedFields((prev) => ({ ...prev, [field]: true }));

  return (
    <div className="signup__wrapper">
      <h2 className="signup__title">Sigh Up</h2>
      <form onSubmit={handleSubmit(submitFunction)} className="signup__form">
        {formFields.map(({ name, ...rest }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field: { onBlur, ...restFieldsProps } }) => (
              <>
                <InputField
                  {...rest}
                  {...restFieldsProps}
                  onBlur={() => {
                    onBlur();
                    handleBlur(name);
                  }}
                  errorMessage={errors[name]?.message}
                  isTouched={touchedFields[name]}
                  isDirty={dirtyFields[name]}
                  isErrorMessageHidden={name === "password"}
                />
                {name === "password" && (
                  <PasswordValidationHelper
                    isTouched={touchedFields[name]}
                    value={passwordValue}
                  />
                )}
              </>
            )}
          />
        ))}
        <Button
          isPrimary
          type="submit"
          className="signup__button"
          disabled={isSubmitting}
          onClick={() =>
            setTouchedFields(
              formFields.reduce(
                (acc, field) => ({ ...acc, [field.name]: true }),
                {}
              )
            )
          }
        >
          {isSubmitting ? "Submitting" : "Sing Up"}
        </Button>
      </form>
      {submittedData && <pre>{JSON.stringify(submittedData, null, 2)}</pre>}
    </div>
  );
};

export default SignUp;
