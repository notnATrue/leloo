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
    }
}
