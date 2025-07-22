import { nanoid } from "nanoid";
import { Url } from "../models/Url.js";

const BASE_URL = "https://localhost:3000"; 

export const shortenUrl = async (req, res) => {
  try {
    const { url, validity, shortCode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }

    const finalShortCode = shortCode || nanoid(6);

    const existing = await Url.findOne({ shortCode: finalShortCode });
    if (existing) {
      return res.status(409).json({ error: "Short code already exists" });
    }

    const expiry = Date.now() + (validity || 30) * 60 * 1000; 

    const newUrl = new Url({
      longUrl: url,
      shortCode: finalShortCode,
      expiresAt: new Date(expiry),
    });

    await newUrl.save();

    return res.status(201).json({
      shortLink: `${BASE_URL}/${finalShortCode}`,
      expiry,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short code not found" });
    }

    if (urlDoc.expiresAt.getTime() < Date.now()) {
      return res.status(410).json({ error: "Short URL has expired" });
    }

    return res.redirect(urlDoc.longUrl);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
