import React from 'react';
import styles from './TicketStatusDropDown.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import TicketStatusBtn from '../ActivitiesSession/@components/TicketStatusBtn';

export interface IOption {
  id: string;
  name: string;
}

export interface ISelectProps {
  value?: string;
  options: IOption[];
  onChange: (value: string) => void;
  isDisabled: boolean;
}

export default function TicketStatusDropDown({
  value,
  options,
  onChange,
  isDisabled
}: ISelectProps) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  return (
    <div ref={myRef} className={styles.ticketStatusDropDown}>
      <TicketStatusBtn
        status={options.find((item) => item.id === value)?.name ?? 'BACKLOG'}
        onClick={() => {
          if (isDisabled) return;
          setVisible(!visible);
        }}
      />
      {visible && (
        <ul className={styles.ticketStatusDropDownList}>
          {options.map((item) => (
            <li key={item.id}>
              <TicketStatusBtn
                status={item.name}
                onClick={() => {
                  onChange(item.id);
                  setVisible(false);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
