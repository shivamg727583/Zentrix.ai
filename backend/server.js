import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, getAuth ,clerkClient} from '@clerk/express';
import webhookRoutes from "./routes/webhook.js";
import cloudinaryConfig from './configs/cloudinary.config.js';

const app = express();

app.use(cors());

await cloudinaryConfig();


// ⚠️ IMPORTANT: before express.json()
app.use("/api/webhook", webhookRoutes);

app.use(express.json());
app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })
);

app.get("/", (req, res) => {
  res.send("Server is Live!");
});





app.use('/api/ai', (await import('./routes/aiRoutes.js')).default);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});