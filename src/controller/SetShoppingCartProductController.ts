import axios from "axios";
import { backendUrl } from "./config.json";

export default async function SetShoppingCartProduct(
    userId: string,
    productId: string,
    quantity: number
): Promise<boolean> {
    try {
        const body = {
            userId: userId,
            productId: productId,
            quantity: quantity
        }

        const response = await axios.post(`${backendUrl}/shopping-cart/set-quantity`, body);
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}