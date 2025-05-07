import React from 'react';
import { DatePicker } from '@atlaskit/datetime-picker';
import { ITicketDetails } from '../../../types';
import style from './DueDatePicker.module.scss';

interface Props {
  ticketInfo: ITicketDetails;
  dueDateOnchange: (ticketInfo: ITicketDetails) => void;
  isDisabled: boolean;
}

export default function DueDatePicker({ ticketInfo, dueDateOnchange, isDisabled }: Props) {
  const dateWithDay = (date: Date | null) => {
    if (date != null) {
      const fullDate = date.toString().split('T')[0];
      const dateDataArray = fullDate.split('-');
      return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
    }
    return '';
  };

  return (
    <div className={style.customDatePicker}>
      <DatePicker
        appearance="subtle"
        dateFormat="MM-DD-YYYY"
        placeholder={dateWithDay(ticketInfo.dueAt ?? null)}
        onChange={async (date) => {
          const updatedTicketInfo = { ...ticketInfo };
          updatedTicketInfo.dueAt = new Date(date);
          dueDateOnchange(updatedTicketInfo);
        }}
        testId="dueDatePicker"
        isDisabled={isDisabled}
      />
    </div>
  );
}
