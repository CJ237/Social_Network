const User = require('../models/User');

module.exports = {
    async getUsers(req, rec){
        try{
            const users = await User.find();
            res.json(users);
        } catch(err){
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, rec) {
        try {
        const user = await User.findOne({_id: req.params.id}).select('-__v');
        if(!user){
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
        }  catch (err) {
        res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user= await User.findOneAndDelete({_id: req.params.id});
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(err);

        }catch(err){
            res.status(500).json(err);
        }
    },
    async updateUser(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!user){
                return res.status(404).json({message: 'No user with that ID'});
            }

        } catch(err){
            res.status(500).json(err);
        }
    },
    async addFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$addToSet: {friends: req.params.friendsId}},
                {runValidators: true, new: true},
            );
            if(!user){
                return res.status(404).json({message: 'No friends with ID'});
            }
        }   catch (err){
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: {friends: req.params.friendsId}},
                {runValidators: true, new: true},
            );
            if(!user){
                return res.status(404).json({message: 'User has no friend with that ID'});
            }
        } catch(err){
            res.status(500).json(err);
        }
    } 
};