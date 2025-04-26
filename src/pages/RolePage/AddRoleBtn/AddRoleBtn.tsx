import React, { useState } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import styles from './AddRoleBtn.module.scss';

interface IAddRoleBtn {
  addRole: () => void;
}

function AddRoleBtn(props: IAddRoleBtn) {
  const { addRole } = props;
  const [isShown, setIsShown] = useState(false);

  const buttonNotice = isShown && (
    <div className={styles['notice-container']}>
      <p>Create New Role</p>
    </div>
  );

  return (
    <div>
      <div className={styles['addBtn-container']}>
        <button
          data-testid="add-role-btn"
          className={styles.addBtn}
          onClick={() => addRole()}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <HiPlusSm color="white" size="25px" />
        </button>
        {buttonNotice}
      </div>
    </div>
  );
}

export default AddRoleBtn;
