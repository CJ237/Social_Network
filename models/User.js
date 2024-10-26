const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: 
    { type: String, 
        required: true, 
        unique: true,
        trim: true
},
    email: 
    { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was Wrong, please enter a valid email address",]
},
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
}],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
}],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
