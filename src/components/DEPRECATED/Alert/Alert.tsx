import React from 'react';
import { ImCross } from 'react-icons/im';
import styles from './Alert.module.scss';
import checkIcon from '../../assets/check-icon.png';

interface Props {
  statusCode: number;
  tipContent: string;
  confirmAlert: () => void;
}

export default function ErrorAlert({ statusCode, tipContent, confirmAlert }: Props) {
  const confirmEventHandler = () => {
    confirmAlert();
  };

  const iconList = [
    <img className={styles.successTik} src={checkIcon} alt="Success Tik" key="success" />,
    <ImCross color="#8B0000" key="cross-icon" />
  ];

  return (
    <div className={styles.errorContainer}>
      {iconList[statusCode]}
      <h6>{tipContent}</h6>
      <button type="button" onClick={confirmEventHandler}>
        Confirm
      </button>
    </div>
  );
}
