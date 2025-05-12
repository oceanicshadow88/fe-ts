import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import styles from '../TicketEpicFilter.module.scss';

interface ITicketEpicFilterDropdown {
  epic: any;
  selectedEpics: any[];
  setSelectedEpics: Dispatch<SetStateAction<any[]>>;
  changeSelectedEpics: (isExists: boolean, selectedItems: any[], item: any) => any[];
  dataTestId?: string;
}

export default function TicketEpicFilterDropdown(props: ITicketEpicFilterDropdown) {
  const { epic, selectedEpics, setSelectedEpics, changeSelectedEpics, dataTestId } = props;
  const checkEpicExists = () => {
    let isExist = false;
    selectedEpics.forEach((selectedEpic) => {
      if (selectedEpic.id === epic.id) {
        isExist = true;
      }
    });
    return isExist;
  };

  const [selected, setSelected] = useState(checkEpicExists());

  const handleBtnClick = () => {
    setSelected((prevState) => !prevState);
    const isExist = checkEpicExists();
    setSelectedEpics(changeSelectedEpics(isExist, selectedEpics, epic));
  };

  return (
    <button className={styles.taskEpicFilterDropdownBtn} onClick={handleBtnClick} data-testid={dataTestId}>
      {selected ? (
        <BiCheckboxChecked className={styles.taskEpicFilterDropdownCheck} />
      ) : (
        <BiCheckbox className={styles.taskEpicFilterDropdownCheck} />
      )}
      <div className={styles.taskEpicFilterDropdownName}>{epic.title}</div>
    </button>
  );
}
