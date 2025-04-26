import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { adminEmailCheck, emailVerifyCheck } from '../../../api/register/emailCheck';
import { IUserInfo } from '../../../types';
import { UserDispatchContext } from '../../../context/UserInfoProvider';
import { register } from '../../../api/register/register';
import styles from './AdminMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Email from '../../../assets/email.png';
import Error from '../../../assets/error.png';
import Loading from '../../../components/Loading/Loading';
import { setUserPermissionsLocalStorage } from '../../../utils/helpers';

export default function RegisterMain() {
  const navigate = useNavigate();
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;

  const { token: emailToken } = useParams();
  const setUserInfo = useContext(UserDispatchContext);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailRegisterProcess, setEmailRegisterProcess] = useState(false);
  const [emailCheckProcess, setEmailCheckProcess] = useState(false);
  const [invalidateStatus, setInvalidateStatus] = useState(false);
  const [appName] = useState('');
  const [tips, setTips] = useState('');
  let emailRecorder = '';
  let nameRecorder = '';
  let passwordRecorder = '';

  useEffect(() => {
    const fetchEmailByToken = async () => {
      if (emailToken !== undefined && emailToken != null) {
        try {
          const result = await emailVerifyCheck(emailToken);
          setVerifyEmail(result.data.email);
          setEmailCheckProcess(true);
        } catch (e) {
          setEmailRegisterProcess(true);
          setInvalidateStatus(true);
        }
      }
    };
    fetchEmailByToken();
  }, [emailToken, navigate]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!emailCheckProcess) {
      try {
        setLoading(true);
        await adminEmailCheck(emailRecorder, { appName });
        setLoading(false);
        setTips('');
        setEmailRegisterProcess(true);
      } catch (e) {
        setLoading(false);
        const err = e as AxiosError;
        const status = err.response?.status ?? 0;
        if (status === 302) {
          setTips('The email already exists. Please try again');
          return;
        }
        if (status === 409) {
          setTips('App name already exists. Please try again');
          return;
        }
        setTips('Something go wrong, please try again');
      }
      return;
    }

    try {
      const result = await register(emailToken ?? 'undefined', {
        email: verifyEmail,
        name: nameRecorder,
        password: passwordRecorder
      });
      const { user, token, refreshToken } = result.data;
      if (user) {
        const userLoginInfo: IUserInfo = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarIcon: user?.avatarIcon,
          token,
          refreshToken
        };
        setUserInfo(userLoginInfo);
        setUserPermissionsLocalStorage(user);
        navigate(`/projects`);
      } else {
        setTips('Register Failed, please try again');
      }
    } catch (e) {
      setTips('Something go wrong, please contact staff');
    }
  };

  const setEmail = (email: string) => {
    emailRecorder = email;
  };

  const setName = (name: string) => {
    nameRecorder = name;
  };

  const setPassword = (password: string) => {
    if (!illegalCharacter.test(password) || password === '') {
      passwordRecorder = password;
      setTips('');
    } else setTips('Illegal Character Detected');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        {emailRegisterProcess ? (
          <div className={styles.emailTip} data-testid="email-tip">
            {invalidateStatus ? (
              <>
                <img src={Error} alt="Error Icon" className={styles.logo} />
                <h1>The link is invalidate, please contact the administrator</h1>
              </>
            ) : (
              <>
                <img src={Email} alt="Email Icon" className={styles.emailSent} />
                <h1>Email have Sent, Please check your email</h1>
              </>
            )}
          </div>
        ) : (
          <>
            <h1>Register to continue</h1>
            <h1>Your team&apos;s site</h1>
            <p className="colorRed" data-testid="email-warning-tip">
              {tips}
            </p>
            <input
              className={styles.email}
              type="email"
              placeholder="Enter email address"
              name="email"
              defaultValue={verifyEmail}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailCheckProcess}
              required
              data-testid="email"
            />

            {emailCheckProcess && (
              <>
                <input
                  className={styles.password}
                  type="text"
                  placeholder="Input Your Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-testid="username"
                />
                <input
                  className={styles.password}
                  type="password"
                  placeholder="Input Your Password"
                  name="password"
                  minLength={8}
                  maxLength={16}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="password"
                />
              </>
            )}
            <p>
              By registering, I accept the&nbsp;
              <Link to="/terms-of-service" target="_blank">
                TechScrum Terms of Service&nbsp;
              </Link>
              and confirm acceptance of the&nbsp;
              <Link to="/privacy-policy" target="_blank">
                Privacy Policy.
              </Link>
            </p>
            <button type="submit" data-testid="register">
              Register
            </button>
            <div className={styles.formFooter}>
              <Link to="/login">Already have TechScrum Account? Login</Link>
            </div>
          </>
        )}
      </form>

      <p className={styles.registerMainFooter}>
        <Link to="/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        &nbsp;and&nbsp;
        <Link to="/terms-of-service" target="_blank">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
