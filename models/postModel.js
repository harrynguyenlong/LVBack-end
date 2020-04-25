const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true,
            required: true,
        },
        contentText: {
            type: String,
            minLength: [3, 'Content must have more or equal then 3 characters'],
            maxlength: [500, 'Content must have less or equal then to 500 characters'],
            // required: [true, 'Content must be required'],
        },
        postImageUrl: {
            type: String,
            required: [true, 'The post must have image'],
        },
        numberOfLikes: {
            type: Number,
            default: 0,
            min: [0, 'Number of likes must be positive numbers'],
        },
        numberOfComments: {
            type: Number,
            default: 0,
            min: [0, 'Number of comments must be positive numbers'],
        },
        userLikeIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                // autopopulate: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

postSchema.plugin(autopopulate);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
