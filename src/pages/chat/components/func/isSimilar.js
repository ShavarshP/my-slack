export const isSimilar = (a1, a2) => {
  if (a1.length !== a2.length) {
    return false;
  }
  return a1.every((item) => a2.some((item2) => item === item2));
};
