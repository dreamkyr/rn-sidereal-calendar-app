export const isEmpty = (value) => {
  return value === undefined || value === null || value === '' || value.toString().replace(/\s/g, '') === '';
};
