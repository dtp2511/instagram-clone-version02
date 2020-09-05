export const removeLastCharacter = (num, str) => {
  if (num > 1) return str;
  return (str = str.substring(0, str.length - 1));
};
