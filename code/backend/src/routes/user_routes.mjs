import express from 'express';
import { authenticateToken } from '../middlewares.mjs';
import { UserController } from '../controllers/index.mjs';

const router = express.Router();
const { createUser, getUser, editUser, deleteCurrentUser } = UserController;

router.post('/', createUser);
// Assuming get user by id is public or handles its own auth logic inside (original code didn't have middleware here)
// User controller has logic: const user_id = req.sub || req.params.id; 
// So it can work with both.
router.get('/:id', getUser);
router.delete('/:id', authenticateToken, deleteCurrentUser);
router.put('/:id', authenticateToken, editUser);

export const userRouter = router;