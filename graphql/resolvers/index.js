const postResolver = require('./postResolver');
const likeResolver = require('./likeResolver');
const commentResolver = require('./commentResolver');
const userResolver = require('./userResolver');

const rootResolver = {
    ...postResolver,
    ...likeResolver,
    ...commentResolver,
    ...userResolver
};

module.exports = rootResolver;
