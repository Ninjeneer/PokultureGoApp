import IChallenge from "./models/Challenge";
import Coordinates from "./models/Coordinates";
import IPOI from "./models/POI";
import User from "./models/User";

export default class RestAPI {

    private static BACKEND_URL = 'http://192.168.1.10:8080';
    private static token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzNhN2NmYjcwMTllNGU2YjNkYTk4YSIsInBzZXVkbyI6ImJhc2ljIiwiaWF0IjoxNjE0MTIwNDk4fQ._FqXYpwTYvZhIUOrqZYS4dSjI4BVWM26vprsR8L7SNw"

    public static register(currentUser: User) {
        fetch(`${RestAPI.BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        })
            .then(response => response.json())
    };

    public static async getPOIByID(id: string): Promise<IPOI> {
        const response = await fetch(`${RestAPI.BACKEND_URL}/pois/${id}`, {
            headers: {
                'authorization': RestAPI.token
            }
        });
        return await response.json();
    }

    public static async getChallengeByID(id: string): Promise<IChallenge> {
        const response = await fetch(`${RestAPI.BACKEND_URL}/challenges/${id}`, {
            headers: {
                'authorization': RestAPI.token
            }
        });
        return await response.json();
    }

    public static async validatePhotoChallenge(id: string, coordinates: Coordinates, base64Image: string): Promise<{ validated: boolean, score: number }> {
        const response = await fetch(`${RestAPI.BACKEND_URL}/challenges/validate`, {
            method: 'POST',
            headers: {
                'authorization': RestAPI.token
            },
            body: JSON.stringify({
                id: id,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                image: base64Image
            })
        });
        return await response.json();
    }
}