import IChallenge from "./models/Challenge";
import Coordinates from "./models/Coordinates";
import IPOI from "./models/POI";
import IUser from "./models/User";
import axios from 'axios';

export default class RestAPI {

    private static BACKEND_URL = 'http://192.168.1.10:8080';
    private static token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzY3MWIxZDRiMTJmZDFhOWI0N2U4MiIsInBzZXVkbyI6ImJhc2ljIiwiaWF0IjoxNjE0MTgwNzg1fQ.Ru9nRUcj3Zsrafi8A6rSzQUHbpKw9caMQ58B0nO9mbw"
    public static user: IUser;

    public static setUser(u: IUser): void {
        RestAPI.user = u;
    }

    public static async register(pseudo: string, password: string): Promise<IUser> {
        return (await axios.post(`${RestAPI.BACKEND_URL}/users/register`, { pseudo, password })).data
    };

    public static async login(pseudo: string, password: string): Promise<IUser> {
        return (await axios.post(`${RestAPI.BACKEND_URL}/users/login`, { pseudo, password })).data
    };

    public static async getPOIByID(id: string): Promise<IPOI> {
        return (await axios.get(`${RestAPI.BACKEND_URL}/pois/${id}`, {
            headers: {
                'authorization': 'Bearer ' + RestAPI.user.token
            }
        })).data;
    }

    public static async getChallengeByID(id: string): Promise<IChallenge> {
        return (await axios.get(`${RestAPI.BACKEND_URL}/challenges/${id}`, {
            headers: {
                'authorization': 'Bearer ' + RestAPI.user.token
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
                'authorization': 'Bearer ' + RestAPI.user.token
            },
        })).data;
    }
}