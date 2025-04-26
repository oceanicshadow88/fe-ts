import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ResetPasswordMain.module.scss';
import Icon from '../../../assets/logo.svg';
import Loading from '../../../components/Loading/Loading';
import { resetPasswordApply } from '../../../api/resetPassword/resetPassword';
import ResetPasswordResult from './ResetPasswordResult/ResetPasswordResult';

export default function RegisterMain() {
  const [resetPasswordForm, setResetPasswordForm] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [applyStatus, setApplyStatus] = useState(false);
  const [applySuccessStatus, setApplySuccessStatus] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await resetPasswordApply(resetPasswordForm);
      setApplySuccessStatus(true);
    } catch (e) {
      setApplySuccessStatus(false);
    } finally {
      setApplyStatus(true);
      setLoading(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm({ ...resetPasswordForm, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.resetPasswordMain}>
      <img src={Icon} alt="TechScrum Icon" />
      <form onSubmit={handleSubmit}>
        {applyStatus ? (
          <ResetPasswordResult successFlag={applySuccessStatus} />
        ) : (
          <>
            <h1>Forget Password</h1>
            <input
              className={styles.email}
              type="email"
              placeholder="Enter email address"
              name="email"
              defaultValue={resetPasswordForm.email}
              onChange={onChangeHandler}
              required
              data-testid="email"
            />
            <button type="submit" data-testid="next">
              Next
            </button>
            <div className={styles.formFooter}>
              <Link to="/login">Login</Link>
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
