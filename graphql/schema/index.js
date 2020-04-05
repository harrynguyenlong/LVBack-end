const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        avatarUrl: String
        roles: String
        numberOfPosts: Int!
        numberOfComments: Int!
        numberOfLikes: Int
        postIds: [Post!]
        likeIds: [Post!]
        createdAt: String!
        updatedAt: String!
    }

    type Post {
        _id: ID!
        userId: User!
        contentText: String!
        postImageUrl: String!
        numberOfLikes: Int!
        numberOfComments: Int!
        userLikeIds: [User!]
        createdAt: String!
        updatedAt: String!
    }

    type RootQuery {
        posts: [Post]
    }

    type RootMutation {
        createPost(contentText: String!, postImageUrl: String!): Post
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
