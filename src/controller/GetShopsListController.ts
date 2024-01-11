import axios from "axios";
import { backendUrl } from "./config.json";
import { ShopListData, ToShopListViewModel } from "../mapper/ShopMapper";

export default async function GetShopsList(
    from: number,
    to: number
): Promise<ShopListData[]> {
    try {
        const response = await axios.get(`${backendUrl}/api/shop/list?from=${from}&to=${to}`);
        if (response.status == 200 && response.data != "") {
            return response.data.map((shopModel: any) => ToShopListViewModel(shopModel));
        }
        return [];
    } catch (error) {
        return [];
    }
}