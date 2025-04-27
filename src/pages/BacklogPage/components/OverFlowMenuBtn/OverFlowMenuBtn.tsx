/* eslint-disable react/no-unused-prop-types */
import React, { useContext, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import styles from './OverFlowMenuBtn.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import checkAccess from '../../../../utils/helpers';
import { ProjectDetailsContext } from '../../../../context/ProjectDetailsProvider';

interface IOverFlowMenuBtn {
  ticketId: string;
  showDropDownOnTop?: boolean;
  className: string;
  items;
}

const enum Permission {
  DeleteTickets = 'delete:tickets'
}
export default function OverFlowMenuBtn({
  ticketId,
  showDropDownOnTop,
  className,
  items
}: IOverFlowMenuBtn) {
  const [clickOptionBtnShowStyle, setClickOptionBtnShowStyle] = useState(false);

  const action = () => {
    setClickOptionBtnShowStyle(false);
  };
  const { visible, setVisible, myRef } = useOutsideAlerter(false, action);
  const projectDetails = useContext(ProjectDetailsContext);
  const projectId = projectDetails.details.id;

  return (
    <div className={`${styles.optionBtnContainer} ${className}`} ref={myRef}>
      <button
        className={styles.optionBtn}
        onClick={() => {
          setVisible(!visible);
          setClickOptionBtnShowStyle(!clickOptionBtnShowStyle);
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        data-testid={'hover-show-option-btn-'.concat(ticketId)}
      >
        <BsThreeDots />
      </button>
      <div
        className={
          visible
            ? [
                styles.optionBtnDropDown,
                styles.showOptionBtnDropDown,
                showDropDownOnTop && styles.showDropDownOnTop
              ].join(' ')
            : styles.optionBtnDropDown
        }
      >
        <ul>
          <p>Actions</p>
          {items
            .filter((item) => item.show)
            .map((item) =>
              item.name === 'Delete' && !checkAccess(Permission.DeleteTickets, projectId) ? null : (
                <li key={item.name}>
                  <button
                    className={styles.dropDownBtn}
                    onClick={item.onClick}
                    data-testid={'delete-ticket-'.concat(item.name)}
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
}

OverFlowMenuBtn.defaultProps = {
  showDropDownOnTop: false
};
