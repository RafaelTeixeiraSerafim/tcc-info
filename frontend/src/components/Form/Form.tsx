import React, { CSSProperties } from "react";
import { IAuthErrors } from "../../interfaces";
import FormAction from "./FormAction";
import FormActions from "./FormActions";
import FormBase from "./FormBase";
import FormProvider from "./FormProvider";
import FormSubmitButton from "./FormSubmitButton";
import FormTitle from "./FormTitle";
import FormInputs from "./FormInputs";
import FormInput from "./FormInput";
import FormCancelButton from "./FormCancelButton";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement> , signal: AbortSignal) => Promise<void> | void;
  errors?: IAuthErrors;
  style?: CSSProperties;
}

type FormComponents = {
  Title: typeof FormTitle;
  Actions: typeof FormActions;
  Action: typeof FormAction;
  SubmitButton: typeof FormSubmitButton;
  CancelButton: typeof FormCancelButton;
  Inputs: typeof FormInputs;
  Input: typeof FormInput;
};

const Form: React.FC<FormProps> & FormComponents = ({
  children,
  onSubmit,
  style,
  errors,
}) => {
  return (
    <FormProvider>
      <FormBase onSubmit={onSubmit} style={style} errors={errors}>
        {children}
      </FormBase>
    </FormProvider>
  );
};

Form.Title = FormTitle;
Form.Actions = FormActions;
Form.Action = FormAction;
Form.SubmitButton = FormSubmitButton;
Form.CancelButton = FormCancelButton;
Form.Inputs = FormInputs;
Form.Input = FormInput;

export default Form;
