import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailVerifyCheckV2 } from '../../../api/register/emailCheck';
import { IUserInfo } from '../../../types';
import { UserDispatchContext } from '../../../context/UserInfoProvider';

import styles from './VerifyPageMainV2.module.scss';
import Icon from '../../../assets/logo.svg';
import Error from '../../../assets/error.png';
import Loading from '../../../components/Loading/Loading';
import { setUserPermissionsLocalStorage } from '../../../utils/helpers';
import { register } from '../../../api/register/register';

export default function VerifyPageMainV2() {
  const navigate = useNavigate();
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;
  const [searchParams] = useSearchParams();
  const setUserInfo = useContext(UserDispatchContext);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [invalidateStatus, setInvalidateStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userActive, setUserActive] = useState<boolean>(false);

  let nameRecorder = '';
  let passwordRecorder = '';
  let confirmPasswordRecorder = '';

  const tip = (error: string) => {
    setInvalidateStatus(true);
    setErrorMessage(error);
    setIsLoading(false);
  };

  useEffect(() => {
    const token = searchParams.get('token');
    const fetchEmailByToken = async () => {
      if (!token) {
        tip('The link is invalidate, please contact the administrator');
        return;
      }
      try {
        const result = await emailVerifyCheckV2(token);
        setVerifyEmail(result.data.email);
        setUserActive(result.data.active);
        setIsLoading(false);
      } catch (e) {
        tip('The link is invalidate, please contact the administrator');
      }
    };
    fetchEmailByToken();
  });

  useEffect(() => {
    if (userActive) {
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, [navigate, userActive]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (passwordRecorder === confirmPasswordRecorder) {
      setIsLoading(true);
      const emailToken = searchParams.get('token');
      try {
        const result = await register(emailToken ?? 'undefined', {
          email: verifyEmail,
          name: nameRecorder,
          password: passwordRecorder
        });
        const { user, token, refreshToken } = result.data;
        if (!user) {
          tip('Register Failed, please try again');
          return;
        }
        setIsLoading(false);
        const userLoginInfo: IUserInfo = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarIcon: user?.avatarIcon,
          token,
          refreshToken
        };
        setUserInfo(userLoginInfo);
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        setUserPermissionsLocalStorage(user);
        navigate(`/`);
      } catch (e) {
        tip('Something go wrong, please contact staff');
      }
    } else {
      toast.error('Passwords are not match, please try enter your passwords again');
    }
  };

  const setName = (name: string) => {
    nameRecorder = name;
  };

  const setPassword = (password: string) => {
    if (!illegalCharacter.test(password) || password === '') {
      passwordRecorder = password;
    } else tip('Illegal Character Detected');
  };

  const setConfirmPassword = (password: string) => {
    confirmPasswordRecorder = password;
  };

  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" className={styles.logo} />
      <form onSubmit={handleSubmit}>
        {invalidateStatus && (
          <div className={styles.emailTip}>
            <img src={Error} alt="Error Icon" className={styles.errorIcon} />
            <h1 className={styles.errorMessage}>{errorMessage}</h1>
          </div>
        )}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loading height="352px" />
            <p>Hold on while we are setting up your environment</p>
          </div>
        )}
        {!invalidateStatus && !isLoading && !userActive && (
          <>
            <h1>Register to continue</h1>
            <h1>Your team&apos;s site</h1>
            <p id="tip" />
            <input
              className={styles.email}
              type="email"
              placeholder="Input Email Address"
              name="email"
              defaultValue={verifyEmail}
              disabled
              required
            />
            <input
              className={styles.password}
              type="text"
              placeholder="Input Your Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={styles.password}
              type="password"
              placeholder="Input Your Password"
              name="password"
              minLength={8}
              maxLength={16}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={styles.password}
              type="password"
              placeholder="Confirm Your Password"
              name="password"
              minLength={8}
              maxLength={16}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p>
              By registering, I accept the{' '}
              <Link to="/terms-of-service">TechScrum Terms of Service</Link> and confirm acceptance
              of the
              <Link to="/privacy-policy"> Privacy Policy.</Link>
            </p>
            <button type="submit">Register</button>
          </>
        )}
        {!invalidateStatus && !isLoading && userActive && (
          <>
            <h1>Your team&apos;s site all done</h1>
            <div className={styles.registerMessageContainer}>
              <img
                className={styles.verifySuccessImg}
                src="https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg"
                alt="success"
              />
              <h1>The registration for the domain is successful!</h1>
            </div>
          </>
        )}
      </form>
      <p className={styles.registerMainFooter}>
        This page is protected by reCAPTCHA and complies with Google&apos;s{' '}
        <Link to="/privacy-policy"> Privacy Policy</Link> and{' '}
        <Link to="/terms-of-service">Terms of Service</Link>
      </p>
    </div>
  );
}
