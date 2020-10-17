import { ThirdPartyAPI } from "../../third-party-api/leeloo/service.js"

export const usersRoute = async function(req, res) {
    const leelooAPI = new ThirdPartyAPI();
    let userIds = [];
    const users = await leelooAPI.getUsers();
    for (const user of users) {
        userIds.push(user.id)
    };
    const usersInfo = await leelooAPI.getUsersDetails(userIds);
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
    console.log(`jsonData: ${ JSON.stringify(usersInfo) }`);
    res.json({ statusCode: 200, data: usersInfo });
};