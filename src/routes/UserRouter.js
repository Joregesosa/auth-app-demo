import { Router } from 'express';
import {index, remove, show,store, update} from '../controllers/UserController.js';

export const user_router = Router();

user_router.get('/', index);
user_router.get('/:id', show);
user_router.post('/', store);
user_router.put('/:id', update);
user_router.delete('/:id', remove);

export default user_router;