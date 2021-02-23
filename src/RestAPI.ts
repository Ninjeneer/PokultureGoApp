import POI from "./models/POI";
import User from "./models/User";

export default class RestAPI {

    private static BACKEND_URL = 'http://192.168.1.10:8080';

    public static register(currentUser: User) {
        fetch(`${RestAPI.BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        })
            .then(response => response.json())
    };

    public static async getPOIByID(id: string): Promise<any> {
        const response = await fetch(`${RestAPI.BACKEND_URL}/pois/${id}`, {
            headers: {
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzNhN2NmYjcwMTllNGU2YjNkYTk4YSIsInBzZXVkbyI6ImJhc2ljIiwiaWF0IjoxNjE0MDc0MzAxfQ.ypb9jU-hjPRLNZ8EaLyQ0vRxoUyZhDCOfQMaiSqqb44'
            }
        });
        return await response.json();
    }
}