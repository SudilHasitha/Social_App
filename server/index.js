// import previously installed packages
import express from 'express';          // to create the server
import bodyParser from 'body-parser';       // to parse the body of the request
import mongoose from 'mongoose';    // to connect to the database
import cors from 'cors';        // to connect to the frontend
import dotenv from 'dotenv';    // to hide the connection string
import multer from 'multer';    // to upload files
import path from 'path';        // to upload files  
import helmet from 'helmet';    // to secure the app
import morgan from 'morgan';    // to log the requests
import { fileURLToPath } from 'url';  // to upload files
import { register } from './controllers/auth.js'; // to upload files
import authRoutes from './routes/auth.js';        // to upload files
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/post.js';
import User from './models/user.js';
import Post from './models/post.js';
import { users, posts } from './data/index.js';

// configurations
const __filename = fileURLToPath(import.meta.url);      // to upload files
const __dirname = path.dirname(__filename);             // to upload files  
dotenv.config();                                        // to hide the connection string    
const app = express();                                  // to create the server
app.use(helmet());                                      // to secure the app
app.use(express.json({ limit: '30mb', extended: true }));   // to parse the body of the request
app.use(express.urlencoded({ limit: '30mb', extended: true })); // to parse the body of the request
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // to secure the app
app.use(cors());                                        // to connect to the frontend
app.use(morgan('common'));                              // to log the requests
app.use('/asserts', express.static(path.join(__dirname, 'public/asserts'))); // to upload files need to change to S3 bucket

// File Storage
const storage = multer.diskStorage({            
    destination: (req, file, cb) => {               
        cb(null, 'public/asserts');         
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },                                              
});                 
const upload = multer({ storage: storage });         // to upload files

// Routes with files
/* Here is the explanation for the code above:
1. The first parameter is the endpoint. In this case, it is '/auth/register'. So, in order to use this route, we need to add '/auth/register' at the end of the URL. For example, if the URL is 'http://localhost:3000', then the full URL to use this route is 'http://localhost:3000/auth/register'.
2. The second parameter is the middleware. In this case, we use the upload.single("picture") middleware. This middleware is used to handle file upload. The 'picture' word in the upload.single("picture") is the name of the file input in the form.
3. The third parameter is the controller function. In this case, we use the register function in the controllers/auth.js file. 
*/
app.post('auth/register', upload.single("picture"), register); // to upload files
app.post('/post', verifyToken,upload.single("picture"), createPost); // to upload files

// Routes without files
app.use('/auth', authRoutes); 
app.use('/user', userRoutes); 
app.use('/post', postRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;               // to hide the connection string
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }) // to hide the connection string  
    .then(() => { 
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
        // User.insertMany(users);
        // Post.insertMany(posts);
    }) // to hide the connection string
    .catch((error) => console.log(error.message));    // to hide the connection string


