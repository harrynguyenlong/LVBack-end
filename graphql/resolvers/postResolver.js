const Post = require('../../models/postModel');
const User = require('../../models/userModel');

module.exports = {
    // create post
    createPost: async (args, req) => {
        try {
            // console.log(req.userId, req.isAuth);
            if (!req.userId && !req.isAuth === true) {
                throw new Error('Unauthenticated');
            }

            const { contentText, postImageUrl } = args;
            const newPost = {
                userId: req.userId,
                contentText,
                postImageUrl,
            };
            const post = await Post.create(newPost);

            if (!post) {
                throw new Error('Created post failed, please try again');
            }

            console.log(post);

            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
