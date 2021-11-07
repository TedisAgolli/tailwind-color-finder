// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import hexToTailwind from "hex-to-tailwind";
import { explainDeltaE } from "../utils";

export default (req, res) => {
  let hex = req.query.keywords;

  if (hex === undefined) {
    res.status(200).json({
      inputPlaceholder: "Type a hex color",
      view: "Type a hex color",
    });
    return;
  }
  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }
  const resValue = hexToTailwind(hex);
  if (resValue) {
    res.status(200).json(showCopyTailwind(resValue));
  } else {
    res.status(200).json({
      view: "Invalid color.",
    });
  }
};

function showCopyTailwind({ tailwind, deltaE }) {
  return {
    inputPlaceholder: "",
    view: {
      ranking: false,
      type: "list",
      options: [
        {
          title: `Copy Tailwind: ${tailwind} `,
          action: { type: "copy", value: tailwind },
          subtitle: [`DeltaE: ${deltaE}`, explainDeltaE(deltaE)],
        },
      ],
    },
  };
}
