const HttpError = require('../../utils/httpError');
const Post = require('../../models/postModel');
const User = require('../../models/userModel');
const Joi = require('joi');
const { PostValidate } = require('../validations');

const fs = require('fs');

module.exports = {
    // create post
    createPost: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const { contentText, postImageUrl } = args;

            await Joi.validate(args, PostValidate);

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

            post.isLiked = false;
            return post;
        } catch (error) {
            return error;
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
                    sort = { numberOfComments: -1 };
                    break;
                case 'TOPLIKES':
                    sort = { numberOfLikes: -1 };
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
                const isLike = post.userLikeIds.find((item) => {
                    return item._id.toString() === args.userId.toString();
                });
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

    // get all posts by user Id
    postsByUser: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            if (args.userId.toString() !== req.userId.toString()) {
                throw new Error('User not match');
            }

            const posts = await Post.find({ userId: req.userId });

            if (!posts) {
                throw new Error('Get all posts by User failed, please try again');
            }

            posts.map((post) => {
                const isLike = post.userLikeIds.find((item) => {
                    return item._id.toString() === req.userId.toString();
                });
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

    // delete post
    deletePost: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const isPostByUser = await Post.findById(args.postId);

            if (!isPostByUser) {
                throw new Error('Can not find the post');
            }

            if (isPostByUser.userId._id.toString() !== req.userId.toString()) {
                throw new Error('You have not permistion to delete this post');
            }

            const imagePath = isPostByUser.postImageUrl;

            const post = await Post.findByIdAndDelete(args.postId);

            if (!post) {
                throw new Error('Delete post failed');
            }

            // delete postId from User
            const user = await User.findById(req.userId);

            if (!user) {
                throw new Error('User not found');
            }

            user.numberOfPosts -= 1;

            let updatedPostIds = [...user.postIds];
            console.log('before', updatedPostIds);
            updatedPostIds = updatedPostIds.filter((postId) => {
                // console.log(postId.toString(), post._id.toString())
                return postId.toString() !== post._id.toString();
            });

            console.log('after', updatedPostIds);
            user.postIds = updatedPostIds;

            await user.save();

            // delete image file in folder uploads/images
            fs.unlink(imagePath, (err) => {
                console.log(err);
            });

            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    // edit posts
    editPost: async (args, req) => {
        try {
            if (!req.userId && !req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const post = await Post.findById(args.postId);

            if (!post) {
                throw new Error('Could not found the post');
            }

            const { contentText, postImageUrl } = args;

            let updatePostData;

            if (postImageUrl === 'undefined') {
                updatePostData = {
                    contentText: contentText,
                    postImageUrl: post.postImageUrl,
                };
                await Joi.validate(updatePostData, PostValidate);
            } else {
                updatePostData = {
                    contentText,
                    postImageUrl,
                };
                await Joi.validate(updatePostData, PostValidate);
                fs.unlink(post.postImageUrl, (err) => {
                    console.log(err);
                });
            }

            const updatedPost = await Post.findByIdAndUpdate(post._id, updatePostData, {
                new: true,
            });

            // console.log(updatedPost);
            return updatedPost;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};
