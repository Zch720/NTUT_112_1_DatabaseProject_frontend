import axios from "axios";
import { backendUrl } from "./config.json";

export enum AccountType {
    None,
    Customer,
    Staff,
    Admin
};

export default async function GetAccountType(
    userId: string | undefined | null
): Promise<AccountType> {
    if (userId === undefined || userId === null || userId === "") {
        return AccountType.None;
    }

    try {
        const response = await axios.get(
            `${backendUrl}/user/type?userId=${userId}`
        );
        switch (response.data) {
            case "customer":
                return AccountType.Customer;
            case "staff":
                return AccountType.Staff;
            case "admin":
                return AccountType.Admin;
            default:
                return AccountType.None;
        }
    } catch (error) {
        console.error(error);
        return AccountType.None;
    }
}