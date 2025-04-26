import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MdOutlineVisibility, MdVisibility } from 'react-icons/md';
import { AxiosError } from 'axios';
import loginv2 from '../../../api/loginv2/loginv2';
import { IUserInfo } from '../../../types';
import { UserDispatchContext } from '../../../context/UserInfoProvider';
import styles from './LoginMain.module.scss';
import Icon from '../../../assets/logo.svg';
import { isCurrentPlanSubscribed } from '../../../api/payment/payment';
import { setUserPermissionsLocalStorage } from '../../../utils/helpers';

interface Props {
  isRootDomain?: boolean;
}

export default function LoginMainV2(props: Props) {
  const { isRootDomain = false } = props;
  const navigate = useNavigate();
  const setUserInfo = useContext(UserDispatchContext);
  const [searchParams] = useSearchParams();
  const stripePriceId = searchParams.get('stripePriceId');
  const illegalCharacter = /[%&]/;
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [emailRecorder, setEmailRecorder] = useState('');
  const [passwordRecorder, setPasswordRecorder] = useState('');
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState('');
  const [currentPlanIsSubscribed, setCurrentPlanIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (!stripePriceId) return;
    isCurrentPlanSubscribed(stripePriceId).then((data) => {
      setCurrentPlanIsSubscribed(data.data);
    });
  }, [stripePriceId]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const result = await loginv2({
        email: emailRecorder,
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
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        if (!stripePriceId) {
          navigate(`/projects`);
          return;
        }
        setUserPermissionsLocalStorage(user);
        if (currentPlanIsSubscribed) {
          navigate(`/price`);
          return;
        }
        if (stripePriceId) {
          navigate(`/checkout?stripePriceId=${stripePriceId}`);
        }
      } else {
        setLoading(false);
        setTips('Wrong Email or Password.');
      }
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      const status = err.response?.status ?? 0;
      if (status === 401) {
        setTips('Wrong Email or Password.');
        return;
      }
      if (status === 403) {
        setTips('User has not active account, Please contact staff!');
        return;
      }
      setTips('Something Go Wrong, Please contact staff!');
    }
  };

  const setEmail = (email: string) => {
    setEmailRecorder(email);
  };

  const setPassword = (password: string) => {
    if (!illegalCharacter.test(password)) {
      setPasswordRecorder(password);
      setTips('');
    } else setTips('Illegal Character Detected');
  };

  return (
    <div className={styles.registerMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>
        <input
          className={styles.email}
          type="email"
          placeholder="Input Email Address"
          name="email"
          defaultValue={emailRecorder}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="email"
        />
        <div className={styles.inputContainer}>
          <input
            className={styles.password}
            id="password"
            type={passwordInvisible ? 'password' : 'text'}
            placeholder="Input Your Password"
            name="password"
            minLength={8}
            maxLength={16}
            defaultValue={passwordRecorder}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="password"
          />
          {passwordInvisible ? (
            <MdOutlineVisibility
              onClick={() => {
                setPasswordInvisible(!passwordInvisible);
              }}
            />
          ) : (
            <MdVisibility
              onClick={() => {
                setPasswordInvisible(!passwordInvisible);
              }}
            />
          )}
        </div>
        <p className="colorRed" data-testid="login-tip">
          {tips}
        </p>
        <button
          type="submit"
          className={styles.btnMargin}
          onSubmit={handleSubmit}
          disabled={loading}
          data-testid="login"
        >
          Login
        </button>
        <div className={styles.formFooter}>
          {isRootDomain && <Link to="/register">Register</Link>}
          {isRootDomain && <span>•</span>}
          <Link to="/login/reset-password">Forgot password</Link>
        </div>
      </form>
      <p className={styles.registerMainFooter}>
        <Link to="/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        &nbsp;and &nbsp;
        <Link to="/terms-of-service" target="_blank">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}

LoginMainV2.defaultProps = {
  isRootDomain: false
};
