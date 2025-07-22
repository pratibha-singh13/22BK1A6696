import { nanoid } from "nanoid";
import { Url } from "../models/Url.js";

const BASE_URL = "http://localhost:3000";

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl, customCode, validityMinutes } = req.body;

    if (!longUrl) return res.status(400).json({ error: "longUrl is required" });

    let shortCode = customCode || nanoid(6);
    const exists = await Url.findOne({ shortCode });

    if (exists) return res.status(409).json({ error: "Short code already exists" });

    const expiresAt = new Date(Date.now() + (validityMinutes || 30) * 60 * 1000);

    const newUrl = new Url({ longUrl, shortCode, expiresAt });
    await newUrl.save();

    res.status(201).json({ shortUrl: `${BASE_URL}/api/${shortCode}`, expiresAt });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) return res.status(404).json({ error: "Short code not found" });

    if (urlDoc.expiresAt < new Date()) {
      return res.status(410).json({ error: "Short URL has expired" });
    }

    res.redirect(urlDoc.longUrl);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
