import { useState } from "react";
import { deltaE, rgb2lab } from "../utils/colors";
import tailwindColors from "../utils/tailwindColors";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const hexToLab = (hex) => {
  const rgb = hexToRgb(hex);
  return rgb2lab([rgb.r, rgb.g, rgb.b]);
};

const tailwindColorsToLab = (colors) => {
  const allColors = [];
  Object.entries(colors).forEach((color) => {
    const colorName = color[0];
    Object.entries(color[1]).forEach((subColor) => {
      allColors.push({
        main: colorName,
        sub: subColor[0],
        hex: subColor[1],
        lab: hexToLab(subColor[1]),
      });
    });
  });
  return allColors;
};

const labTailwind = tailwindColorsToLab(tailwindColors);
export default function Home() {
  const [colorInput, setColorInput] = useState("");
  const [closestCol, setClosestCol] = useState("");
  const onColorInputChange = (e) => {
    setColorInput(e.target.value);
  };
  const findClosest = (e) => {
    e.preventDefault();
    const labColorInput = hexToLab(colorInput);
    const comparedColors = labTailwind
      .map((col) => ({
        deltaE: deltaE(col.lab, labColorInput),
        ...col,
      }))
      .sort((a, b) => a.deltaE - b.deltaE);
    setClosestCol(comparedColors[0]);
  };

  return (
    <div>
      <form onSubmit={findClosest}>
        <input
          type="text"
          onChange={onColorInputChange}
          value={colorInput}
          placeholder="Enter hex color here"
        ></input>
        <button type="submit">Find closest</button>
      </form>
      {closestCol &&
        `The closest color is ${closestCol.main}-${closestCol.sub} (hex ${closestCol.hex}) with a deltaE of ${closestCol.deltaE}`}
    </div>
  );
}
