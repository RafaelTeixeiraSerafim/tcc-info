import { ButtonProps } from "@mui/material";
import Form from "./Form";
import useFormContext from "./useFormContext";

type FormCancelButtonProps = ButtonProps;

export default function FormCancelButton({
  onClick,
  ...rest
}: FormCancelButtonProps) {
  const { abortController } = useFormContext();

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Submission process aborted.");
    abortController.current.abort();
    onClick?.(e);
  };

  return (
    <Form.Action variant="outlined" onClick={handleCancel} {...rest}>
      Cancelar
    </Form.Action>
  );
}
