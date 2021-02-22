import User from "./models/User";

export default class RestAPI {

    private static URL_REGISTER = 'http://192.168.1.10:8080';

    public static register(currentUser: User) {
        fetch(`${RestAPI.URL_REGISTER}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        })
            .then(response => response.json())
    };
}