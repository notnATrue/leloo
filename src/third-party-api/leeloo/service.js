import request from "request";
import { UserModel } from "./model";
import { Validator } from "./validator";

export class ThirdPartyAPI {
    async customRequest(options) {
        return new Promise(function(resolve, reject) {
            request(options, async function (error, response, dto) {
                console.log(`dto from requst: ${ dto }`)
                const parsedJson = await JSON.parse(dto);
                const prepareData = parsedJson.data;
                resolve(prepareData);
                reject(new Error(error));
            });
        });
    };

    async getUsers() {
        const userModel = new UserModel();
        const options = await userModel.generateGetUsersOption();
        const users = await this.customRequest(options);
        return users;
    };

    async getUsersDetails(userIds) {
        // if (typeof userDetail !== "string" || typeof userDetail !== "object") {
        //         return { body: "getUsersDetails error", userIds}
        // }
        let usersDetails = [];
        for (const userId of userIds) {
            const userModel = new UserModel();
            const options = await userModel.generateGetUserDetailsOption(userId);
            const userDetail = await this.customRequest(options);
            
            const prepareData = await userModel.pickUsersInfo(userDetail);
            usersDetails.push(prepareData);
        };
        return usersDetails;
    };

    async getOrder(id) {
        const userModel = new UserModel();
        const options = await userModel.generateGetOrderIdOption(id);
        const orders = await this.customRequest(options);
        return orders;
    };
}

export default { 
    ThirdPartyAPI,
}