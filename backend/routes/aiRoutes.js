import express from 'express';
const router = express.Router();
import { generateArticle, generateBlogTitle, generateImages, removeBgImage, removeObjectImage, resumeReview } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';
import { upload } from '../configs/multer.js';

router.post('/generate-article', auth, generateArticle);
router.post('/generate-blog-title', auth, generateBlogTitle);
router.post('/generate-images', auth, generateImages);
router.post('/remove-image-background', upload.single('image'), auth, removeBgImage);
router.post('/remove-image-object', upload.single('image'), auth, removeObjectImage);
router.post('/resume-review', upload.single('resume'), auth, resumeReview);

export default router;