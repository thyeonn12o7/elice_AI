export const divisionNumbers = (number, x) => {
  return `${
    number > 1000000
      ? (number / 1000000).toFixed(x)
      : (number / 1000).toFixed(x)
  }${number > 1000000 ? "M" : "K"}`;
};
