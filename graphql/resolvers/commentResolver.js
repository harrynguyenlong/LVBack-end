const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const Comment = require('../../models/commentModel');

module.exports = {
    // create comment
    createComment: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }
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

            console.log(comment);
            return comment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // get comments by postId
    comments: async (args) => {
        try {
            const comments = await Comment.find({ postId: args.postId });
            if (!comments) {
                throw new Error('Get comments failed');
            }

            return comments;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // delete comments
    deleteComment: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const user = await User.findById(req.userId);
            const comment = await Comment.findById(args.commentId);

            if (!comment || !user) {
                throw new Error('Could not found');
            }

            const post = await Post.findById(comment.postId._id);

            if (!post) {
                throw new Error('Could not found');
            }

            user.numberOfComments -= 1;
            post.numberOfComments -= 1;

            await user.save();
            await post.save();

            const commentDelete = await Comment.findByIdAndDelete(args.commentId).populate(
                'postId'
            );
            if (!commentDelete) {
                throw new Error('Delete comment failed');
            }

            return commentDelete;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
