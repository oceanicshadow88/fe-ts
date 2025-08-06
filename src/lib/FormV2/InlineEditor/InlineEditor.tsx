import React, { TextareaHTMLAttributes, useRef, useState } from 'react';
import { PiCheckBold, PiWarningDiamondFill, PiWarningFill } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';

interface IInlineEditor extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChanged?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDestroy: () => void;
  onSave: (content: string) => void;
  defaultValue: string;
  dataTestId: string;
  maxLength?: number;
}

export default function InlineEditor({
  onValueChanged,
  onDestroy,
  onSave,
  defaultValue,
  dataTestId,
  maxLength = 225,
  ...props
}: IInlineEditor) {
  const [requiredError, setRequiredError] = useState<null | string>(null);
  const [maxLengthError, setMaxLengthError] = useState<null | string>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const requiredErrorMessage = getErrorMessage(e.target.value, {
      required: true,
      label: 'Summary'
    });
    const maxLengthErrorMessage = getErrorMessage(e.target.value, {
      limit: maxLength
    });

    if (requiredErrorMessage) setRequiredError(requiredErrorMessage);
    if (maxLengthErrorMessage) setMaxLengthError(maxLengthErrorMessage);
    onValueChanged?.(e);
  };

  const handleSave = () => {
    if (textareaRef.current) {
      const requiredErrorMessage = getErrorMessage(textareaRef.current.value, {
        required: true,
        label: 'Summary'
      });

      if (requiredErrorMessage) {
        setRequiredError(requiredErrorMessage);
      } else {
        onSave(textareaRef.current.value);
      }
    }
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        defaultValue={defaultValue}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        className={[
          styles.inlineEditor,
          requiredError ? styles.borderError : '',
          maxLengthError ? styles.borderWarning : ''
        ].join(' ')}
        onChange={handleTextareaValueChange}
        data-testid={dataTestId}
        maxLength={maxLength}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <div className={styles.btnSetContainer}>
        <button>
          <RxCross2 size={18} onClick={onDestroy} />
        </button>
        <button>
          <PiCheckBold size={18} onClick={handleSave} />
        </button>
      </div>
      {requiredError && (
        <span className={styles.inlineErrorMessage}>
          <PiWarningDiamondFill size={16} />
          <p>{requiredError}</p>
        </span>
      )}
      {maxLengthError && (
        <span className={styles.inlineErrorMessage}>
          <PiWarningFill size={16} className={styles.warningColor} />
          <p>{maxLengthError}</p>
        </span>
      )}
    </>
  );
}
