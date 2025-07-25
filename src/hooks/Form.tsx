import React, { useState } from 'react';
import { getErrorMessage } from '../utils/formUtils';

type FormValue = Record<string, string | undefined>;

type FieldOptions = {
  required?: boolean;
  min?: number;
  max?: number;
  label?: string;
};

export function useForm<T extends FormValue>(
  initialValues: T,
  fieldValidateRules: Record<keyof T, FieldOptions>
) {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [formErrors, setFormErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(initialValues).reduce((acc, key: keyof T) => {
      acc[key] = null;
      return acc;
    }, {} as Record<keyof T, string | null>)
  );

  const handleChange = (field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };
  };

  const handleBlur = (field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const rules = fieldValidateRules[field];
      const error = getErrorMessage(value, { ...rules, label: String(field) });
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    };
  };

  const validateAll = () => {
    const newErrors = {} as Record<keyof T, string | null>;
    let isValid = true;

    Object.keys(formValues).forEach((key: keyof T) => {
      const value = formValues[key];
      const rules = fieldValidateRules[key];
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
