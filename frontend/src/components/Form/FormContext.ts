import { createContext } from "react";
import { IAuthErrors, IField } from "../../interfaces";

interface IFormContext {
  inputs: IField[];
  registerInput: (name: string) => void;
  newError: (name: string, message: string) => void;
  clearErrors: () => void;
  clearError: (name: string) => void;
  root: IField;
  errors: IAuthErrors | null;
  registerErrors: (errors: IAuthErrors) => void;
  loading: boolean;
  startLoading: () => void;
  endLoading: () => void;
  abortController: React.MutableRefObject<AbortController>;
  initializeAbortController: () => void;
}

const FormContext = createContext<IFormContext | null>(null);

export default FormContext;
