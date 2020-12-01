import React from "react";

export default function ColorSquare({ hex, isOriginal }) {
  return (
    <div className="flex flex-col">
      <div className="text-lg">{isOriginal ? "Original" : "Tailwind"}</div>
      <div
        className="w-24 h-24 m-2 bg-red-500"
        style={{ backgroundColor: hex }}
      ></div>
    </div>
  );
}
