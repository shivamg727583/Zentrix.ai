import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});



export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();

    const user = await clerkClient.users.getUser(userId);

    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;
    if (plan !== "premium" && free_usage >= 10) {
      return res
        .status(403)
        .json({
          error: "You have reached your monthly limit for article generation.",
        });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      extra_body: {
        google: {
          thinking_config: {
            thinking_level: "high",
            include_thoughts: true,
          },
        },
      },
      temperature: 0.7,
      max_tokens: length,
    });

    const article = response.choices[0].message.content;

    await sql`INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${article},'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    console.error("Error generating article:", error);
    res.status(500).json({ error: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();

    const user = await clerkClient.users.getUser(userId);

    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;
    if (plan !== "premium" && free_usage >= 10) {
      return res
        .status(403)
        .json({
          error: "You have reached your monthly limit for article generation.",
        });
    }

    const response = await openai.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

   const generatedTitle = response.choices?.[0]?.message?.content;

if (!generatedTitle || generatedTitle.trim() === "") {
  return res.status(500).json({
    error: "Failed to generate content from AI",
  });
}

    await sql`INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${generatedTitle},'blog_title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, data: generatedTitle });
  } catch (error) {
    console.error("Error generating blog title:", error);
    res.status(500).json({ error: error.message });
  }
};

export const generateImages = async (req, res) => {
  try {
    const { userId } = req.auth();

    const user = await clerkClient.users.getUser(userId);

    const { prompt, publish } = req.body;
    const plan = req.plan;
    if (plan !== "premium") {
      return res
        .status(403)
        .json({
          error: "You must be a premium user to generate images.",
        });
    }

    const form = new FormData()
form.append('prompt', prompt)
const response = await axios.post('https://clipdrop-api.co/text-to-image/v1', form, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': process.env.CLIPDROP_API_KEY
    },
    responseType: 'arraybuffer'
})
 
 const base64Image = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;

 const {secure_url} = await cloudinary.uploader.upload(base64Image);



    await sql`INSERT INTO creations(user_id,prompt,content,type,publish) VALUES(${userId},${prompt},${secure_url},'image',${publish ?? false} )`;

   
    res.json({ success: true, data: secure_url });
  } catch (error) {
    console.error("Error generating article:", error);
    res.status(500).json({ error: error.message });
  }
};