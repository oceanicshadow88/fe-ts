/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useRef, useState } from 'react';
import styles from './CreateBoardTicket.module.scss';
import TicketTypeSelect from '../../../../components/Form/TicketTypeSelect/TicketTypeSelect';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { ProjectDetailsContext } from '../../../../context/ProjectDetailsProvider';

interface IDroppableColumn {
  onTicketCreate: (data: any) => void;
  className?: string;
}

export default function CreateBoardTicket(props: IDroppableColumn) {
  const { onTicketCreate, className } = props;
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const projectDetails = useContext(ProjectDetailsContext);
  const createIssueRef = useRef<HTMLInputElement | null>(null);

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !createIssueRef?.current?.value) {
      return;
    }
    onTicketCreate({
      name: createIssueRef?.current?.value,
      type: projectDetails.ticketTypes.find((types) => {
        return types.slug === currentTypeOption;
      })?.id
    });
    setCurrentTypeOption('story');
    setVisible(false);
  };

  if (visible) {
    return (
      <form>
        <div className={styles.formField} ref={myRef}>
          <TicketTypeSelect showDropDownOnTop={false} setCurrentTypeOption={setCurrentTypeOption} />
          <input
            className={styles.input}
            type="text"
            name="ticket"
            id="ticket"
            data-testid="create-ticket-input"
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
    >
      <p>+ Add Ticket</p>
    </div>
  );
}
