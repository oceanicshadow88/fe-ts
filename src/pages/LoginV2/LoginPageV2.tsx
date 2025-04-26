import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import styles from './LoginPageV2.module.scss';
import LoginMainV2 from './LoginMainV2/LoginMainV2';

interface Props {
  isRootDomain?: boolean;
}

export default function LoginPageV2(props: Props) {
  const { isRootDomain = false } = props;
  return (
    <div className={styles.registerContainer}>
      <VerifyPageBackground>
        <LoginMainV2 isRootDomain={isRootDomain} />
      </VerifyPageBackground>
    </div>
  );
}

LoginPageV2.defaultProps = {
  isRootDomain: false
};
