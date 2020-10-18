import Joi from 'joi';

export class Validator {
    static async getUserParams(params) {
        const schema = Joi.array().items(
            Joi.object().keys({
                id: Joi.string().hex().length(24),
                person_id: Joi.string(),
                name: Joi.string(),
                tags: Joi.array(),
                from: Joi.string(),
                botStatus: Joi.string(),
                lastMessageTime: Joi.string(),
                createdAt: Joi.string(),
                updatedAt: Joi.string(),
            })
        )
        const { error, value } = schema.validate(params);
        if (error) {
          throw new Error(error);
        }
        return value;
      }
}