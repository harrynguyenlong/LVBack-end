const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const Like = require('../../models/likeModel');

module.exports = {
    // like post
    likePost: async (args, req) => {
        try {
            const user = await User.findById(req.userId);
            const post = await Post.findById(args.postId);

            if (!post || !user) {
                throw new Error('Could not found');
            }

            const isLiked = await Like.findOne({
                $and: [{ postId: post._id }, { userId: user._id }],
            });

            // create like
            if (!isLiked) {
                const newLike = {
                    postId: post._id,
                    userId: user._id,
                };
                const like = await Like.create(newLike);

                if (!like) {
                    throw new Error('Create new like failed, please try again');
                }

                user.numberOfLikes += 1;

                post.isLiked = true;
                post.numberOfLikes += 1;
                post.userLikeIds.push(req.userId);
            } else {
                // remove like

                await Like.findByIdAndDelete(isLiked._id);

                user.numberOfLikes -= 1;

                post.isLiked = false;
                post.numberOfLikes -= 1;

                let updatedUserLikeIds = [...post.userLikeIds];
                updatedUserLikeIds = updatedUserLikeIds.filter((userLike) => {
                    userLike.toString() !== user._id.toString();
                });

                post.userLikeIds = updatedUserLikeIds;
            }

            await user.save();
            await post.save();

            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
