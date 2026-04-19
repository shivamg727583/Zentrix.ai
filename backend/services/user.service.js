import sql from "../configs/db.js";

export const saveCreation = async (
  userId,
  prompt,
  content,
  type,
  publish = false
) => {
  await sql`
    INSERT INTO creations(user_id, prompt, content, type, publish)
    VALUES(${userId}, ${prompt}, ${content}, ${type}, ${publish})
  `;
};

export const getUserCreationsService = async (userId) => {
  return await sql`
    SELECT * FROM creations 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
};

export const getPublishedCreationsService = async () => {
  return await sql`
    SELECT * FROM creations 
    WHERE publish = true 
    ORDER BY created_at DESC
  `;
};

export const toggleLikeService = async (userId, creationId) => {
  const result = await sql`
    SELECT * FROM creations WHERE id=${creationId}
  `;

  if (!result.length) throw new Error("Creation not found");

  const creation = result[0];
  const currentLikes = creation.likes || [];
  const userStr = userId.toString();

  let updatedLikes;

  if (currentLikes.includes(userStr)) {
    updatedLikes = currentLikes.filter((l) => l !== userStr);
  } else {
    updatedLikes = [...currentLikes, userStr];
  }

  const formatted = `{${updatedLikes.join(",")}}`;

  await sql`
    UPDATE creations 
    SET likes = ${formatted}::TEXT[] 
    WHERE id=${creationId}
  `;

  return updatedLikes;
};