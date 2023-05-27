import  express from "express";
import {getFeedPosts, getUserPosts, likePost} from '../controllers/post.js';
import {verifyToken} from '../middleware/auth.js';

const router = express.Router(); // to create the router

//read routes
router.get('/', verifyToken, getFeedPosts); // get all user posts
router.get('/:userId/posts', verifyToken, getUserPosts); // get all user posts

//update routes
router.patch('/:id/like', verifyToken, likePost); // like or unlike a post

export default router; // to export the router