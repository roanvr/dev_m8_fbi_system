import express from 'express';
const router = express.Router();
import { home, signInFunction, dashboardController } from '../controllers/agentControl.js';

router.get('/', home);
router.get('/signIn', signInFunction);
router.get('/dashboard', dashboardController);






export default router;