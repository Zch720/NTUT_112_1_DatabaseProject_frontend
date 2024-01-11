import axios from "axios";
import { backendUrl } from "./config.json";

export default async function StaffGetShopProductsListCount(
    userId: string,
    productType: string
): Promise<number> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/staff/shop/product/count?userId=${userId}&productType=${productType}`);
        if (response.status === 200) {
            return response.data;
        }
        return 0;
    } catch (error) {
        return 0;
    }
}