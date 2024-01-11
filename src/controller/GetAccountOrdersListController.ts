import axios from "axios";
import { backendUrl } from "./config.json";
import { OrderListData, ToOrderListViewModel } from "../mapper/OrderMapper";

export default async function GetAccountOrdersList(
    userId: string,
    from: number,
    to: number
): Promise<OrderListData[]> {
    try {
        const response = await axios.get(`${backendUrl}/api/user/orders?userId=${userId}&from=${from}&to=${to}`);
        if (response.status == 200 && response.data != "") {
            let orderListData: OrderListData[] = [];
            for (const order of response.data) {
                orderListData.push(ToOrderListViewModel(order));
            }
            return orderListData;
        }
        return [];
    } catch (error) {
        return [];
    }
}