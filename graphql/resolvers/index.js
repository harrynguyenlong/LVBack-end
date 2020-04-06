const postResolver = require('./postResolver');
const likeResolver = require('./likeResolver');
const commentResolver = require('./commentResolver');

const rootResolver = {
    ...postResolver,
    ...likeResolver,
    ...commentResolver,
};

module.exports = rootResolver;
