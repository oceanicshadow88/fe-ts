import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import styles from './StatusBtn.module.scss';
import Button from '../../../../components/Form/Button/Button';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IStatusBacklog } from '../../../../types';
import { updateTicketStatus } from '../../../../api/ticket/ticket';

interface IToolBar {
  statusId?: any;
  ticketId: string;
  statusOptions: IStatusBacklog[];
  getBacklogDataApi: () => void;
  showDropDownOnTop?: boolean;
  isDisabled: boolean;
}
export default function StatusBtn({
  statusId,
  ticketId,
  statusOptions,
  showDropDownOnTop,
  getBacklogDataApi,
  isDisabled
}: IToolBar) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const dropDownClick = () => {
    if (isDisabled) return;
    setVisible(!visible);
  };

  const btnClick = async (updateStatusId: string) => {
    await updateTicketStatus(ticketId, updateStatusId);
    getBacklogDataApi();
    setVisible(false);
  };

  return (
    <div className={styles.statusBtnContainer} ref={myRef}>
      <Button
        icon={<FaChevronDown />}
        iconPosition="end"
        overrideStyle={[styles.statusBtn, styles.dropDownBtnPurple].join(' ')}
        onClick={dropDownClick}
      >
        {statusOptions.find((item) => item.id === statusId)?.name?.toUpperCase() ?? 'BACKLOG'}
      </Button>
      <div
        className={
          visible
            ? [
                styles.btnDropDownContainer,
                styles.showBtnDropDownContainer,
                showDropDownOnTop && styles.showDropDownOnTop
              ].join(' ')
            : styles.btnDropDownContainer
        }
      >
        <ul className={styles.btnDropDownListContainer}>
          {statusOptions
            .filter((item) => item.id !== statusId)
            .map((data) => {
              return (
                <li key={data.name}>
                  <Button
                    overrideStyle={[styles.dropDownBtn].join(' ')}
                    onClick={() => {
                      btnClick(data.id);
                    }}
                  >
                    <span className={styles.dropDownBtnPurple}>{data.name.toUpperCase()}</span>
                  </Button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
StatusBtn.defaultProps = {
  showDropDownOnTop: false
};
