import { createContext, useContext } from "react";

interface ModalContext {
  isOpen: boolean;
  handleClose: () => void;
}

const ModalContext = createContext<ModalContext | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
};

export { ModalContext, useModalContext };
