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
            maxlength: 500,
        },
        postImageUrl: {
            type: String,
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
