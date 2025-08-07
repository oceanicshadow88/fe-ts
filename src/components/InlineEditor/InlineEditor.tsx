import React, { TextareaHTMLAttributes, useRef, useState } from 'react';
import { PiCheckBold, PiWarningDiamondFill, PiWarningFill } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { getErrorMessage } from '../../utils/formUtils';
import styles from './InlineEditor.module.scss';

export interface IInlineEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSave: (content: string) => void;
  onClose: () => void;
  defaultValue: string;
  dataTestId: string;
  maxLength?: number;
}

export default function InlineEditor({
  onSave,
  onClose,
  defaultValue,
  dataTestId,
  maxLength = 225,
  ...props
}: IInlineEditorProps) {
  const [requiredError, setRequiredError] = useState<null | string>(null);
  const [maxLengthError, setMaxLengthError] = useState<null | string>(null);
  const [value, setValue] = useState<string>(defaultValue);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const isValueUpdated = defaultValue !== value;

  const handleTextareaValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const requiredErrorMessage = getErrorMessage(e.target.value, {
      required: true,
      label: 'Summary'
    });
    const maxLengthErrorMessage = getErrorMessage(e.target.value, {
      limit: maxLength
    });

    setRequiredError(requiredErrorMessage);
    setMaxLengthError(maxLengthErrorMessage);

    setValue(e.target.value);
  };

  const handleSave = () => {
    if (!isValueUpdated) {
      onClose();
    } else if (!requiredError && !maxLengthError) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      handleSave();
    }
  };
  const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (wrapperRef.current?.contains(next)) return; // still inside editor
    onClose();
  };

  return (
    <div onBlurCapture={handleBlurCapture} ref={wrapperRef} className={styles.textareaWrapper}>
      <textarea
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={handleTextareaValueChange}
        value={value}
        className={[
          styles.inlineEditor,
          requiredError ? styles.borderError : '',
          maxLengthError ? styles.borderWarning : ''
        ].join(' ')}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        data-testid={dataTestId}
        maxLength={maxLength}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.btnSetContainer}>
        <button type="button" onClick={onClose} onMouseDown={(e) => e.preventDefault()}>
          <RxCross2 size={18} />
        </button>
        <button type="button" onClick={handleSave} onMouseDown={(e) => e.preventDefault()}>
          <PiCheckBold size={18} />
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
    </div>
  );
}
