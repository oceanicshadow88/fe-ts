import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { emailVerifyCheck } from '../../../api/register/emailCheck';
import { IUserInfo } from '../../../types';
import { UserDispatchContext } from '../../../context/UserInfoProvider';
import { register } from '../../../api/register/register';
import styles from './VerifyPageMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Error from '../../../assets/error.png';
import Loading from '../../../components/Loading/Loading';
import { setUserPermissionsLocalStorage } from '../../../utils/helpers';

export default function VerifyPageMain() {
  const navigate = useNavigate();
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;
  const [searchParams] = useSearchParams();
  const setUserInfo = useContext(UserDispatchContext);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [invalidateStatus, setInvalidateStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  let nameRecorder = '';
  let passwordRecorder = '';

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
        const result = await emailVerifyCheck(token);
        setVerifyEmail(result.data.email);
        setIsLoading(false);
      } catch (e) {
        tip('The link is invalidate, please contact the administrator');
      }
    };
    fetchEmailByToken();
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
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
      navigate(`/projects`);
    } catch (e) {
      tip('Something go wrong, please contact staff');
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
        {!invalidateStatus && !isLoading && (
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
            <p>
              By registering, I accept the{' '}
              <Link to="/terms-of-service">TechScrum Terms of Service</Link> and confirm acceptance
              of the
              <Link to="/privacy-policy"> Privacy Policy.</Link>
            </p>
            <button type="submit">Register</button>
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
