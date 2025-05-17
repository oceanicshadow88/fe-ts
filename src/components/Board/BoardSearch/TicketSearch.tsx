/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import styles from './BoardSearch.module.scss';
import UserFilter from './components/UserFilter/UserFilter';
import SearchForBoard from './components/SearchForBoard/SearchForBoard';
import TicketTypeFilter from './components/TicketTypeFilter/TicketTypeFilter';
import TicketLabelFilter from './components/TicketLabelFilter/TicketLabelFilter';
import { ILabelData, ITypes } from '../../../types';
import { ProjectDetailsContext } from '../../../context/ProjectDetailsProvider';
import TicketEpicFilter from './components/TicketEpicFilter/TicketEpicFilter';

export interface IFilterData {
  userIds: string[] | null;
  ticketTypesIds: string[] | null;
  ticketEpicsIds: string[] | null;
  labelsIds: string[] | null;
  title: string;
}

interface IBoardSearchProps {
  onChangeFilter: (filterData: IFilterData) => void;
}

function TicketSearch(props: IBoardSearchProps) {
  const { onChangeFilter } = props;
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<ILabelData[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ITypes[]>([]);
  const [selectedEpics, setSelectedEpics] = useState<any[]>([]);
  const [inputQuery, setInputQuery] = useState<string>('');

  const projectDetails = useContext(ProjectDetailsContext);

  const changeSelectedItems = (isExist, selectedItems, item) => {
    if (!isExist) {
      return [...selectedItems, item];
    }
    return selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
  };

  useEffect(() => {
    onChangeFilter({
      userIds: selectedUsers.length === 0 ? null : selectedUsers.map((item) => item.id),
      ticketTypesIds: selectedTypes.length === 0 ? null : selectedTypes.map((item) => item.id),
      ticketEpicsIds: selectedEpics.length === 0 ? null : selectedEpics.map((item) => item.id),
      labelsIds: selectedLabels.length === 0 ? null : selectedLabels.map((item) => item.id),
      title: inputQuery
    });
  }, [selectedUsers, selectedTypes, selectedEpics, selectedLabels, inputQuery]);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInputContainer}>
        <SearchForBoard setInputQuery={setInputQuery} />
      </div>
      <UserFilter
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        changeSelectedUsers={changeSelectedItems}
        userList={projectDetails.users}
      />
      <TicketTypeFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        changeSelectedTypes={changeSelectedItems}
        dataTestId="type-filter"
      />
      <TicketEpicFilter
        selectedEpics={selectedEpics}
        setSelectedEpics={setSelectedEpics}
        changeSelectedEpics={changeSelectedItems}
        dataTestId="epic-filter"
      />
      <TicketLabelFilter selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
    </div>
  );
}

export default React.memo(TicketSearch);
