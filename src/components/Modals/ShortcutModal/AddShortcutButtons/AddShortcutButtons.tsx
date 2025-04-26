import React from 'react';
import styles from './AddShortcutButtons.module.scss';

interface IProps {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  onClickAddShortcut: (e: React.MouseEvent<HTMLSpanElement>) => void;
  webValue: string;
  nameValue: string;
  isUrlValid: boolean;
}
export default function AddShortcutButtons({
  addLinkToggle,
  setAddLinkToggle,
  webValue,
  nameValue,
  onClickAddShortcut,
  isUrlValid
}: IProps) {
  const hasData = webValue && nameValue;

  return (
    <div className={styles.footerContent}>
      <button
        className={styles.cancelButton}
        type="button"
        onClick={() => setAddLinkToggle(!addLinkToggle)}
        data-testid="cancel-shortcut-btn"
      >
        <span>Cancel</span>
      </button>

      <button
        className={hasData && !isUrlValid ? styles.activeAddButton : styles.addButton}
        type="button"
        onClick={onClickAddShortcut}
        disabled={isUrlValid || !hasData}
        data-testid="add-shortcut-btn"
      >
        <span>Add</span>
      </button>
    </div>
  );
}
