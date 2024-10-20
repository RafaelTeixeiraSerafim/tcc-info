import React from "react";
import Form from "../Form";

interface AuthFormSubmitButtonProps {
  children: React.ReactNode;
}

export default function AuthFormSubmitButton({
  children,
}: AuthFormSubmitButtonProps) {
  return <Form.SubmitButton>{children}</Form.SubmitButton>;
}
