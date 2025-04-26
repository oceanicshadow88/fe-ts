import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

interface IAutoWidthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  minWidth?: number;
  className?: string;
}

export default function AutoWidthInput({
  value: propValue,
  onChange,
  placeholder,
  minWidth = 20,
  className
}: IAutoWidthInputProps) {
  const [value, setValue] = useState<string>(propValue ?? '');
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (propValue === undefined) return;
    setValue(propValue);
  }, [propValue]);

  useEffect(() => {
    if (!spanRef.current || !inputRef.current) return;

    const spanWidth = spanRef.current.offsetWidth;
    const newWidth = Math.max(spanWidth + 2, minWidth);
    inputRef.current.style.width = `${newWidth}px`;
  }, [value, minWidth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <span
        ref={spanRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          fontSize: 'inherit',
          fontFamily: 'inherit'
        }}
      >
        {value ?? placeholder ?? ' '}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        style={{
          minWidth: `${minWidth}px`,
          boxSizing: 'border-box',
          flexGrow: 1
        }}
      />
    </div>
  );
}
