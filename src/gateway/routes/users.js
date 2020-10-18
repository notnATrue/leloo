import { ThirdPartyAPI } from "../../third-party-api/leeloo/service.js"
import { Validator } from "./validator";
import { buffer } from "../../buffer/service";

export const usersRoute = async function(req, res, next) {
    try {
        const leelooAPI = new ThirdPartyAPI();
        let userIds = [];
        const users = await leelooAPI.getUsers();
        const validatedUsers = await Validator.getUserParams(users);
        for (const user of validatedUsers) {
            userIds.push(user.id)
        };
        const usersInfo = await leelooAPI.getUsersDetails(userIds);
        await buffer.setBuffer(usersInfo);
        console.log(await buffer.getBufferPool());
        return res.json({ statusCode: 200, data: usersInfo });
    } catch (err) {
        next(err);
    };
};
