export const formatNumberToIntWithCommas = (value: number) => {
  return value.toLocaleString('en-US', { minimumFractionDigits: 0 });
};
