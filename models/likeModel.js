const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const likeSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            autopopulate: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true,
        },
    },
    {
        timestamps: true,
    }
);

likeSchema.plugin(autopopulate);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
