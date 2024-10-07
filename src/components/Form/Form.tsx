import { Box, FormControl } from "@mui/material";
import React, { CSSProperties } from "react";
import FormTitle from "./FormTitle";
import FormActions from "./FormActions";
import FormAction from "./FormAction";

interface FormProps {
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  style?: CSSProperties;
}

type FormComponents = {
  Title: typeof FormTitle;
  Actions: typeof FormActions;
  Action: typeof FormAction;
};

const Form: React.FC<FormProps> & FormComponents = ({
  children,
  handleSubmit,
  style,
}) => {
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
      style={style}
    >
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "inherit",
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

export default Form;
