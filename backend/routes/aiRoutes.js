import express from 'express';
const router = express.Router();
import { generateArticle } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

router.post('/generate-article', auth, generateArticle);

export default router;