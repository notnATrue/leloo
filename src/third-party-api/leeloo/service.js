import request from "request";
import { UserModel } from "./model";

export class ThirdPartyAPI {
    async customRequest(options) {
        return new Promise(function(resolve, reject) {
            return request(options, async function (error, response, dto) {
                if (dto) {
                    const prepareData = JSON.parse(dto).data;
                    resolve(prepareData);
                } else {
                    resolve({});
                };
            });
        });
    };

    async getUsers() {
        const options = await UserModel.generateGetUsersOption();
        const users = await this.customRequest(options);
        return users;
    };

    async getUsersDetails(userIds) {
        let usersDetails = [];
        for (const userId of userIds) {
            const options = await UserModel.generateGetUserDetailsOption(userId);
            const userDetail = await this.customRequest(options);
            const userModel = new UserModel();
            const prepareData = await userModel.pickUsersInfo(userDetail);
            usersDetails.push(prepareData);
        };
        return usersDetails;
    };

    async getOrder(id) {
        const options = await UserModel.generateGetOrderIdOption(id);
        const orders = await this.customRequest(options);
        return orders;
    };
}

export default { 
    ThirdPartyAPI,
}