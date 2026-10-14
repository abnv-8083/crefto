import { Router } from 'express';
import { handleContactForm, getContacts } from '../controllers/contact.controller';

const router = Router();

router.post('/', handleContactForm);
router.get('/', getContacts);

export default router;
