/* eslint-disable no-secrets/no-secrets */
import React, { useState } from 'react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import InputV2 from '../../../lib/FormV2/InputV2/InputV2';
import styles from './SubProjectMenu.module.scss';

interface ISubProjectMenu {
  toggleSearchMenu: boolean;
  closeModal: () => void;
}

export default function SubProjectMenu(props: ISubProjectMenu) {
  const { toggleSearchMenu, closeModal } = props;
  const [filteredResult, setFilteredResult] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const onChangeFilterProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setFilteredResult(null);
      return;
    }
    // const projectList = [];
    // const result = projectList.filter((item) => {
    //   return item.name?.toLowerCase().includes(e.target.value.toLowerCase());
    // });
    setFilteredResult([]);
  };

  const renderSearchItem = () => {
    return filteredResult?.map((item) => {
      return (
        <Link
          key={item.id}
          to={`/projects/${item.id}/board`}
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setSearchValue('');
            setFilteredResult(null);
            closeModal();
          }}
        >
          <div className={styles.searchItem} data-testid="search-result">
            <AiOutlineFolderOpen className={styles.icon} />
            <p>{item.name}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <nav
      className={[styles.container, toggleSearchMenu ? styles.showMenu : styles.hideMenu].join(' ')}
    >
      <h1 className={styles.header}>Search</h1>
      <InputV2
        label="Search"
        dataTestId="search-input"
        onValueChanged={onChangeFilterProject}
        value={searchValue}
        name="search"
      />
      {filteredResult && (
        <h2 className={styles.recentActivityHeader}>Search Result ({filteredResult.length})</h2>
      )}
      {renderSearchItem()}
      {!filteredResult && <h2 className={styles.recentActivityHeader}>My Recent Activity (WIP)</h2>}
    </nav>
  );
}
