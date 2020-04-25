const Joi = require('joi');
const HttpError = require('../../utils/httpError');

module.exports = Joi.object().keys({
    contentText: Joi.string()
        .min(3)
        .max(500)
        .label('ContentText')
        .error(
            new HttpError(
                'Content must be at least 3 characters and max 500 characters',
                422,
                'contentText'
            )
        ),

    postImageUrl: Joi.string()
        .required()
        .min(55) // uploads/images/5e89d609098dcb277f87d1ed-1587728658271.x = 55 characters
        .max(60)
        .label('PostImageUrl')
        .error(new HttpError('Image must be required', 422, 'postImageUrl')),
});
