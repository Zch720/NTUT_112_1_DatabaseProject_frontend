import axios from "axios";
import { backendUrl } from "./config.json";

export default async function GetAccountOrdersListCount(
    userId: string
): Promise<number> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/orders-count?userId=${userId}`);
        if (response.status == 200 && response.data != "") {
            return response.data;
        }
        return 0;
    } catch (error) {
        return 0;
    }
}