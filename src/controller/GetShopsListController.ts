import axios from "axios";
import { backendUrl } from "./config.json";
import { ShopListData } from "../mapper/ShopMapper";

export default async function GetShopsList(
    from: number,
    to: number
): Promise<ShopListData[]> {
    try {
        const response = await axios.get(`${backendUrl}/api/shop/list?from=${from}&to=${to}`);
        if (response.status == 200 && response.data != "") {
            const shopListData: ShopListData[] = [];
            for (const shopModel of response.data) {
                shopListData.push({
                    shopId: shopModel.Id,
                    shopIcon: shopModel.Icon,
                    shopName: shopModel.Name
                });
            }
            return shopListData;
        }
        return [];
    } catch (error) {
        return [];
    }
}