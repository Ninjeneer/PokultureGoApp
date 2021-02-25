import User from "./models/User";

export default class RestAPI {

    private static URL_REGISTER = 'http://192.168.1.10:8080';
    private static user:User
    public static async register(currentUser: User): Promise<User> {
        const response = await fetch(`${RestAPI.URL_REGISTER}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        });
        return await response.json();
    };
}