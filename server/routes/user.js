import express from 'express';

import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/user.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router(); // to create the router

//read routes
router.get('/:id', verifyToken, getUser); // get all user
router.get('/:id/friends', verifyToken, getUserFriends); // get all user friends

//update routes
router.patch('/:id/friendId', verifyToken, addRemoveFriend); // add or remove friend

export default router; // to export the router