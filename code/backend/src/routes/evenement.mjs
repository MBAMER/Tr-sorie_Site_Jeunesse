import express from 'express';
import { EvenementController } from '../controllers/index.mjs';

const router = express.Router();
const { createEvent, getAllEvents, getEvenement, removeEvenement, updateEvenement } = EvenementController;

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEvenement);
router.delete('/:id', removeEvenement);
router.put('/:id', updateEvenement);

export const evenementRouter = router;