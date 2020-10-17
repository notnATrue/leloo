import Joi from 'joi';

export class Validator {
  static async getUserParams(params) {
    const schema = Joi.not()
    const { error, value } = schema.validate(params);
    if (error) {
        console.error(`error inside validator ${ error }`);
        return error;
    }
    return value;
  }
}