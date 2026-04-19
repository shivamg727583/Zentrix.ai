import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";

// TEXT → IMAGE
export const generateImageFromPrompt = async (prompt) => {
  const form = new FormData();
  form.append("prompt", prompt);

  const response = await axios.post(
    "https://clipdrop-api.co/text-to-image/v1",
    form,
    {
      headers: {
        ...form.getHeaders(),
        "x-api-key": process.env.CLIPDROP_API_KEY,
      },
      responseType: "arraybuffer",
    }
  );

  const base64 = Buffer.from(response.data, "binary").toString("base64");

  const { secure_url } = await cloudinary.uploader.upload(
    `data:image/png;base64,${base64}`
  );

  return secure_url;
};

// REMOVE BACKGROUND
export const removeBackground = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    transformation: [
      {
        effect: "background_removal",
        background_removal: "remove_the_background",
      },
    ],
  });

  return result.secure_url;
};

// REMOVE OBJECT (FIXED)
export const removeObject = async (filePath, object) => {
  const upload = await cloudinary.uploader.upload(filePath);

  const cleanedObject = object.toLowerCase().replace(/\s+/g, "_");

  // using generative fill (more reliable)
  const url = cloudinary.url(upload.public_id, {
    transformation: [
      {
        effect: `gen_fill:prompt_remove_${cleanedObject}`,
      },
    ],
  });

  return url;
};