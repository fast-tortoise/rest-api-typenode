import express from 'express';

import {getAllUsers, deleteUser, updateUser} from '../controllers/users';
import { isAuththenticated, isOwner } from '../middlewares';

export default (router:express.Router) => {
    router.get('/users', isAuththenticated, getAllUsers);
    router.delete('/users/:id',isAuththenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuththenticated, isOwner, updateUser);
};