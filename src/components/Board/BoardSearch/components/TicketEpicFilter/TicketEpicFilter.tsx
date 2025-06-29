import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TicketEpicFilter.module.scss';
import { ProjectDetailsContext } from '../../../../../context/ProjectDetailsProvider';
import { IEpicData } from '../../../../../types';
import TicketEpicFilterDropdown from './TicketEpicFilterDropdown/TicketEpicFilterDropdown';

interface ITicketEpicFilter {
  selectedEpics: IEpicData[];
  setSelectedEpics: Dispatch<SetStateAction<IEpicData[]>>;
  changeSelectedEpics: (
    isExists: boolean,
    selectedItems: IEpicData[],
    item: IEpicData
  ) => IEpicData[];
  dataTestId?: string;
}

export default function TicketEpicFilter(props: ITicketEpicFilter) {
  const { selectedEpics, setSelectedEpics, changeSelectedEpics, dataTestId } = props;

  const projectDetails = useContext(ProjectDetailsContext);
  const myRef = useRef<HTMLDivElement>(null);

  const [epicFilterPressed, setEpicFilterPressed] = useState(false);

  const handleBtnOnClick = () => {
    setEpicFilterPressed((prevState) => !prevState);
  };

  // div into function....
  const handleClickOutside = (e) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setEpicFilterPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const buttonClassName = epicFilterPressed
    ? `${styles.taskEpicFilterBtn} ${styles.taskEpicFilterBtnPressed}`
    : `${styles.taskEpicFilterBtn} ${styles.taskEpicFilterBtnUnPressed}`;

  if (projectDetails.epics.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.taskEpicFilterContainer} ref={myRef} data-testid={dataTestId}>
      <div className={styles.taskEpicFilterBtnContainer}>
        <button className={buttonClassName} onClick={handleBtnOnClick}>
          Epic
          <BiChevronDown className={styles.biChevronDownIcon} />
        </button>
      </div>
      {epicFilterPressed && (
        <div className={styles.taskEpicFilterDropdownContainer}>
          {projectDetails.epics.map((epic) => (
            <TicketEpicFilterDropdown
              key={epic.id}
              epic={epic}
              selectedEpics={selectedEpics}
              setSelectedEpics={setSelectedEpics}
              changeSelectedEpics={changeSelectedEpics}
              dataTestId={`epic-filter-item-${epic.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
