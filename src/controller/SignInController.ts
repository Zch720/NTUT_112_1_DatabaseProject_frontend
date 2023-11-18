import axios from "axios";
import { backendUrl } from "./config.json";
import { useCookies } from "react-cookie";

export default async function SignIn(userAccount: string, password: string): Promise<Boolean> {
    const [cookies, setCookie, removeCookie] = useCookies(["accountId"]);

    const setCookieAccountId = (accountId: string) => {
        setCookie("accountId", accountId, { path: "/" });
    };

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
        setCookieAccountId(response.data);
        return true;
    }
    return false;
}