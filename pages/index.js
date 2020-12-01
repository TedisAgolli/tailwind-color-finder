import { useState } from "react";
import { deltaE, rgb2lab } from "../utils/colors";
import tailwindColors from "../utils/tailwindColors";
import ColorSquare from "../components/ColorSquare";

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
      <div className="flex flex-col items-center bg-gray-200 min-h-screen">
        <form onSubmit={findClosest}>
          <input
            type="text"
            onChange={onColorInputChange}
            value={colorInput}
            class="shadow-md m-2 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter hex color here"
          />
          <button
            type="submit"
            class="m-1 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Find closest
          </button>
        </form>
        {closestCol &&
          `The closest color is ${closestCol.main}-${closestCol.sub} (hex ${closestCol.hex}) with a deltaE of ${closestCol.deltaE}`}
        <div className="flex flex-row m-2">
          <ColorSquare hex={colorInput} isOriginal />
          <ColorSquare hex={closestCol.hex} isOriginal={false} />
        </div>
      </div>
    </div>
  );
}
