import React, { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import styles from './TicketLabelFilter.module.scss';
import { ILabelData } from '../../../../../types';

interface IProps {
  label: ILabelData;
  selectedLabels: ILabelData[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<ILabelData[]>>;
}

export default function LabelOption({ label, selectedLabels, setSelectedLabels }: IProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleBtnClick = () => {
    setIsSelected((prev) => !prev);
    const isExist = selectedLabels.some((e) => e.id === label.id);
    let currentSelects: ILabelData[];
    if (isExist) {
      currentSelects = selectedLabels.filter((e) => e.id !== label.id);
    } else {
      currentSelects = [...selectedLabels, label];
    }
    setSelectedLabels(currentSelects);
  };

  return (
    <button className={styles.optionBtn} onClick={handleBtnClick} data-testid={`label-${label.id}`}>
      {isSelected ? (
        <BiCheckboxChecked className={styles.optionCheckBox} />
      ) : (
        <BiCheckbox className={styles.optionCheckBox} />
      )}
      <div className={styles.optionName}>{label.name}</div>
    </button>
  );
}
