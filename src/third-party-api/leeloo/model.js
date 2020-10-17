import _ from "lodash";

export class UserModel {
    async pickUsersInfo(user) {
        const prepareData = _.pick(user, ["id", "name", "from", "email", "links"]);
        if (prepareData.links?.orders) {
            const orders = prepareData.links.orders;
            prepareData.orders = orders;
            delete prepareData.links;
        }
        return prepareData;
    };

    async generateGetUsersOption() {
        const options = {
            url: 'https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=0',
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_Token,
            }
        };
        return options;
    };

    async generateGetUserOption(userId) {
        const options = {
            url: `https://api.stage.leeloo.ai/api/v1/accounts/${ userId }?include=contactedUsers,orders`,
            headers: {
            'X-Leeloo-AuthToken': process.env.AUTH_Token,
            }
        };
        return options;
    }

    async generateGetUserDetailsOption(userId) {
        const options = {
            url: `https://api.stage.leeloo.ai/api/v1/accounts/${ userId }?include=contactedUsers,orders`,
            headers: {
                'X-Leeloo-AuthToken': process.env.AUTH_Token
            }
        };
        return options;
    };
}
