import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './ChangePasswordMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Error from '../../../assets/error.png';
import Loading from '../../../components/Loading/Loading';
import { getResetPasswordApplication, setPassword } from '../../../api/resetPassword/resetPassword';
import { IResetPasswordForm } from '../../../types';

export default function RegisterMain() {
  /* eslint-disable no-useless-escape */
  const illegalCharacter = /[%&]/;
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [changePasswordForm, setChangePasswordForm] = useState<IResetPasswordForm>({
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [invalideTokenStatus, setInvalideTokenStatus] = useState(false);
  const [tip, setTip] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        setLoading(true);
        const result = await getResetPasswordApplication(token ?? '');
        setChangePasswordForm({ ...result.data });
      } catch (e) {
        setInvalideTokenStatus(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserEmail();
  }, [token]);

  const handleSubmit = async () => {
    const illegalTestResult = illegalCharacter.test(passwordForm.password);
    if (illegalTestResult) return setTip('Illegal Character Detected');
    if (passwordForm.password !== passwordForm.confirmPassword)
      return setTip('Confirm Password is difference with password');
    setLoading(true);
    try {
      await setPassword(token ?? '', passwordForm.password);
      toast.success('Password has been changed', {
        theme: 'colored',
        className: 'primaryColorBackground'
      });
      navigate(`/login`);
    } catch (e) {
      toast.error('Something go Wrong, please try again', {
        theme: 'colored',
        toastId: 'toast-error'
      });
    } finally {
      setLoading(false);
    }
    return true;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      const illegalTestResult = illegalCharacter.test(e.target.value);
      if (illegalTestResult) return setTip('Illegal Character Detected');
    }

    if (e.target.name === 'confirmPassword') {
      if (passwordForm.password !== e.target.value)
        return setTip('Confirm Password is difference with password');
    }
    return setTip('');
  };

  if (loading) {
    return <Loading />;
  }
  if (invalideTokenStatus) {
    return <div />;
  }
  return (
    <div className={styles.changePasswordMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        {invalideTokenStatus ? (
          <>
            <img src={Error} alt="Error Icon" />
            <p>Invalide Link</p>
          </>
        ) : (
          <>
            <h1>Forget Password</h1>
            <input
              className={styles.email}
              type="text"
              name="email"
              defaultValue={changePasswordForm.email}
              onChange={onChangeHandler}
              disabled
              required
              data-testid="email"
            />

            <input
              className={styles.email}
              type="password"
              placeholder="Enter New Password"
              name="password"
              minLength={8}
              maxLength={16}
              defaultValue={passwordForm.password}
              onChange={onChangeHandler}
              required
              data-testid="password"
            />

            <input
              className={styles.email}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              defaultValue={passwordForm.confirmPassword}
              onChange={onChangeHandler}
              required
              data-testid="confirmPassword"
            />
            <p id="tip" data-testid="tip">
              {tip}
            </p>
            <button type="submit" data-testid="confirm">
              Confirm
            </button>
          </>
        )}
      </form>
    </div>
  );
}
