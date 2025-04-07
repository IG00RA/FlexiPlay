'use client';

import { ReactNode } from 'react';
import Modal from 'react-modal';
import styles from './ModalComponent.module.css';
import Icon from '@/helpers/Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  key?: string;
}

export default function ModalComponent({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (typeof window !== 'undefined') {
    Modal.setAppElement('#__next');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <>
        <button onClick={onClose} className={styles.close_btn}>
          <Icon
            className={styles.close_icon}
            name="icon-close-modal"
            width={16}
            height={16}
            color="#a9a9c1"
          />
        </button>
        {children}
      </>
    </Modal>
  );
}
