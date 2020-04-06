const postResolver = require('./postResolver');
const likeResolver = require('./likeResolver');

const rootResolver = {
    ...postResolver,
    ...likeResolver,
};

module.exports = rootResolver;
