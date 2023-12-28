import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountShopFollowState(
    userId: string,
    shopId: string,
    follow: boolean
): Promise<boolean> {
    try {
        const response = await axios.post(`${backendUrl}/api/user/follow-shop`, {
            userId: userId,
            shopId: shopId,
            follow: follow
        });
        if (response.status == 200 && response.data != "")
            return response.data;
        return false;
    } catch (error) {
        return false;
    }
}