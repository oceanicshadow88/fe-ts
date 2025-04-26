import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import EmailInput from '../EmailInput/EmailInput';
import styles from './InvoiceForm.module.scss';

interface Props {
  invoiceEmail: string | undefined;
}

export default function InvoiceForm(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { invoiceEmail } = props;

  // State getting from child
  const handleValidChange = (isFormValid: boolean) => {
    setIsValid(isFormValid);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
    if (isEditing) {
      toast.success('Email updated successfully.', { theme: 'colored', autoClose: 2000 });
    }
  };

  const btnClassName = isValid
    ? `${styles.pageBtn}`
    : `${styles.pageBtn} ${styles.pageBtn__disabled}`;

  return (
    <form className={styles.invoice__form} onSubmit={onSubmit}>
      <span className={styles.textSecondary}>Send copies of invoices to</span>
      <EmailInput
        isEditing={isEditing}
        invoiceEmail={invoiceEmail}
        onValueChange={() => {}}
        onValidChange={handleValidChange}
      />
      <button className={btnClassName} type="submit" disabled={!isValid}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </form>
  );
}
