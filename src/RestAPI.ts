import IChallenge from "./models/Challenge";
import Coordinates from "./models/Coordinates";
import IPOI from "./models/POI";
import User from "./models/User";
import axios from 'axios';

export default class RestAPI {

    private static BACKEND_URL = 'http://192.168.1.10:8080';
    private static token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzNhN2NmYjcwMTllNGU2YjNkYTk4YSIsInBzZXVkbyI6ImJhc2ljIiwiaWF0IjoxNjE0MTcwOTMzfQ.r3TpPfYol3U1CqEaeeXO09qm-nhNhIAAGbtOZY-m1uc"

    public static register(currentUser: User) {
        fetch(`${RestAPI.BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        })
            .then(response => response.json())
    };

    public static async getPOIByID(id: string): Promise<IPOI> {
        return (await axios.get(`${RestAPI.BACKEND_URL}/pois/${id}`, {
            headers: {
                'authorization': RestAPI.token
            }
        })).data;
    }

    public static async getChallengeByID(id: string): Promise<IChallenge> {
        return (await axios.get(`${RestAPI.BACKEND_URL}/challenges/${id}`, {
            headers: {
                'authorization': RestAPI.token
            }
        })).data;
    }

    public static async validatePhotoChallenge(id: string, coordinates: Coordinates, base64Image: string): Promise<{ validated: boolean, score: number }> {
        return (await axios.post(`${RestAPI.BACKEND_URL}/challenges/validate`, {
            id: id,
            payload: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                image: base64Image
            }
        },
        {
            headers: {
                'authorization': RestAPI.token
            },
        })).data;
    }
}