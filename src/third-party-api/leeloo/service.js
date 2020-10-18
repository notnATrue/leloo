import request from "request";
import { UserModel } from "./model";
import { Validator } from "./validator";
import { GET_USER_DETAILS, GET_USERS } from "../../common/custom-urls";

export class ThirdPartyAPI {
    async customRequest(options) {
        return new Promise(function(resolve, reject) {
            return request(options,async function (error, response, dto) {
                if (error) {
                    reject(error);
                }
                const validator = new Validator();
                const validatedParsedDTO = await validator.isJSON(dto).catch(err => reject(err));
                const prepareData = validatedParsedDTO.data;
                resolve(prepareData);
            });
        });
    };

    async getUsers() {
        try {
            const userModel = new UserModel();
            const options = await userModel.optionGenerator(GET_USERS);
            const users = await this.customRequest(options);
            return users;
        } catch(err) {
            throw new Error(err);
        };
    };

    async getUsersDetails(userIds) {
        try {
            let usersDetails = [];
            for (const userId of userIds) {
                const userModel = new UserModel();
                const options = await userModel.optionGenerator(GET_USER_DETAILS, userId);
                const userDetail = await this.customRequest(options);
                const prepareData = await userModel.pickUsersInfo(userDetail);
                usersDetails.push(prepareData);
            };
            return usersDetails;
        } catch(err) {
            throw new Error(err)
        }
    };

    async getOrder(id) {
        try {
            const userModel = new UserModel();
            const options = await userModel.generateGetOrderIdOption(id);
            const orders = await this.customRequest(options);
            return orders;
        } catch(err) {
            throw new Error(err);
        }
    };
}

export default { 
    ThirdPartyAPI,
}