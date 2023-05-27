import e from 'express';
import post from '../models/post.js';

// Create post
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: description,
            userPicturePath: user.picturePath,
            picturePath: picturePath,
            likes: {},
            comments: [],
        });
        
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error.message });
    }
}

// Read post
export const getFeedPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({message: error.message});
    }   
}

//Read user posts
export const getUserPosts = async (req, res) => {
    try{
        const {userId} = req.params;
        const posts = await Post.find({userId: userId});
        res.status(200).json(posts);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

// Update post
export const likePost = async (req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}