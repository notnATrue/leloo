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

    async optionGenerator(method, id) {
        const options = {
            getUsers: {
                url: 'https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=0',
                headers: {
                'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
                }
            },
            getUserDetails: {
                url: `https://api.stage.leeloo.ai/api/v1/accounts/${ id }?include=contactedUsers,orders`,
                headers: {
                    'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
                }
            },
            GetOrderId: {
                url: `https://api.leeloo.ai/api/v1/orders/${ id }`,
                headers: {
                'X-Leeloo-AuthToken': process.env.AUTH_TOKEN,
                }
            },
        };
        const option = options[method];
        console.log(option);
        return option;
    };
}
