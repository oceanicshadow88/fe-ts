import React from 'react';
import styles from './TicketTypeDropDown.module.scss';
import { ITypes } from '../../../../types';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import Button from '../../../Form/Button/Button';

export interface ISelectProps {
  value?: ITypes;
  ticketTypes: ITypes[];
  showButtonText?: boolean;
  onChange: (fieldName: string, value: any) => void;
}

interface IOption {
  id: string;
  name: string;
  icon: string;
}

export default function TicketTypeDropDown({
  value,
  ticketTypes,
  onChange,
  showButtonText = false
}: ISelectProps) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const options: IOption[] = ticketTypes.map((item: ITypes) => ({
    id: item.id,
    name: item.name,
    icon: item.icon
  }));

  return (
    <div ref={myRef} className={styles.ticketTypeDropDown}>
      {showButtonText ? (
        <Button
          icon={<img src={value?.icon} alt={value?.name} />}
          onClick={() => setVisible(!visible)}
          overrideStyle={styles.ticketTypeBtn}
        >
          {value?.name}
        </Button>
      ) : (
        <Button
          icon={<img src={value?.icon} alt={value?.name} />}
          onClick={() => setVisible(!visible)}
          overrideStyle={styles.ticketTypeBtn}
        />
      )}

      {visible && (
        <ul className={styles.ticketTypeDropDownList}>
          {options.map((item: IOption) => (
            <li key={item.id}>
              <Button
                overrideStyle={styles.ticketTypeBtn}
                icon={<img src={item.icon} alt={item.name} />}
                onClick={() => {
                  onChange('type', item as ITypes);
                  setVisible(false);
                }}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
