import request from "request";
import { UserModel } from "./model";
import { Validator } from "./validator";

export class ThirdPartyAPI {
    async customRequest(options) {
        return new Promise(function(resolve, reject) {
            return request(options, async function (error, response, dto) {
                console.log(`dto from requst: ${ dto }`);
                console.log(`typeof dto from request ${ typeof dto}`);
                const validator = new Validator();
                const validatedDTO = await validator.checkResponse(dto);
                if (validatedDTO === false || error) {
                    reject({ message: "Error on leeloo API request" });
                } else {
                    const parsedJson = JSON.parse(dto);
                    const prepareData = parsedJson.data;
                    resolve(prepareData);
                };
            });
        });
    };

    async getUsers() {
        try {
            const userModel = new UserModel();
            const options = await userModel.generateGetUsersOption();
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
                const options = await userModel.generateGetUserDetailsOption(userId);
                const userDetail = await this.customRequest(options);
                if (userDetail === false) {
                    usersDetails.push({ message: "Invalid response"});
                }
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