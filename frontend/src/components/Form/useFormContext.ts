import { useContext } from "react";
import FormContext from "./FormContext";

export default function useFormContext() {
  const context = useContext(FormContext);

  if (!context)
    throw new Error(
      "useFormContext has to be used inside a FormProvider"
    );

  return context;
}
