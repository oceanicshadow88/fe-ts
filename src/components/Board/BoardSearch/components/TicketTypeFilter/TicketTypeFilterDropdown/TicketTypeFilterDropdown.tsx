import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import styles from '../TicketTypeFilter.module.scss';
import { ITypes } from '../../../../../../types';

interface ITicketTypeFilterDropdown {
  type: ITypes;
  selectedTypes: ITypes[];
  changeSelectedTypes: (isExists: boolean, selectedItems: ITypes[], item: ITypes) => ITypes[];
  setSelectedTypes: Dispatch<SetStateAction<ITypes[]>>;
  dataTestId?: string;
}

export default function TicketTypeFilterDropdown(props: ITicketTypeFilterDropdown) {
  const { type, selectedTypes, changeSelectedTypes, setSelectedTypes, dataTestId } = props;
  const checkTypeExists = () => {
    let isExists = false;
    selectedTypes.forEach((selectedType) => {
      if (selectedType.id === type.id) {
        isExists = true;
      }
    });
    return isExists;
  };
  const [selected, setSelected] = useState(checkTypeExists());

  const handleBtnClick = () => {
    setSelected((prevState) => !prevState);
    const isExists = checkTypeExists();
    setSelectedTypes(changeSelectedTypes(isExists, selectedTypes, type));
  };

  return (
    <button
      className={styles.taskTypeFilterDropdownBtn}
      onClick={handleBtnClick}
      data-testid={dataTestId}
    >
      {selected ? (
        <BiCheckboxChecked className={styles.taskTypeFilterDropdownCheck} />
      ) : (
        <BiCheckbox className={styles.taskTypeFilterDropdownCheck} />
      )}
      <img className={styles.taskTypeFilterDropdownIcon} src={type.icon} alt={type.name} />
      <div className={styles.taskTypeFilterDropdownName}>{type.name}</div>
    </button>
  );
}
