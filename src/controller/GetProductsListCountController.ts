import axios from "axios";
import { backendUrl } from "./config.json";

export default async function GetProductsListCount(
    productType: string
): Promise<number> {
    try {
        const response = await axios.get(`${backendUrl}/api/product/products/count?productType=${productType}`);
        if (response.status === 200) {
            return response.data;
        }
        return 0;
    } catch (error) {
        return 0;
    }
}