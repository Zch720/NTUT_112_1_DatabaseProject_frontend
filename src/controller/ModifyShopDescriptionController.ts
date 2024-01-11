import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyShopDescriptionController(
    userId: string,
    shopId: string,
    shopDescription: string
): Promise<boolean> {
    try {
        const body = {
            "staffId": userId,
            "id": shopId,
            "description": shopDescription
        }
        const response = await axios.put(`${backendUrl}/api/shop/modify/description`, body);
        if (response.status === 200)
            return true;
        return false;
    } catch {
        return false;
    }
}