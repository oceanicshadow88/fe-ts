import { FieldRuleOptions } from '../types';

export const defaultErrorMessage = (label) => {
  return {
    required: `${label} is required`,
    min: `Minimum `,
    max: `Maximum `,
    limit: ` character limit`
  };
};

export const getErrorMessage = (value, props: FieldRuleOptions) => {
  const { required = false, label = '', min = null, max = null, limit = null } = props;

  if (required && !value) {
    return defaultErrorMessage(label).required;
  }
  if (min && value) {
    if (min > value) {
      return defaultErrorMessage(label).min + min;
    }
  }
  if (max && value) {
    if (max < value) {
      return defaultErrorMessage(label).max + max;
    }
  }
  if (limit && value) {
    if (limit === value.length) {
      return limit + defaultErrorMessage(label).limit;
    }
  }
  return null;
};
