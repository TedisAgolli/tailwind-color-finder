import { urlObjectKeys } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import styles from "../styles/Home.module.css";
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
        val: subColor[1],
        lab: hexToLab(subColor[1]),
      });
      //   colors[colorName][subColor[0]] = hexToLab(subColor[1]);
    });
  });
  return allColors;
};

const getClosestTailwindColorToHex = (hex) => {
  const userInputLab = hexToLab(hex);
};

export default function Home() {
  //   const lab2 = hexToLab(tailwindColors.black);
  //   console.log(deltaE(lab1, lab2));
  const lab1 = hexToLab("#0070F3");
  var labTailwind = tailwindColorsToLab(tailwindColors)
    .map((col) => ({
      deltaE: deltaE(col.lab, lab1),
      ...col,
    }))
    .sort((a, b) => a.deltaE - b.deltaE);
  const closestCol = labTailwind[0];
  console.log();

  return (
    <div>
      {`The closest color is ${closestCol.main}-${closestCol.sub} with a deltaE of ${closestCol.deltaE}`}
    </div>
  );
}
