import React from "react";
import ModalBase from "./ModalBase";
import { ModalContext } from "./ModalContext";
import ModalForm from "./ModalForm";
import ModalTitle from "./ModalTitle";
import ModalActions from "./ModalActions";
import ModalAction from "./ModalAction";
import ModalCancel from "./ModalCancel";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

type ModalComponents = {
  Form: typeof ModalForm;
  Title: typeof ModalTitle;
  Actions: typeof ModalActions;
  Action: typeof ModalAction;
  Cancel: typeof ModalCancel;
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

Modal.Form = ModalForm;
Modal.Title = ModalTitle;
Modal.Actions = ModalActions;
Modal.Action = ModalAction;
Modal.Cancel = ModalCancel;

export default Modal;
