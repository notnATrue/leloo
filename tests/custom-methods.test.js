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

test("Testing custom request for Get Users from leeloo API", async () => {
    try {
        const options = {
            url: 'https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=0',
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
            }
        };
        const response = await thirdPartyApi.customRequest(options).catch((err) => { throw new Error(err) });
        expect(response).not.toBe(null);
        expect(response).not.toBe(undefined);
        expect(typeof response).toBe("object");
    } catch(err) {
        throw new Error(err);
    }
});

test("Testing custom request for Get Users Details from leeloo API", async () => {
    try {
        const userId = "5e01e141ec4ffd000d3b5c1a";
        const options = {
            url: `https://api.stage.leeloo.ai/api/v1/accounts/${ userId }?include=contactedUsers,orders`,
            headers: {
                'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
            }
        };
        const response = await thirdPartyApi.customRequest(options).catch((err) => { throw new Error(err) });
        expect(response).not.toBe(null);
        expect(response).not.toBe(undefined);
        expect(typeof response).toBe("object");
    } catch(err) {
        throw new Error(err);
    }
});