export const searchFunc = (str1, str2) => {
  if (!str1) {
    return true;
  }

  return str1
    .split("")
    .every((item, index) => item.toUpperCase() === str2[index].toUpperCase());
};
