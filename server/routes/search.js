import { Router } from 'express';
import KikeBot from '../controllers/kikebot';

const botRouter = Router();

botRouter.post('/incoming', KikeBot.googleSearch);

export default botRouter;