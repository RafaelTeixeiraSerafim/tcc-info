import React from "react";
import ModalBase from "./ModalBase";
import { ModalContext } from "./ModalContext";
import ModalTitle from "./ModalTitle";
import ModalCancelButton from "./ModalCancelButton";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

type ModalComponents = {
  Title: typeof ModalTitle;
  CancelButton: typeof ModalCancelButton
};

const Modal: React.FC<ModalProps> & ModalComponents = ({
  isOpen,
  handleClose,
  children,
}) => {
  return (
    <ModalContext.Provider value={{ isOpen, handleClose }}>
      <ModalBase isOpen={isOpen} handleClose={handleClose}>
        {children}
      </ModalBase>
    </ModalContext.Provider>
  );
};

Modal.Title = ModalTitle;
Modal.CancelButton = ModalCancelButton

export default Modal;
