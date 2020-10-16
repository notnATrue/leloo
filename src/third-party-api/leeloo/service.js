import request from "request";
require("dotenv").config();

export class ThirdPartyAPI {
    async getUsers() {
        const Token = process.env.AUTH_Token;
        const options = {
            url: 'https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=0',
            headers: {
              'X-Leeloo-AuthToken': Token,
            }
        };
        return new Promise(function(resolve, reject) {
            return request(options, async function (error, response, dto) {
                console.error('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log(dto); // Print the HTML for the Google homepage.
                const prepareData = JSON.parse(dto).data;
                console.log(`prepareData ${prepareData}`);
                resolve(prepareData);
            });
        });
    };
}

export default { 
    ThirdPartyAPI,
 }