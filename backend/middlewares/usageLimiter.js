import { clerkClient } from "@clerk/express";

export const checkUsage = (limit = 10) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.auth();

      if (req.plan !== "premium" && req.free_usage >= limit) {
        return res.status(403).json({
          error: "Free usage limit reached",
        });
      }

      // increment after success → attach helper
      req.incrementUsage = async () => {
        if (req.plan !== "premium") {
          await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
              free_usage: req.free_usage + 1,
            },
          });
        }
      };

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};