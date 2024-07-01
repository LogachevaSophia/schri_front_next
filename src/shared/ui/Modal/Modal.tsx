import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <button className={styles['modal-close-button']} onClick={onClose}>
          Закрыть
        </button>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

interface ModalWrapperProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalWrapper: FC<ModalWrapperProps> = ({ isOpen, closeModal, children }) => {
  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;
