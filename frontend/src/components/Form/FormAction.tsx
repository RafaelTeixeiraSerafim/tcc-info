import { Button, ButtonProps } from "@mui/material";

type FormActionProps = ButtonProps;

export default function FormAction({ children, ...rest }: FormActionProps) {
  return (
    <Button
      sx={{
        flex: 1,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
