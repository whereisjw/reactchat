import React, { FC } from 'react';
import { CloseModalButton, CreateModal } from './styles';

interface props {
  show: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}
const Modal: FC<props> = ({ show, children, closeModal }) => {
  const stopPropagation = (e: any) => {
    e.stopPropagation;
  };

  if (!show) {
    return null;
  }

  return (
    <CreateModal>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={closeModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
