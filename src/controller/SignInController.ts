import axios from "axios";
import { backendUrl } from "./config.json";

export default async function SignIn(userAccount: string, password: string, setCookiesAccountId: (accounId: string) => void): Promise<Boolean> {
    const body = {
        userAccount: userAccount,
        password: password
    };
    const response = await axios.post(`${backendUrl}/api/user/signin`, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status == 200) {
        setCookiesAccountId(response.data);
        return true;
    }
    return false;
}