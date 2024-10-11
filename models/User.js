const { Schema, model } = require('mongoose');

// Initialize our User model

// Define the schema for our User model

const userSchema = new Schema({
    username: 
    { type: String, 
        required: true, 
        unique: true,
        Trimmed
},
    email: 
    { 
        type: String, 
        required: true, 
        unique: true ,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was Wrong, please enter a valid email address",]
},
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: "Thoughts"
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

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});
const User = model("User", userSchema);

module.exports = User;
