import React, { useState } from 'react';
import { getErrorMessage } from '../utils/formUtils';
import { IMinEvent } from '../types';

type FieldOptions = {
  required?: boolean;
  min?: number;
  max?: number;
  label?: string;
};

type FormField = {
  value: string;
  rules?: FieldOptions;
};

type FormConfig<T> = Record<keyof T, FormField>;

export function useForm<T extends Record<string, string | null>>(projectFormConfig: FormConfig<T>) {
  const [formValues, setFormValues] = useState<T>(
    Object.keys(projectFormConfig).reduce((acc, key: keyof T) => {
      acc[key] = projectFormConfig[key].value as T[keyof T];
      return acc;
    }, {} as T)
  );
  const [formErrors, setFormErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(projectFormConfig).reduce((acc, key: keyof T) => {
      acc[key] = null;
      return acc;
    }, {} as Record<keyof T, string | null>)
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    const { rules } = projectFormConfig[name];
    const error = getErrorMessage(value, { ...rules, label: name });
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldBlur = (e: React.ChangeEvent<HTMLInputElement> | IMinEvent) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateAll = () => {
    const newErrors = {} as Record<keyof T, string | null>;
    let isValid = true;

    Object.keys(formValues).forEach((key: keyof T) => {
      const value = formValues[key];
      const { rules } = projectFormConfig[key];
      const error = getErrorMessage(value, { ...rules, label: String(key) });
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setFormErrors(newErrors);
    return isValid;
  };

  return {
    formValues,
    setFormValues,
    formErrors,
    handleFieldChange,
    handleFieldBlur,
    validateAll
  };
}
