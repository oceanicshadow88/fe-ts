import React from 'react';
import Modal from '../../../../lib/Modal/Modal';
import DefaultModalHeader from '../../../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import styles from './MoveIncompleteTicketsModal.module.scss';

interface MoveIncompleteTicketsModalProps {
  onConfirm: (target: 'sprint' | 'backlog') => void;
  onClickCloseModal: () => void;
}

export default function MoveIncompleteTicketsModal({
  onConfirm,
  onClickCloseModal
}: Readonly<MoveIncompleteTicketsModalProps>) {
  return (
    <Modal classesName={styles.moveIncompleteTicketsModal}>
      <DefaultModalHeader
        title="Where do you want to move incomplete tickets?"
        onClickClose={() => {
          onClickCloseModal();
        }}
      />

      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={() => onConfirm('sprint')}>
          To Next Sprint
        </button>
        <button className={styles.btn} onClick={() => onConfirm('backlog')}>
          To Backlog
        </button>
      </div>
    </Modal>
  );
}
