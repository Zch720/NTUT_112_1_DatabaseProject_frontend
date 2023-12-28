import axios from "axios";
import { backendUrl } from "./config.json";
import { ToShopListViewModel, ShopListData } from "../mapper/ShopMapper";

export default async function GetAccountFollowedShopsList(
    userId: string,
    from: number,
    to: number
): Promise<ShopListData[]> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/followed-shops?userId=${userId}&from=${from}&to=${to}`);
        if (response.status == 200 && response.data != "") {
            let shopList: ShopListData[] = [];
            response.data.forEach((shop: any) => {
                shopList.push(ToShopListViewModel(shop));
            });
            return shopList;
        }
        return [];
    } catch (error) {
        return [];
    }
}