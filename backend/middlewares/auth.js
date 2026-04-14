import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = req.auth(); 
console.log("Headers:", req.headers);
console.log("UserId:", userId);
  

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    const hasPremium = user.privateMetadata?.plan === 'premium';

    if (!hasPremium && user.privateMetadata?.free_usage > 0) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0
        }
      });
      req.free_usage = 0;
    }

    req.plan = hasPremium ? 'premium' : 'free';

    next();

  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};