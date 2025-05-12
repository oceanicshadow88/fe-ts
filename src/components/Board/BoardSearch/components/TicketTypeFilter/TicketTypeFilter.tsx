import React, { Dispatch, SetStateAction, useEffect, useRef, useState, useContext } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import styles from './TicketTypeFilter.module.scss';
import TicketTypeFilterDropdown from './TicketTypeFilterDropdown/TicketTypeFilterDropdown';
import { ITypes } from '../../../../../types';
import { ProjectDetailsContext } from '../../../../../context/ProjectDetailsProvider';

interface ITaskTypeFilter {
  selectedTypes: ITypes[];
  setSelectedTypes: Dispatch<SetStateAction<ITypes[]>>;
  changeSelectedTypes: (isExists: boolean, selectedItems: ITypes[], item: ITypes) => ITypes[];
  dataTestId?: string;
}

export default function TicketTypeFilter(props: ITaskTypeFilter) {
  const { selectedTypes, setSelectedTypes, changeSelectedTypes, dataTestId } = props;
  const projectDetails = useContext(ProjectDetailsContext);
  const myRef = useRef<HTMLDivElement>(null);

  const [typeFilterPressed, setTypeFilterPressed] = useState(false);
  const handleBtnOnClick = () => {
    setTypeFilterPressed((prevState) => !prevState);
  };

  const handleClickOutside = (e) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setTypeFilterPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  const buttonClassName = typeFilterPressed
    ? `${styles.taskTypeFilterBtn} ${styles.taskTypeFilterBtnPressed}`
    : `${styles.taskTypeFilterBtn} ${styles.taskTypeFilterBtnUnpressed}`;

  return (
    <div className={styles.taskTypeFilterContainer} ref={myRef} data-testid={dataTestId}>
      <div className={styles.taskTypeFilterBtnContainer}>
        <button className={buttonClassName} onClick={handleBtnOnClick}>
          Type
          <BiChevronDown className={styles.biChevronDownIcon} />
        </button>
      </div>
      {typeFilterPressed && (
        <div className={styles.taskTypeFilterDropdownContainer}>
          {projectDetails.ticketTypes.map((type) => (
            <TicketTypeFilterDropdown
              key={type.id}
              type={type}
              selectedTypes={selectedTypes}
              changeSelectedTypes={changeSelectedTypes}
              setSelectedTypes={setSelectedTypes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
