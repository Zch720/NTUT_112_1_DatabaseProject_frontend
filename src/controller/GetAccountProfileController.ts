import axios from "axios";
import { backendUrl } from "./config.json";
import { AccountProfileViewModel, ToAccountProfileViewModel } from "../mapper/AccountMapper";

export default async function GetAccountProfile(
    userId: string
): Promise<AccountProfileViewModel | null> {
    const response = await axios.get(`${backendUrl}/api/user/profile?userId=${userId}`);
    if (response.status == 200 && response.data != "") {
        return ToAccountProfileViewModel(response.data);
    }
    return null;
}
