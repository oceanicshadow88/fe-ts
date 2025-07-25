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

  const handleChange = (field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormValues((prev) => ({ ...prev, [field]: value }));
      const { rules } = projectFormConfig[field];
      const error = getErrorMessage(value, { ...rules, label: String(field) });
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    };
  };

  const handleBlur = (field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement> | IMinEvent) => {
      const { value } = e.target;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };
  };

  const validateAll = () => {
    const newErrors = {} as Record<keyof T, string | null>;
    let isValid = true;

    Object.keys(formValues).forEach((key: keyof T) => {
      const value = formValues[key];
      const { rules } = projectFormConfig[key];
      const error = getErrorMessage(value, { ...rules, label: key });
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
    handleChange,
    handleBlur,
    validateAll
  };
}
