import axios from "axios";
import { backendUrl } from "./config.json";
import { ShoppingCartType, ToShoppingCartViewModelType } from "../mapper/ShoppingCartMapper";

export default async function GetShoppingCartProducts(
    userId: string
): Promise<ShoppingCartType> {
    try {
        const response = await axios.get(`${backendUrl}/api/shopping-cart/get?userId=${userId}`);
        if (response.status === 200 && response.data)
            return ToShoppingCartViewModelType(response.data);
        return {
            shops: []
        };
    } catch {
        return {
            shops: []
        };
    }
}