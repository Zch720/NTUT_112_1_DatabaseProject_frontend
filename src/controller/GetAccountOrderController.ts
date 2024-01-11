import axios from "axios";
import { backendUrl } from "./config.json";
import { OrderInfoType, ToOrderInfoViewModel } from "../mapper/OrderMapper";

export default async function GetAccountOrder(
    orderId: string
): Promise<OrderInfoType | null> {
    try {
        const response = await axios.get(`${backendUrl}/api/order?orderId=${orderId}`);
        if (response.status == 200) {
            return ToOrderInfoViewModel(response.data);
        }
        return null;
    } catch (error) {
        return null;
    }
}