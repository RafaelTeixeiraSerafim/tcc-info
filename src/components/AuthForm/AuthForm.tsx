import React from "react";
import Form from "../Form";
import AuthFormTitle from "./AuthFormTitle";
import AuthFormActions from "./AuthFormActions";
import AuthFormContent from "./AuthFormContent";
import AuthFormInput from "./AuthFormInput";
import AuthFormSubmitButton from "./AuthFormSubmitButton";

interface AuthFormProps {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

type AuthFormComponents = {
  Title: typeof AuthFormTitle;
  Actions: typeof AuthFormActions;
  Content: typeof AuthFormContent;
  Input: typeof AuthFormInput;
  SubmitButton: typeof AuthFormSubmitButton;
};

const AuthForm: React.FC<AuthFormProps> & AuthFormComponents = ({
  children,
  handleSubmit,
}: AuthFormProps) => {
  return (
    <Form handleSubmit={handleSubmit} style={{ gap: "3rem" }}>
      {children}
    </Form>
  );
};

AuthForm.Actions = AuthFormActions;
AuthForm.Content = AuthFormContent;
AuthForm.Input = AuthFormInput;
AuthForm.Title = AuthFormTitle;
AuthForm.SubmitButton = AuthFormSubmitButton;

export default AuthForm;
