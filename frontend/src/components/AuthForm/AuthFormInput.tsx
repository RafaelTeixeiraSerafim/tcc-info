import { TextField, TextFieldProps } from "@mui/material";

export default function AuthFormInput({ ...props }: TextFieldProps) {
  return (
    <TextField
      // placeholder="Senha"
      // name="password"
      // value={props.password}
      // onChange={handleChange}
      variant="standard"
      fullWidth
      {...props}
    />
  );
}
