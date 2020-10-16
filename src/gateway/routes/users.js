import { ThirdPartyAPI } from "../../third-party-api/leeloo/service.js"

export const usersRoute = async function(req, res) {
    const leelooAPI = new ThirdPartyAPI();
    const users = await leelooAPI.getUsers();
    console.log(users);
    res.json({ message: 'ok', users });
}