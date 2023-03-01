export const safeIntegerParse = (
  numberOrString,
  onlyPositiveNumbers = true
) => {
  if (numberOrString === null || numberOrString === undefined) {
    return null;
  }
  try {
    const parsed = parseInt(numberOrString);
    if (Number.isNaN(parsed)) {
      return null;
    }
    if (onlyPositiveNumbers && parsed <= 0) {
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
};
