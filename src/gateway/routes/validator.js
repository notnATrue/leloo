// import Joi from 'joi';

export class Validator {
    static async getUserParams(params) {
        if (params === "Too many requests, please try again later") {
            return false;
        }
        return params;
    }
}