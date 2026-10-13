import { Router } from 'express';
import { getContent, updateContent, resetContent } from '../controllers/content.controller';

const router = Router();

router.get('/', getContent);
router.put('/', updateContent);
router.post('/reset', resetContent);

export default router;
