import { ThirdPartyAPI } from "../../third-party-api/leeloo/service.js"
import { Validator } from "./validator";

export const usersRoute = async function(req, res, next) {
    try {
        const leelooAPI = new ThirdPartyAPI();
        let userIds = [];
        const users = await leelooAPI.getUsers();
        const validatedUsers = await Validator.getUserParams(users);
        if (validatedUsers === false) {
            return res.json({ statusCode: 422, message: "To Many Requests to leeloo API" });
        }
        for (const user of users) {
            userIds.push(user.id)
        };
        const usersInfo = await leelooAPI.getUsersDetails(userIds);
        console.log(`usersInfo from getUsersDetails: ${ usersInfo }`);
        return res.json({ statusCode: 200, data: usersInfo });
    } catch (err) {
        next(err);
    };
};




// let jsonData = [];
        // for (const userInfo of usersInfo) {
        //     let prepareUserInfo = Object.assign({}, userInfo);
        //     if (userInfo.orders) {
        //         if (userInfo.orders.length > 0) {
        //             let userOrders = [];
        //             for (const order of userInfo.orders) {
        //                 const id = order["id"];
        //                 const prepareUserOrders = await leelooAPI.getOrder(id);
        //                 userOrders.push(prepareUserOrders);
        //             }
        //             delete prepareUserInfo.orders;
        //             prepareUserInfo.orders = userOrders;
        //             jsonData.push(prepareUserInfo);
        //         }
        //     }
        // }