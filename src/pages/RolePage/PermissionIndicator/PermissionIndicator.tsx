import React, { useState } from 'react';
import styles from './PermissionIndicator.module.scss';

interface IPermissionIndicator {
  isPermissionAllowed?: boolean;
  content: string;
}

function PermissionIndicator({ isPermissionAllowed, content }: IPermissionIndicator) {
  const [isShown, setIsShown] = useState(false);

  const indicatorNotice = isShown && (
    <div className={styles['notice-container']}>
      <p>{content}</p>
    </div>
  );
  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={styles['outter-container']}
    >
      <div
        style={{ backgroundColor: isPermissionAllowed ? 'green' : 'red' }}
        className={styles['indicator-container']}
      >
        {content[0]}
      </div>
      {indicatorNotice}
    </div>
  );
}

PermissionIndicator.defaultProps = {
  isPermissionAllowed: false
};

export default PermissionIndicator;
