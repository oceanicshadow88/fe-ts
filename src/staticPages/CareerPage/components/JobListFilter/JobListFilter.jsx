import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './JobListFilter.module.scss';

function JobListFilter() {
  const onChange = () => {};
  return (
    <div className={styles.jobListFilter}>
      <select name="filter" id="filter" value="All Teams" onChange={onChange}>
        <option value="All Teams">All Teams</option>
        <option value="Sales">Sales</option>
        <option value="Customer Success">Customer Success</option>
        <option value="General">General</option>
        <option value="People & Talent">People & Talent</option>
        <option value="Technical Operations">Technical Operations</option>
      </select>
      <span>Filter by</span>
      <IoIosArrowDown className={styles.jobListFilterArrow} />
    </div>
  );
}

export default JobListFilter;
