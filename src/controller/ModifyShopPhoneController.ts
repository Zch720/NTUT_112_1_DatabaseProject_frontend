import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyShopPhoneController(
    userId: string,
    shopId: string,
    shopPhone: string
): Promise<boolean> {
    try {
        const body = {
            "staffId": userId,
            "id": shopId,
            "phone": shopPhone
        }
        const response = await axios.put(`${backendUrl}/api/shop/modify/phone`, body);
        if (response.status === 200)
            return true;
        return false;
    } catch {
        return false;
    }
}