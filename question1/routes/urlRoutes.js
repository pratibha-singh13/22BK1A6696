import express from "express";
import { shortenUrl, redirectToOriginal } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", redirectToOriginal);

export default router;
