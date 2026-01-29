import express from 'express';
import { EntriesController } from '../controllers/index.mjs';

const router = express.Router();
const { createEntry, getAllEntries, getEntry, removeEntry, updateEntry } = EntriesController;

router.post('/', createEntry);
router.get('/', getAllEntries);
router.get('/:id', getEntry);
router.delete('/:id', removeEntry);
router.put('/:id', updateEntry);

export const entriesRouter = router;