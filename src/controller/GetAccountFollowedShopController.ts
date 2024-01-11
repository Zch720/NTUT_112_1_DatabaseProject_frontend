import axios from "axios";
import { backendUrl } from "./config.json";

export default async function GetAccountFollowedShop(
    userId: string,
    shopId: string
): Promise<boolean> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/followed-shop?userId=${userId}&shopId=${shopId}`);
        if (response.status === 200) {
            return response.data;
        }
        return false;
    } catch (error) {
        return false;
    }
}