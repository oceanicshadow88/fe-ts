import React from 'react';
import styles from './EditShortcutButtons.module.scss';

interface IOperation {
  addLinkToggle: boolean;
  setAddLinkToggle: (addLinkToggle: boolean) => void;
  onClickUpdateShortcut: () => void;
}
export default function EditShortcutButtons({
  addLinkToggle,
  setAddLinkToggle,
  onClickUpdateShortcut
}: IOperation) {
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
        className={styles.updateButton}
        type="button"
        onClick={() => {
          setAddLinkToggle(!addLinkToggle);
          onClickUpdateShortcut();
        }}
        data-testid="update-shortcut-btn"
      >
        <span>Update</span>
      </button>
    </div>
  );
}
