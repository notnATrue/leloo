require("dotenv").config();
import "babel-polyfill";
import "jest";
import { ThirdPartyAPI } from "../src/third-party-api/leeloo/service";
const thirdPartyApi = new ThirdPartyAPI();

test('Gets Users from leeloo API', async () => {
    try {
        const users = await thirdPartyApi.getUsers();
        expect(users).not.toBe(null);
        expect(users).not.toBe(undefined);
        expect(typeof users).toBe("object");
    } catch(err) {
        throw new Error(err);
    };
});

test('Gets UserDetails from leeloo API', async () => {
    const userIds = ["5e01e141ec4ffd000d3b5c1a", "5f7f0365d18861000d1b7549"];
    try {
        const usersDatails = await thirdPartyApi.getUsersDetails(userIds);
        expect(usersDatails).not.toBe(null);
        expect(usersDatails).not.toBe(undefined);
        expect(typeof usersDatails).toBe("object");
    } catch(err) {
        throw new Error(err);
    }
})
