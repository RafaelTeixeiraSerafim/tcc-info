import { useCallback, useRef, useState } from "react";
import { IAuthErrors, IField } from "../../interfaces";
import FormContext from "./FormContext";

interface FormProviderProps {
  children: React.ReactNode;
}

export default function FormProvider({ children }: FormProviderProps) {
  const [inputs, setInputs] = useState<IField[]>([]);
  const [root, setRoot] = useState<IField>({ name: "root", error: "" });
  const [errors, setErrors] = useState<IAuthErrors | null>(null);
  const [loading, setLoading] = useState(false);
  const abortController = useRef(new AbortController());

  const registerInput = useCallback((name: string) => {
    setInputs((prevFields) => [...prevFields, { name, error: "" }]);
  }, []);

  const newError = (name: string, message: string) => {
    let field;
    if (name === "root") setRoot({ ...root, error: message });
    else {
      field = inputs.find((field) => field.name === name);
      console.log("Novo erro: ", field, message);
      if (!field) return;
      console.log("Really new error: ", field.name, message);

      setInputs([
        ...inputs.filter((field) => field.name !== name),
        { ...field, error: message },
      ]);
    }
  };

  const clearErrors = () => {
    setInputs((prevFields) =>
      prevFields.map((field) => {
        return {
          name: field.name,
          error: "",
        };
      })
    );
    setRoot({ ...root, error: "" });
  };

  const clearError = (name: string) => {
    console.log("Clearing error: ", name);
    setInputs((prevFields) =>
      prevFields.map((field) => {
        if (field.name === name)
          return {
            name: field.name,
            error: "",
          };
        else return field;
      })
    );
  };

  const initializeAbortController = () => {
    if (abortController.current) {
      abortController.current.abort(); // Cancel any ongoing request
    }
    abortController.current = new AbortController(); // Create a new controller
  };

  const registerErrors = useCallback((errors: IAuthErrors) => {
    setErrors(errors);
  }, []);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const endLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <FormContext.Provider
      value={{
        inputs,
        registerInput,
        newError,
        clearErrors,
        clearError,
        root,
        errors,
        registerErrors,
        loading,
        startLoading, 
        endLoading,
        abortController,
        initializeAbortController
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
