const explainDeltaE = (deltaE) => {
  if (deltaE <= 1.0) {
    return "Not perceptible by human eyes";
  } else if (deltaE > 1 && deltaE <= 2) {
    return "Perceptible through close observation";
  } else if (deltaE > 2 && deltaE <= 10) {
    return "Perceptible at a glance";
  } else if (deltaE > 10 && deltaE <= 49) {
    return "Colors are more similar than opposite";
  } else {
    return "Colors are exact opposite";
  }
};
const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

export { explainDeltaE, isValidHex };
