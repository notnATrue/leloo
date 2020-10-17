import request from "request";
import { UserModel } from "./model";

require("dotenv").config();

export class ThirdPartyAPI {
    async getUsers() {
        const userModel = new UserModel();
        const options = await userModel.generateGetUsersOption();
        const users = await this.customRequest(options);
        return users;
    };

    async getUser(userId) {
        const userModel = new UserModel();
        const options = await userModel.generateGetUsersOption(userId);
        const user = await this.customRequest(options);
        return user;
    }

    async getUsersDetails(userIds) {
        let usersDetails = [];
        for (const userId of userIds) {
            const userModel = new UserModel();
            const options = await userModel.generateGetUserDetailsOption(userId);
            const userDetail = await this.customRequest(options);
            const prepareData = await userModel.pickUsersInfo(userDetail);
            usersDetails.push(prepareData);
        }
        return usersDetails;
    }

    async getOrder(id) {
        const options = {
            url: `https://api.leeloo.ai/api/v1/orders/${ id }`,
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_Token,
            }
        };
        const orders = await this.customRequest(options);
        return orders;
    }

    async customRequest(options) {
        return new Promise(function(resolve, reject) {
            return request(options, async function (error, response, dto) {
                if (dto) {
                    const prepareData = JSON.parse(dto).data;
                    resolve(prepareData);
                } else {
                    resolve('leeloo response failure');
                }
            });
        })
    }
}

export default { 
    ThirdPartyAPI,
 }