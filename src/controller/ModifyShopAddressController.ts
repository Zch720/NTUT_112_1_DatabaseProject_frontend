import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyShopAddressController(
    userId: string,
    shopId: string,
    shopAddress: string
): Promise<boolean> {
    try {
        const body = {
            "staffId": userId,
            "id": shopId,
            "address": shopAddress
        }
        const response = await axios.put(`${backendUrl}/api/shop/modify/address`, body);
        if (response.status === 200)
            return true;
        return false;
    } catch {
        return false;
    }
}