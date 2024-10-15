const {Thought, User } = require('../models');

module.exports = {
    async getAllThoughts (req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        } 
        catch(err){
            res.status(500).json(err);
        }
    },
    async getThought (req, res){
        try{
            const thought = await Thought.findOne(
                {_id:req.params.id});
                if(!thought){
                   return res.status(404).json({message: 'No thought with ID'});
                }
                res.json(thought);
        } catch (err){
            return res.status(500).json(err);
        }
    },
    async createThought (req, res){
        try {
            const thought = await Thought.create(req.body);
            if(!thought){
                return res.status(404).json({message: 'No thought created'});
            }
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {thoughts: thought._id}},
                {runValidators: true, new: true},
            );
            if(!user){
                return res.status(404).json({message: 'No user'});
            }
            return 
        } catch(err){
            return res.status(500).json(err);
        }
    }
};