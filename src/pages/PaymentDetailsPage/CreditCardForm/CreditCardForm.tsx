import React, { useReducer, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CardInput from './CardInput';
import styles from './CreditCardForm.module.scss';
import { reducer, ReducerActionTypes, initState } from './CreditCardFormReducer';

const typeOptions = ['visa', 'mastercard', 'amex', 'discover'];
const FULLNAME_REGEX = /^[A-Z]+(?:\s[A-Z]+)?$/;
const CARD_NUMBER_REGEX = /^\d{16}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/([2-9]\d)$/;

export default function CreditCardForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [reducerState, dispatch] = useReducer(reducer, initState);

  const { type, holder, number, expiry } = reducerState;

  const cardNumber = `${number.slice(0, 4)}*****${number.slice(-3)}`;

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      dispatch({ type: ReducerActionTypes.FormReset });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, action: ReducerActionTypes) => {
    if (action === ReducerActionTypes.SetExpiry) {
      const formattedValue = e.target.value
        .replace(/[^\d/]/g, '')
        .slice(0, 5)
        .replace(/^(\d{2})/, '$1/')
        .replace(/\/+/, '/');

      dispatch({
        type: action,
        payload: formattedValue
      });
    } else if (action === ReducerActionTypes.SetHolder) {
      dispatch({
        type: action,
        payload: e.target.value.toUpperCase()
      });
    } else {
      dispatch({
        type: action,
        payload: e.target.value
      });
    }
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: ReducerActionTypes.SetType,
      payload: e.target.value
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }
    dispatch({ type: ReducerActionTypes.FormSubmit });
    setIsChecked(false);
    toast.success('Credit card updated!', { theme: 'colored', autoClose: 2000 });
  };

  useEffect(() => {
    const isAllRegexPassed = [
      FULLNAME_REGEX.test(holder),
      CARD_NUMBER_REGEX.test(number),
      EXPIRY_REGEX.test(expiry)
    ].every((each) => each);
    setIsFormValid(isAllRegexPassed);
  }, [holder, number, expiry]);

  return (
    <form className={styles.creditCard__container} onSubmit={handleSubmit}>
      <h4>Credit card direct debit account details for contributions</h4>
      <h5 className={styles.flexAlign}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.creditCard__checkBox}
        />
        <span>Change my credit card details</span>
      </h5>
      <div className={styles.creditCard}>
        <div className={styles.creditCard__grid__item}>
          <h4>Card type:</h4>
          <select
            className={`${styles.creditCard__inputBox} ${styles.creditCard__inputBox__wide}`}
            onChange={onSelectChange}
            disabled={!isChecked}
            value={type}
          >
            {typeOptions.map((e) => (
              <option key={e} value={e}>
                {e.replace(/^\w/, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Cardholder name:</h4>
          <CardInput
            type="text"
            value={holder}
            regex={FULLNAME_REGEX}
            placeholder="JOHN DOE"
            onChange={(e) => onInputChange(e, ReducerActionTypes.SetHolder)}
            disabled={!isChecked}
          />
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Card number:</h4>
          {isChecked ? (
            <CardInput
              type="text"
              value={number}
              regex={CARD_NUMBER_REGEX}
              placeholder="16 DIGITs"
              onChange={(e) => onInputChange(e, ReducerActionTypes.SetNumber)}
              disabled={!isChecked}
            />
          ) : (
            <input
              className={styles.creditCard__inputBox}
              type="text"
              value={cardNumber}
              disabled={!isChecked}
            />
          )}
        </div>
        <div className={styles.creditCard__grid__item}>
          <h4>Card expiry:</h4>
          <CardInput
            type="text"
            value={expiry}
            regex={EXPIRY_REGEX}
            placeholder="MM/YY"
            onChange={(e) => onInputChange(e, ReducerActionTypes.SetExpiry)}
            disabled={!isChecked}
          />
        </div>
      </div>
      <button
        className={
          isChecked && isFormValid
            ? styles.cardUpdateBtn
            : `${styles.cardUpdateBtn} ${styles.cardUpdateBtn__disabled}`
        }
        type="submit"
        disabled={!isChecked || !isFormValid}
      >
        Update
      </button>
    </form>
  );
}
