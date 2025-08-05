export const defaultErrorMessage = (label) => {
  return {
    required: `${label} is required`,
    min: `Minimum `,
    max: `Maximum `
  };
};

export const getErrorMessage = (value, props) => {
  const { required = false, label = '', min = null, max = null } = props;

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
  return null;
};
