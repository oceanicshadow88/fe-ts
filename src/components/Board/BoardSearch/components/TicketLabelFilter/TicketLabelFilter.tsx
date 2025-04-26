import React, { useContext } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TicketLabelFilter.module.scss';
import LabelOption from './LabelOption';
import { ILabelData } from '../../../../../types';
import useOutsideAlerter from '../../../../../hooks/OutsideAlerter';
import { ProjectDetailsContext } from '../../../../../context/ProjectDetailsProvider';

interface Props {
  selectedLabels: ILabelData[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<ILabelData[]>>;
}
export default function TicketLabelFilter({ selectedLabels, setSelectedLabels }: Props) {
  const projectDetails = useContext(ProjectDetailsContext);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const showOptions = () => {
    setVisible((prev) => !prev);
  };

  if (projectDetails.isLoadingDetails) {
    return <></>;
  }

  if (projectDetails.labels.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.filterTab} ref={myRef}>
      <button
        className={visible ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
        onClick={showOptions}
        data-testid="labelsTab"
      >
        Label:
        {selectedLabels.length > 0 && <span className={styles.badge}>{selectedLabels.length}</span>}
        <BiChevronDown className={styles.filterBtnIcon} />
      </button>

      <div
        className={visible ? `${styles.optionsBox} ${styles.active}` : styles.optionsBox}
        data-testid="labelOptions"
      >
        {projectDetails.labels.map((label) => (
          <LabelOption
            key={label.id}
            label={label}
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
          />
        ))}
      </div>
    </div>
  );
}
