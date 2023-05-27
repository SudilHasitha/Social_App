import User from "../models/user.js";

//read 
export const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends);
    }catch(error){
        res.status(404).json({message: error.message});
    }
};

//update
export const addRemoveFriend = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(!user.friends.includes(friendId)){
            await user.updateOne({$push: {friends: friendId}});
            await friend.updateOne({$push: {friends: id}});
            res.status(200).json("user has been added to friends");
        }else{
            await user.updateOne({$pull: {friends: friendId}});
            await friend.updateOne({$pull: {friends: id}});
            res.status(200).json("user has been removed from friends");
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        
        res.status(200).json(formattedFriends);

    }catch(error){
        res.status(404).json({message: error.message});
    }
}
