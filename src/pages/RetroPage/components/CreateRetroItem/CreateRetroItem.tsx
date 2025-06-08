/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import styles from './CreateRetroItem.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';

interface IDroppableColumn {
  onItemCreate: (data: any) => void;
  className?: string;
  dataTestId?: string;
}

export default function CreateRetroItem(props: IDroppableColumn) {
  const { onItemCreate, className, dataTestId } = props;
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    onItemCreate({
      content: createIssueRef?.current?.value
    });
    setVisible(false);
  };

  if (visible) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.formField} ref={myRef}>
          <input
            className={styles.input}
            type="text"
            name="item"
            id="item"
            data-testid={dataTestId?.concat('-input')}
            onKeyDown={onKeyDownCreateIssue}
            ref={createIssueRef}
          />
        </div>
      </form>
    );
  }

  return (
    <div
      className={[styles.card, styles.cardAddNewCard, className].join(' ')}
      onClick={() => setVisible(true)}
      role="button"
      tabIndex={0}
      data-testid={dataTestId?.concat('-button')}
    >
      <p>+ Add Item</p>
    </div>
  );
}
