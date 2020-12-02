import React from "react";

export default function ColorSquare({ hex, isOriginal, tailwind }) {
  return (
    <div className="flex flex-col items-center m-4 ">
      <div className="text-lg">{isOriginal ? "Original" : "Tailwind"}</div>
      <div
        className="w-28 h-28 m-2 rounded-lg outline-black"
        style={{ backgroundColor: hex }}
      ></div>
      <div className="font-bold">{tailwind}</div>
      <div className="text-gray-300">{hex}</div>
    </div>
  );
}
