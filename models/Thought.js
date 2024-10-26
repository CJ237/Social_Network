const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thought_text: 
    { type: String, 
        required: true, 
        maxlength: 280
},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: { 
        type: String, 
        required: true
    },
    reactions: [Reaction],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
