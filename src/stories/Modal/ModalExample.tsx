/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from '../../lib/Modal/Modal';
import DefaultModalHeader from '../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';

interface ModalProps {
  title: string;
}
/**
 * Modal
 */
export function ModalExample({ title = '' }: ModalProps) {
  return (
    <Modal>
      <DefaultModalHeader title={title} onClickClose={() => {}} />
      <h1>hi</h1>
    </Modal>
  );
}
