import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ImCross } from 'react-icons/im';
import { TiTick, TiTimes } from 'react-icons/ti';
import Modal from '../../../lib/Modal/Modal';
import DefaultModalBody from '../../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import InputV3 from './InputV3';
import styles from './ContactForm.module.scss';
import { reducer, ReducerActionTypes, initState } from './ContactFormReducer';
import { sendEmail } from '../../../api/contact/contact';

const FULLNAME_REGEX = /^[a-zA-Z ]{1,40}$/;
const COMPANY_REGEX = /^[a-zA-Z0-9][-a-zA-Z0-9 ']*[a-zA-Z0-9]$/;
const PHONE_REGEX = /^(\+[\d\s]{6,14}\d|(61\s?|\(61\))?\s?04[.\-\s]?\d{7,9})$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const MESSAGE_REGEX = /^.{1,200}$/;
const enquiryTitles = [
  `Just saying hi!`,
  `I'd like to request a feature`,
  `I have a question about billing`,
  `I'm confused about how something works`,
  `Other`
];

export default function ContactForm() {
  const [title, setTitle] = useState(enquiryTitles[0]);
  const [isFormValid, setIsFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEmailSuccess, setIsEmailSuccess] = useState(true);
  const [modal, setModal] = useState(false);
  const [reducerState, dispatch] = useReducer(reducer, initState);

  const handleTitleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(e.target.value);
  };

  const handleFullNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetFullName,
      payload: e.target.value
    });
  };

  const handleCompanyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetCompany,
      payload: e.target.value
    });
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetPhone,
      payload: e.target.value
    });
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerActionTypes.SetEmail,
      payload: e.target.value
    });
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: ReducerActionTypes.SetMsg,
      payload: e.target.value
    });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // here check if obj valid
    const isAllFilled = Object.values(reducerState).every((item) => item.length > 0);
    const isAllRegexPassed = [
      FULLNAME_REGEX.test(reducerState.fullName),
      PHONE_REGEX.test(reducerState.phone),
      EMAIL_REGEX.test(reducerState.email)
    ].every((each) => each);

    if (!isAllFilled || !isAllRegexPassed) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
    const contactMessageObj = { ...reducerState, title };
    dispatch({ type: ReducerActionTypes.FormReset });
    setLoading(true);

    try {
      const response = await sendEmail(contactMessageObj);
      setModal(true);
      if (response.status === 202) {
        setIsEmailSuccess(true);
      }
    } catch (err) {
      setIsEmailSuccess(false);
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.contactForm} onSubmit={submitHandler}>
          {!isFormValid && (
            <p className={styles.errMsg} data-cy="form-error-msg">
              Please valid your form.
            </p>
          )}
          {loading && (
            <p className={styles.loading} data-cy="form-loading-msg">
              Receiving...
            </p>
          )}
          <div className={styles.inputField}>
            <label htmlFor="enquiryTitles">
              What&#39;s up *
              <select name="enquiryTitles" id="enquiryTitles" onChange={handleTitleSelect}>
                {enquiryTitles.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <InputV3
            value={reducerState.fullName}
            onChange={handleFullNameInput}
            type="text"
            label="Full name *"
            identifier="name"
            regex={FULLNAME_REGEX}
            errMsg="Field required, lettes only, seperated with spaces, 40 char max"
          />
          <InputV3
            value={reducerState.company}
            onChange={handleCompanyInput}
            type="text"
            label="Company *"
            identifier="company"
            regex={COMPANY_REGEX}
            errMsg="Field required, ensure the validation of your company."
          />
          <InputV3
            value={reducerState.phone}
            onChange={handlePhoneInput}
            type="tel"
            label="Phone Number *"
            identifier="phone"
            regex={PHONE_REGEX}
            errMsg="Field required, ensure the validation of your number."
          />
          <InputV3
            value={reducerState.email}
            onChange={handleEmailInput}
            type="email"
            label="Email address *"
            identifier="email"
            regex={EMAIL_REGEX}
            errMsg="Field required, must be a valid email."
          />
          <InputV3
            value={reducerState.message}
            onChange={handleMsgInput}
            type="text"
            label="Any more info you can provide *"
            identifier="message"
            tagType="textarea"
            regex={MESSAGE_REGEX}
            errMsg="Field required, 200 char max."
          />
          <button className={styles.contactForm} type="submit" data-cy="sub-btn">
            Send
          </button>
          <p className={styles.desc}>
            TechScrum values your privacy. By submitting this form, you acknowledge TechScrum may
            use your email in accordance with its{' '}
            <Link to="/privacy-policy" className={styles.link}>
              Privacy Policy.{' '}
            </Link>
            Unsubscribe from our emails at any time.
          </p>
        </form>
      </div>
      {modal &&
        ReactDOM.createPortal(
          <Modal fullWidth data-cy="modal">
            <div className={styles.close}>
              <ImCross onClick={() => setModal(false)} />
            </div>
            <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
              <div className={styles.iconPosition}>
                {isEmailSuccess ? (
                  <TiTick size={200} color="yellowgreen" />
                ) : (
                  <TiTimes size={200} color="orangered" />
                )}
              </div>
              <div className={styles.messagePosition}>
                {isEmailSuccess ? (
                  <h2 data-cy="success-msg">
                    Thanks for contacting us from this page, we will reply via email asap.
                  </h2>
                ) : (
                  <h2>Some error happened, we will try to fix it soon</h2>
                )}
              </div>
            </DefaultModalBody>
          </Modal>,
          document.body
        )}
    </>
  );
}
