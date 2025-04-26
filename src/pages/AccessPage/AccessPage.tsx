import React, { useCallback, useEffect, useState } from 'react';
import styles from './AccessPage.module.scss';
import Header from './AccessHeader/AccessHeader';
import SearchBar from './AccessSearchBar/AccessSearchBar';
import Main from './AccessMain/AccessMain';
import Modal from './AddPeopleModal/AddPeopleModal';
import { IMember } from './Typings/Typings';

export default function AccessPage() {
  const [modal, setModal] = useState(false);
  const [memberList, setMemberList] = useState<IMember[]>([]);

  const modalStateClick = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const addClick = useCallback((member: IMember) => {
    setMemberList((memberLists: IMember[]) => [...memberLists, member]);
  }, []);

  const removeClick = useCallback((id: number) => {
    setMemberList((memberLists: IMember[]) =>
      memberLists.filter((member: IMember) => member.id !== id)
    );
  }, []);

  useEffect(() => {}, [modal, memberList]);

  return (
    <>
      {modal && <Modal cancelClick={modalStateClick} addClick={addClick} memberList={memberList} />}
      <div className={styles.container}>
        <Header modalStateClick={modalStateClick} />
        <br />
        <br />
        <SearchBar />
        <Main removeClick={removeClick} memberList={memberList} />
      </div>
    </>
  );
}
