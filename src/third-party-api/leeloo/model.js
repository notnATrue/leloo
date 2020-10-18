import _ from "lodash";

export class UserModel {
    async pickUsersInfo(user) {
        try {
            const prepareData = _.pick(user, ["id", "name", "from", "email", "links"]);
            if (prepareData.links?.orders) {
                const orders = prepareData.links.orders;
                prepareData.orders = [];
                for (const order of orders) {
                    prepareData.orders.push({ id: order["id"] });
                }
                delete prepareData.links;
            }
            return prepareData;
        } catch(err) {
            throw new Error(err);
        }
    };

    async generateGetUsersOption() {
        const options = {
            url: 'https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=0',
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
            }
        };
        return options;
    };

    async generateGetUserDetailsOption(userId) {
        const options = {
            url: `https://api.stage.leeloo.ai/api/v1/accounts/${ userId }?include=contactedUsers,orders`,
            headers: {
                'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
            }
        };
        return options;
    };

    async generateGetOrderIdOption(id) {
        const options = {
            url: `https://api.leeloo.ai/api/v1/orders/${ id }`,
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
            }
        };
        return options;
    };
}
