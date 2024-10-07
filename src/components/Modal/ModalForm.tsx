import React from "react";
import Form from "../Form";

interface ModalFormProps {
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ModalForm({ children, handleSubmit }: ModalFormProps) {
  return <Form handleSubmit={handleSubmit}>{children}</Form>;
}
