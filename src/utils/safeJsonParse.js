export const safeJsonParse = (data) => {
  if (!data) {
    return null;
  }
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    return null;
  }
};
