import express from "express";
import { clerkClient } from "@clerk/express";

const router = express.Router();

// IMPORTANT: raw body needed
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const payload = req.body;
    const event = JSON.parse(payload.toString());

    console.log("Webhook event:", event.type);
    console.log("DATA:", event.data); // 🔥 debug

    const userId = event.data?.customer_id; // ✅ FIX

    if (!userId) {
      console.log("❌ No userId found");
      return res.sendStatus(200);
    }

    if (
      event.type === "subscription.created" ||
      event.type === "subscription.updated"
    ) {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          plan: "premium",
        },
      });

      console.log("✅ User upgraded to premium");
    }

    if (event.type === "subscription.deleted") {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          plan: "free",
        },
      });

      console.log("❌ User downgraded to free");
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(400);
  }
});

export default router;