export const defaultErrorMessage = (label) => {
  return {
    required: `${label} is required`,
    min: `Minimum `,
    max: `Maximum `
  };
};

export const getErrorMessage = (e, props) => {
  const { required = false, label = '', min = null, max = null } = props;

  if (required && !e.target.value) {
    return defaultErrorMessage(label).required;
  }
  if (min && e.target.value) {
    if (min > e.target.value) {
      return defaultErrorMessage(label).min + min;
    }
  }
  if (max && e.target.value) {
    if (max < e.target.value) {
      return defaultErrorMessage(label).max + max;
    }
  }
  return null;
};
