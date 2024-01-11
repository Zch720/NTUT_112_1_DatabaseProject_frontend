import axios from "axios";
import { backendUrl } from "./config.json";

export default async function GetAccountCouponsListCount(
    userId: string,
): Promise<number> {
    try {
        const response = await axios.get(`${backendUrl}/user/coupons-count?userId=${userId}`);
        if (response.status === 200) {
            return response.data;
        }
        return 0;
    } catch (error) {
        return 0;
    }
}