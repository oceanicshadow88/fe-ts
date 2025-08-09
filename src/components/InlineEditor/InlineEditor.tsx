import React, { TextareaHTMLAttributes, useRef } from 'react';
import { PiCheckBold, PiWarningDiamondFill } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import styles from './InlineEditor.module.scss';

export interface IInlineEditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChanged: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  onClose: () => void;
  name: string;
  defaultValue: string;
  errorMsg?: string;
  dataTestId: string;
  maxLength?: number;
}

export default function InlineEditor({
  onValueChanged,
  onSave,
  onClose,
  name,
  defaultValue,
  errorMsg = '',
  dataTestId,
  maxLength = 225,
  ...props
}: IInlineEditorProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      onSave();
      onClose();
    }
  };
  const handleBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (wrapperRef.current?.contains(next)) return;
    onClose();
  };

  return (
    <div onBlurCapture={handleBlurCapture} ref={wrapperRef} className={styles.textareaWrapper}>
      <textarea
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={onValueChanged}
        defaultValue={defaultValue}
        name={name}
        className={[styles.inlineEditor, errorMsg && styles.borderError].join(' ')}
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
        <button type="button" onClick={onSave} onMouseDown={(e) => e.preventDefault()}>
          <PiCheckBold size={18} />
        </button>
      </div>
      {errorMsg && (
        <span className={styles.inlineErrorMessage}>
          <PiWarningDiamondFill size={16} />
          <p>{errorMsg}</p>
        </span>
      )}
    </div>
  );
}
