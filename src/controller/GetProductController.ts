import axios from "axios";
import { backendUrl } from "./config.json";
import { ProductPageDataType, ToProductPageViewModel } from "../mapper/ProductMapper";

export default async function GetShop(
    productId: string    
): Promise<ProductPageDataType | null> {
    try {
        const response = await axios.get(`${backendUrl}/api/product/get?productId=${productId}`);
        console.log(response);
        if (response.status === 200 && response.data != null) {
            console.log(ToProductPageViewModel(response.data));
            return ToProductPageViewModel(response.data);
        }
        return null;
    } catch (error) {
        return null;
    }
}