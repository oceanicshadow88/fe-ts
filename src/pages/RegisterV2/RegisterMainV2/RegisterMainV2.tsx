import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import styles from './RegisterMainV2.module.scss';
import Icon from '../../../assets/logo.svg';
import { userRegister } from '../../../api/registerV2/registerV2';
import Email from '../../../assets/email.png';
import { emailValidation } from '../../../utils/helpers';

export default function RegisterMainV2() {
  const [company, setCompany] = useState('');
  const [emailRecorder, setEmailRecorder] = useState('');
  const [emailVerifyProcess, setEmailVerifyProcess] = useState(false);
  const [disableRegisterButton, setDisableRegisterButton] = useState<boolean>(true);

  const handleCompanyChange = (companyName: string) => {
    const isCompanyValid = companyName.trim() !== '';
    const isEmailValid = emailValidation(emailRecorder);
    setCompany(companyName);
    setDisableRegisterButton(!(isEmailValid && isCompanyValid));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    const isEmailValid = emailValidation(email);
    const isCompanyValid = company.trim() !== '';
    setEmailRecorder(email);
    setDisableRegisterButton(!(isEmailValid && isCompanyValid));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { email: emailRecorder, company };
    try {
      await userRegister(data);
      setEmailVerifyProcess(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred, please try again');
      }
    }
  };

  return (
    <div className={styles.registerMainContainer}>
      <img className={styles.techScrumIcon} src={Icon} alt="TechScrum Icon" />
      <form className={styles.registerForm}>
        {emailVerifyProcess && (
          <div className={styles.registerEmailBoxContainer}>
            <div className={styles.emailBoxImgContainer}>
              <img src={Email} alt="Email Icon" className={styles.emailBoxImg} />
            </div>
            <h1 className={styles.emailBoxNotification}>
              Email has been sent, Please check your email
            </h1>
          </div>
        )}
        {!emailVerifyProcess && (
          <>
            <h1 className={styles.registerTitle}>Register To Continue</h1>
            <div className={styles.registerCompany}>
              <input
                className={styles.registerCompanyInput}
                placeholder="Company name"
                type="text"
                name="company"
                onChange={(e) => {
                  handleCompanyChange(e.target.value);
                }}
              />
              <p>.techscrum.com</p>
            </div>
            <input
              placeholder="Enter your email address"
              type="email"
              name="email"
              onChange={handleEmailChange}
            />
            <p className={styles.registerPolicy}>
              By registering, I accept the&nbsp;
              <Link to="/terms-of-service" target="_blank" className={styles.registerPolicyLink}>
                TechScrum Terms of Service&nbsp;
              </Link>
              and confirm acceptance of the&nbsp;
              <Link to="/privacy-policy" target="_blank" className={styles.registerPolicyLink}>
                Privacy Policy.
              </Link>
            </p>
            <button
              type="submit"
              className={styles.registerSubmitBtn}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                handleSubmit(e);
              }}
              disabled={disableRegisterButton}
            >
              Register
            </button>
            <div className={styles.registerLoginContainer}>
              <Link to="/login" className={styles.registerLogin}>
                Already have TechScrum Account? Login
              </Link>
            </div>
          </>
        )}
      </form>
      <div className={styles.registerFooter}>
        <p className={styles.registerFooterText}>
          <Link to="/privacy-policy" target="_blank" className={styles.registerFooterTextLink}>
            Privacy Policy
          </Link>
          &nbsp;and&nbsp;
          <Link to="/terms-of-service" target="_blank" className={styles.registerFooterTextLink}>
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}
