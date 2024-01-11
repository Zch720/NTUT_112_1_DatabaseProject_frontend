import axios from "axios";
import { backendUrl } from "./config.json";

export default async function AllShopCount(): Promise<number> {
    try {
        const response = await axios.get(`${backendUrl}/api/shop/all-shop-count`);
        if (response.status == 200 && response.data != "")
            return response.data;
        return 0;
    } catch (error) {
        return 0;
    }
}