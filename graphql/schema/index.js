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
        # likeIds: [Post!]
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
        isLiked: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Like {
        _id: ID!
        postId: Post!
        userId: User!
        createdAt: String!
        updatedAt: String!
    }

    type Comment {
        _id: ID!
        userId: User!
        postId: Post!
        contentText: String!
        createdAt: String!
        updatedAt: String!
    }

    enum FilterPostType {
        NEWEST
        TOPCOMMENTS
        TOPLIKES
    }

    type RootQuery {
        posts(type: FilterPostType, limit: Int): [Post!]
    }

    type RootMutation {
        createPost(contentText: String!, postImageUrl: String!): Post!
        createComment(postId: ID!, contentText: String!): Comment!
        likePost(postId: ID!): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
