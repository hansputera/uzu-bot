export default class UzumakiError extends Error {
    constructor(public name: string, message?: string) {
        super(message);
    }
}