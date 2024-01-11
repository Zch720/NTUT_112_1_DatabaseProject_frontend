import axios from "axios";
import { backendUrl } from "./config.json";

export default async function ModifyAccountEmail(
    userId: string,
    email: string
): Promise<boolean> {
    try {
        const response = await axios.put(`${backendUrl}/api/user/modify/email`, {
            "userId": userId,
            "email": email
        });
        return response.status == 200;
    } catch (error) {
        return false;
    }
}