import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';                                         
import User from '../models/user.js';       

// Register user
export const register = async (req, res) => {
    try {
        // get the data from the request body
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the user
        const newUser = new User({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random()*10000),
            impression: Math.floor(Math.random()*10000)
         });

        // save the user to the database
        const saveUser = await newUser.save();
        // create the token
        const token = jwt.sign({ email: saveUser.email, id: saveUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // send the token and the user
        res.status(201).json({ saveUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error.message });
    }
}   ;

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        // check if the user exists
        if (!user) return res.status(404).json({ message: "User not found" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);    
        // check if the password is correct
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        // create the token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        delete user.password;
        // send the token and the user
        res.status(200).json({ user, token });  
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error.message });
    }
}   ;

// Update user
