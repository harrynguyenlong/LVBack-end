const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const bcrypt = require('bcrypt');

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
                //autopopulate: true,
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

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
