// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import hexToTailwind from "hex-to-tailwind";

export default (req, res) => {
  let { hex } = req.query;
  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }
  const resValue = hexToTailwind(hex);
  if (resValue) {
    res.status(200).json(resValue);
  } else {
    res.status(400).json({ error: "Invalid hex value" });
  }
};
