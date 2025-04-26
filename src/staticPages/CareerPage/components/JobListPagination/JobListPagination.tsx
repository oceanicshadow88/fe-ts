import React from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import styles from './JobListPagination.module.scss';

function JobListPagination() {
  return (
    <div className={styles.jobListPagination}>
      <div className={`${styles.paginationButton} ${styles.paginationArrow} `}>
        <HiOutlineArrowSmLeft size={20} />
      </div>
      <button className={`${styles.paginationButton} ${styles.active} `}>1</button>
      <div className={`${styles.paginationButton} ${styles.paginationArrow} `}>
        <HiOutlineArrowSmRight size={20} />
      </div>
    </div>
  );
}

export default JobListPagination;
