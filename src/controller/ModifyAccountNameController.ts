import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountName(
    userId: string,
    name: string
): Promise<boolean> {
    try {
        const response = await axios.put(`${backendUrl}/api/user/modify/name`, {
            userId: userId,
            name: name
        }, {
            withCredentials: true,
        });
        return response.status == 200;
    } catch (error) {
        return false;
    }
}