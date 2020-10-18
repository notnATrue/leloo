export class Validator {
    async isJSON(data) {
        try {
            const validatedData = JSON.parse(data);
            return validatedData;
        } catch(err) {
            throw new Error(data);
        }
    }
}