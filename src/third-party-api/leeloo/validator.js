export class Validator {
    async checkResponse(data) {
        if (data === 'Too many requests, please try again later.') {
            console.log(data === 'Too many requests, please try again later.');
            console.log(`typeof data in validator ${ typeof data }`);
            console.log("Validation failed!")
            return false;
        }
        return data;
    }
}