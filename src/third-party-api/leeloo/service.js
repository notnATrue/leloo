require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});

export class ThirdPartyAPI {
    async getUsers() {
        const Token = process.env.AUTH_Token;
        console.log(`Token ${Token}`);
    }
}

export default { 
    ThirdPartyAPI,
 }