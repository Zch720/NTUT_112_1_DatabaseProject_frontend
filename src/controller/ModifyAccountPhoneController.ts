import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountPhone(
    userId: string,
    phone: string
): Promise<boolean> {
    try {
        const response = await axios.put(`${backendUrl}/api/user/modify/phone`, {
            userId: userId,
            phone: phone
        }, {
            withCredentials: true,
        });
        return response.status == 200;
    } catch (error) {
        return false;
    }
}