import axios from "axios";
import { backendUrl } from "./config.json";
import { ShopPageDataType, ToShopPageViewModel } from "../mapper/ShopMapper";

export default async function GetShop(
    shopId: string    
): Promise<ShopPageDataType | null> {
    try {
        const response = await axios.get(`${backendUrl}/api/shop/data?shopId=${shopId}`);
        if (response.status === 200) {
            return ToShopPageViewModel(response.data);
        }
        return null;
    } catch (error) {
        return null;
    }
}