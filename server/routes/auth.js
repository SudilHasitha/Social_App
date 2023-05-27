import express from 'express';
import {login} from '../controllers/auth.js';

const router = express.Router(); // to create the router
router.post('/login', login); // login route
export default router; // to export the router