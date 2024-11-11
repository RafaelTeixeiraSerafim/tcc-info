import { Box, FormControl } from "@mui/material";
import React, { CSSProperties } from "react";
import FormTitle from "./FormTitle";
import FormActions from "./FormActions";
import FormAction from "./FormAction";
import FormSubmitButton from "./FormSubmitButton";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  style?: CSSProperties;
}

type FormComponents = {
  Title: typeof FormTitle;
  Actions: typeof FormActions;
  Action: typeof FormAction;
  SubmitButton: typeof FormSubmitButton;
};

const Form: React.FC<FormProps> & FormComponents = ({
  children,
  onSubmit,
  style,
}) => {
  return (
    <Box
      component={"form"}
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          ...style,
          width: "100%",
        }}
      >
        {children}
      </FormControl>
    </Box>
  );
};

Form.Title = FormTitle;
Form.Actions = FormActions;
Form.Action = FormAction;
Form.SubmitButton = FormSubmitButton;

export default Form;
