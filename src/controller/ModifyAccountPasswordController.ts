import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountPassword (
    userId: string,
    oldPassword: string,
    newPassword: string
): Promise<boolean> {
    try {
        const response = await axios.put(`${backendUrl}/api/user/modify/password`, {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            withCredentials: true,
        });
        return response.status == 200;
    } catch (error) {
        return false;
    }
}