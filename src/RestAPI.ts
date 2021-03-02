import IChallenge from "./models/Challenge";
import Coordinates from "./models/Coordinates";
import IPOI from "./models/POI";
import IUser from "./models/User";
import axios from 'axios';
import config from './assets/config.json'

export default class RestAPI {

    private static BACKEND_URL = config.host;
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

    public static async getPOINearLocation(latitude: number, longitude: number): Promise<IPOI[]> {
        return (await axios.get(`${RestAPI.BACKEND_URL}/pois/near?latitude=${latitude}&longitude=${longitude}&range=10000`, {
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

    public static async validatePhotoChallenge(id: string, coordinates: Coordinates, base64Image: string): Promise<{ validated: boolean, score: number, reasons?: string[] }> {
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