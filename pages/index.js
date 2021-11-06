import { useState } from "react";
import ColorSquare from "../components/ColorSquare";
import Head from "next/head";
import hexToTailwind from "hex-to-tailwind";

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

export default function Home() {
  const [colorInput, setColorInput] = useState("");
  const [closestCol, setClosestCol] = useState("");
  const onColorInputChange = (e) => {
    setColorInput(e.target.value);
    setClosestCol(hexToTailwind(hexInput));
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-800 min-h-screen">
      <Head>
        <title>Hex to Tailwind Converter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="my-10 text-center text-white text-5xl">
        Hex to Tailwind Converter
      </h1>
      <input
        type="text"
        onChange={onColorInputChange}
        value={colorInput}
        className="shadow-md m-2 p-2 border-gray-300 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm rounded-md"
        placeholder="Enter hex color here"
      />
      {isValidHex(colorInput) && closestCol && (
        <div className="flex flex-col text-center text-white text-lg m-2">
          <span className="text-base">
            Delta E ={" "}
            <span className=" text-lg font-semibold">{closestCol.deltaE}</span>
          </span>
          <div className="text-sm text-gray-300">
            {explainDeltaE(closestCol.deltaE)}{" "}
            <a href="http://zschuessler.github.io/DeltaE/learn/">
              <sup>[1]</sup>
            </a>
          </div>
          <div className="flex flex-row justify-center m-2">
            <ColorSquare hex={colorInput} isOriginal />
            <ColorSquare
              tailwind={closestCol.tailwind}
              hex={closestCol.tailwindHex}
              isOriginal={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
