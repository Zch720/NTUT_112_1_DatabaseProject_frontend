import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountAddress(
    userId: string,
    address: string
): Promise<boolean> {
    try {
        const response = await axios.put(`${backendUrl}/api/user/modify/address`, {
            "userId": userId,
            "address": address
        });
        return response.status == 200;
    } catch (error) {
        return false;
    }
}