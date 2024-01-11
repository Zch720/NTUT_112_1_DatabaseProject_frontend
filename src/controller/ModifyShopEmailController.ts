import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyShopEmailController(
    userId: string,
    shopId: string,
    shopEmail: string
): Promise<boolean> {
    try {
        const body = {
            "staffId": userId,
            "id": shopId,
            "email": shopEmail
        }
        const response = await axios.put(`${backendUrl}/api/shop/modify/email`, body);
        if (response.status === 200)
            return true;
        return false;
    } catch {
        return false;
    }
}