import axios from "axios";
import { backendUrl } from "./config.json";
import { CouponListDataType, ToCouponListViewModel } from "../mapper/CouponMapper";

export default async function GetAccountCouponsList(
    userId: string,
    from: number,
    to: number
): Promise<CouponListDataType[]> {
    try {
        const response = await axios.get(`${backendUrl}/user/coupons?userId=${userId}&from=${from}&to=${to}`);
        if (response.status === 200) {
            return response.data.map((coupon: any) => ToCouponListViewModel(coupon));
        }
        return [];
    } catch (error) {
        return [];
    }
}