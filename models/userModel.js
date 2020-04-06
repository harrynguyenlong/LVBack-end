const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
        },
        roles: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        numberOfPosts: {
            type: Number,
            default: 0,
        },
        numberOfComments: {
            type: Number,
            default: 0,
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
        postIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
                autopopulate: true,
            },
        ],
        // likeIds: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Post',
        //         // autopopulate: true,
        //     },
        // ],
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

module.exports = User;
