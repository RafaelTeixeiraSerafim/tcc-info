import React from "react";
import Form from "../Form";

interface AuthFormTitleProps {
  children: React.ReactNode;
}

export default function AuthFormTitle({ children }: AuthFormTitleProps) {
  return <Form.Title variant="h2">{children}</Form.Title>;
}
