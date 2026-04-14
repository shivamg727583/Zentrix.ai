import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";


const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});





export const generateArticle = async(req,res)=>{
    try {
        const {userId} = req.auth();
        const {prompt , length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        if(plan !== 'premium' && free_usage >= 10){
            return res.status(403).json({error: 'You have reached your monthly limit for article generation.'});
        }

        const response = await openai.chat.completions.create({
    model: "gemini-3-flash-preview",
    messages: [{role: "user",
         content: prompt,}],
    extra_body: {
      "google": {
        "thinking_config": {
          "thinking_level": "high",
          "include_thoughts": true
        }

      }
    }
    ,
    temperature: 0.7,
    max_tokens: length,
});

   const article = response.choices[0].message.content;

   await sql `INSERT INTO creations(user_id,prompt,content,type) VALUES(${userId},${prompt},${article},'article')`;

   if(plan !== 'premium'){
    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata:{
            free_usage: free_usage + 1
        }
    });
   }
        res.json({success:true,data:article});


    } catch (error) {
        console.error("Error generating article:", error);
        res.status(500).json({ error: error.message });
    }
}