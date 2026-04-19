import fs from "fs";
import pdfParse from "pdf-parse";

import { generateText } from "../services/ai.service.js";
import {
  generateImageFromPrompt,
  removeBackground,
  removeObject,
} from "../services/image.service.js";
import { saveCreation } from "../services/user.service.js";
import {
  articlePrompt,
  blogTitlePrompt,
  resumeReviewPrompt,
} from "../utils/promptBuilder.js";
import { success, error } from "../utils/responseHandler.js";

// ARTICLE
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const article = await generateText({
      systemPrompt: articlePrompt(prompt),
      userPrompt: prompt,
      maxTokens: length,
    });

    await saveCreation(userId, prompt, article, "article");
    await req.incrementUsage();

    success(res, article);
  } catch (err) {
    error(res, err);
  }
};

// BLOG TITLE
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const titles = await generateText({
      systemPrompt: blogTitlePrompt(prompt),
      userPrompt: prompt,
    });

    await saveCreation(userId, prompt, titles, "blog_title");
    await req.incrementUsage();

    success(res, titles);
  } catch (err) {
    error(res, err);
  }
};

// IMAGE
export const generateImages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const imageUrl = await generateImageFromPrompt(prompt);

    await saveCreation(userId, prompt, imageUrl, "image", publish);
    success(res, imageUrl);
  } catch (err) {
    error(res, err);
  }
};

// REMOVE BG
export const removeBgImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const file = req.file;

    const url = await removeBackground(file.path);

    await saveCreation(userId, "remove background", url, "image");
    success(res, url);
  } catch (err) {
    error(res, err);
  }
};

// REMOVE OBJECT
export const removeObjectImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const file = req.file;
    const { object } = req.body;

    const url = await removeObject(file.path, object);

    await saveCreation(
      userId,
      `remove ${object}`,
      url,
      "image"
    );

    success(res, url);
  } catch (err) {
    error(res, err);
  }
};

// RESUME REVIEW (FIXED)
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const file = req.file;

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF allowed" });
    }

    const buffer = fs.readFileSync(file.path);

   
    const parsed = await pdfParse(buffer);

    const feedback = await generateText({
      systemPrompt: resumeReviewPrompt(parsed.text),
      userPrompt: "Review this resume",
      maxTokens: 1000,
    });

    await saveCreation(userId, "resume review", feedback, "resume_review");

    success(res, feedback);
  } catch (err) {
    error(res, err);
  }
};