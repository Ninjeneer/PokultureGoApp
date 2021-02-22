import User from "./models/User";

export default class RestAPI{

    static URL_REGISTER= 'http://localhost:8080'

    public static register(currentUser:User){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        };
            fetch(RestAPI.URL_REGISTER, requestOptions)
        .then(response => response.json())
        
        };
    

}