import axios from "axios";
import { backendUrl } from "./config.json";
import { ProductListDataType, ToProductListViewModel } from "../mapper/ProductMapper";

export default async function StaffGetShopProductsList(
    userId: string,
    productType: string,
    from: number,
    to: number
): Promise<ProductListDataType[]> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/staff/shop/products?userId=${userId}&productType=${productType}&from=${from}&to=${to}`);
        if (response.status === 200) {
            return response.data.map((product: any) => ToProductListViewModel(product));
        }
        return [];
    } catch (error) {
        return [];
    }
}