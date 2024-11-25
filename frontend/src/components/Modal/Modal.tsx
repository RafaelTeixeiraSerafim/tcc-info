import React, { CSSProperties } from "react";
import ModalBase from "./ModalBase";
import { ModalContext } from "./ModalContext";
import ModalTitle from "./ModalTitle";
import ModalCancelButton from "./ModalCancelButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
}

type ModalComponents = {
  Title: typeof ModalTitle;
  CancelButton: typeof ModalCancelButton;
};

const Modal: React.FC<ModalProps> & ModalComponents = ({
  isOpen,
  onClose,
  children,
  style,
}) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <ModalBase isOpen={isOpen} onClose={onClose} style={style}>
        {children}
      </ModalBase>
    </ModalContext.Provider>
  );
};

Modal.Title = ModalTitle;
Modal.CancelButton = ModalCancelButton;

export default Modal;
