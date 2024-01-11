import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyShopNameController(
    userId: string,
    shopId: string,
    shopName: string
): Promise<boolean> {
    try {
        const body = {
            "staffId": userId,
            "id": shopId,
            "name": shopName
        }
        const response = await axios.put(`${backendUrl}/api/shop/modify/name`, body);
        if (response.status === 200)
            return true;
        return false;
    } catch {
        return false;
    }
}