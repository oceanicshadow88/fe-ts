import React, { useContext, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import Button from '../../Form/Button/Button';
import styles from './CreateIssue.module.scss';
import TicketTypeSelect from '../../Form/TicketTypeSelect/TicketTypeSelect';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { ProjectDetailsContext } from '../../../context/ProjectDetailsProvider';

export interface ICreateIssue {
  name: string;
  type: string;
}

interface IProps {
  onIssueCreate: (data: ICreateIssue) => void;
  showDropDownOnTop?: boolean;
}

export default function CreateIssue({ onIssueCreate, showDropDownOnTop = false }: IProps) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [currentTypeOption, setCurrentTypeOption] = useState('story');
  const createIssueRef = useRef<HTMLInputElement | null>(null);
  const projectDetails = useContext(ProjectDetailsContext);

  const onKeyDownCreateIssue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || !createIssueRef?.current?.value) {
      return;
    }
    onIssueCreate({
      name: createIssueRef?.current?.value,
      type: projectDetails.ticketTypes.filter((types) => {
        return types.slug === currentTypeOption;
      })[0].id
    });
    setCurrentTypeOption('story');
    setVisible(false);
  };

  return visible ? (
    <form>
      <div className={styles.formField} ref={myRef}>
        <TicketTypeSelect
          showDropDownOnTop={showDropDownOnTop}
          setCurrentTypeOption={setCurrentTypeOption}
        />
        <input
          className={styles.input}
          type="text"
          name="newBacklog"
          id="newBacklog"
          data-testid="create-issue-input"
          ref={createIssueRef}
          onKeyDown={onKeyDownCreateIssue}
        />
      </div>
    </form>
  ) : (
    <Button icon={<GoPlus />} overrideStyle={styles.buttonRow} onClick={() => setVisible(true)}>
      <p data-testid="create-issue">Create ticket</p>
    </Button>
  );
}
