import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountName(
    userId: string,
    name: string
): Promise<boolean> {
    try {
        const body = {
            "userId": userId,
            "name": name
        };

        const response = await axios.put(`${backendUrl}/api/user/modify/name`, body);
        return response.status == 200;
    } catch (error) {
        console.log(error);
        return false;
    }
}