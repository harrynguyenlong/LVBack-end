const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const Like = require('../../models/likeModel');

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

            // update postId to User
            const user = await User.findById(req.userId);

            if (!user) {
                throw new Error('User not found');
            }

            user.postIds.push(post._id);
            user.numberOfPosts += 1;
            await user.save();

            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // get all post sort by newest
    posts: async (args, req) => {
        try {
            const limit = args.limit ? args.limit * 1 : 10;
            let sort = {};
            switch (args.type) {
                case 'NEWEST':
                    sort = { createdAt: -1 };
                    break;
                case 'TOPCOMMENTS':
                    break;
                case 'TOPLIKES':
                    break;
                default:
                    sort = { createdAt: -1 };
                    break;
            }

            const posts = await Post.find().sort(sort).limit(limit);

            // console.log('POST', posts);

            if (!posts) {
                throw new Error('Get all posts failed, please try again');
            }

            posts.map((post) => {
                // console.log('userLikeIds', post.userLikeIds);
                const isLike = post.userLikeIds.find((item) => item._id.toString() === req.userId);
                if (isLike) {
                    return (post.isLiked = true);
                } else {
                    return (post.isLiked = false);
                }
            });

            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
