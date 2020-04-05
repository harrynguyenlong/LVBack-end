const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const commentSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        contentText: {
            type: String,
            maxlength: 500,
        },
    },
    { timestamps: true }
);

commentSchema.plugin(autopopulate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
