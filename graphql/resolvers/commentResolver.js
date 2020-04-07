const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const Comment = require('../../models/commentModel');

module.exports = {
    // create comment
    createComment: async (args, req) => {
        try {
            const user = await User.findById(req.userId);
            const post = await Post.findById(args.postId);

            if (!post || !user) {
                throw new Error('Could not found');
            }

            const newComment = {
                userId: user._id,
                postId: post._id,
                contentText: args.contentText,
            };

            user.numberOfComments += 1;
            post.numberOfComments += 1;

            await user.save();
            await post.save();
            const comment = await Comment.create(newComment);

            if (!comment) {
                throw new Error('Created comment failed, please try again');
            }

            return comment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};