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
  label?: string;
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

  const formFields = Object.keys(projectFormConfig).reduce((acc, key: keyof T) => {
    acc[key] = { ...projectFormConfig[key], value: formValues[key] };
    return acc;
  }, {} as FormConfig<T>);

  const [formErrors, setFormErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(projectFormConfig).reduce((acc, key: keyof T) => {
      acc[key] = null;
      return acc;
    }, {} as Record<keyof T, string | null>)
  );

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement> | IMinEvent) => {
    const { name, value } = e.target;
    const currentField = formFields[name];
    setFormValues((prev) => ({ ...prev, [name]: { ...currentField, value } }));
  };

  const handleFieldChangeNValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange(e);
    const { name, value } = e.target;
    const { rules, label } = formFields[name];
    const error = getErrorMessage(value, { ...rules, label });
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {} as Record<keyof T, string | null>;
    let isValid = true;
    Object.keys(formFields).forEach((key: keyof T) => {
      const { value, label, rules } = formFields[key];
      if (rules) {
        const error = getErrorMessage(value, { ...rules, label });
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });
    setFormErrors(newErrors);
    return isValid;
  };

  return {
    formFields,
    formValues,
    setFormValues,
    formErrors,
    handleFieldChange: handleFieldChangeNValidation,
    handleFieldBlur: handleFieldChange,
    validateAll
  };
}
