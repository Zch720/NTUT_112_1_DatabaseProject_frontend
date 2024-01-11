import axios from "axios";
import { backendUrl } from "./config.json";
import { ShopPageDataType, ToShopPageViewModel } from "../mapper/ShopMapper";

export default async function StaffGetShopProfile(
    userId: string
) : Promise<ShopPageDataType | null> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/staff/get-shop-profile?staffId=${userId}`);
        if (response.status == 200 && response.data) {
            return ToShopPageViewModel(response.data);
        }
        return null;
    } catch {
        return null;
    }
}