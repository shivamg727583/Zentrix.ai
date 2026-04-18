import express from 'express';
const router = express.Router();
import { generateArticle, generateBlogTitle, generateImages } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

router.post('/generate-article', auth, generateArticle);
router.post('/generate-blog-title', auth, generateBlogTitle);
router.post('/generate-images', auth, generateImages);

export default router;