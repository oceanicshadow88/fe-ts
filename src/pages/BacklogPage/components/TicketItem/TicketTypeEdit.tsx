import React, { useContext } from 'react';
import styles from './TicketTypeEdit.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { ProjectDetailsContext } from '../../../../context/ProjectDetailsProvider';
import { ITypes } from '../../../../types';

type SelectProps = {
  ticketId?: string;
  value?: ITypes;
  onChange: (value: ITypes | undefined) => void;
  updateTicketType: (newTypeId: string) => Promise<void>;
  isDisabled: boolean;
};

export default function TicketTypeEdit({
  ticketId,
  value,
  onChange,
  updateTicketType,
  isDisabled
}: SelectProps) {
  const projectDetails = useContext(ProjectDetailsContext);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  function selectOption(option: ITypes) {
    onChange(option);
  }

  const options = projectDetails.ticketTypes.map((e: ITypes) => ({
    id: e.id,
    name: e.name,
    icon: e.icon
  }));

  return (
    <div
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (isDisabled) return;
        setVisible((prev) => !prev);
      }}
      onKeyDown={(e) => e.key === 'Enter' && setVisible((prev) => !prev)}
      data-testid={`types-btn-${ticketId}`}
      ref={myRef}
    >
      <img
        src={value?.icon}
        alt={value?.name}
        className={styles.currentIcon}
        data-testid={`current-icon-${ticketId}`}
      />
      <div className={`${styles.options} ${visible ? styles.show : ''}`}>
        {options
          .filter((e) => e.name !== value?.name)
          .map((option) => (
            <button
              className={styles.option}
              key={option.name}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setVisible(false);
                updateTicketType(option.id);
              }}
              data-testid={`${option.name}-btn-${ticketId}`}
            >
              <img src={option.icon} className={styles.icon} alt={option.name} />
              <span className={styles.name}>{option.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}

TicketTypeEdit.defaultProps = {
  value: {
    id: '',
    name: '',
    icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium'
  }
};
