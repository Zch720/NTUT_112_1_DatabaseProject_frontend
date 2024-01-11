import axios from "axios";
import { backendUrl } from "./config.json";

export enum SignInStatus {
    Success,
    CannotConnectToServer,
    AccountNotExist,
}

export default async function SignIn(
    userAccount: string,
    password: string,
    setCookiesAccountId: (accounId: string) => void
): Promise<SignInStatus> {
    const body = {
        "userAccount": userAccount,
        "password": password
    };

    try {
        const response = await axios.post(`${backendUrl}/api/user/signin`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log(response);
        if (response.status == 200 && response.data != "") {
            setCookiesAccountId(response.data);
            return SignInStatus.Success;
        }
        return SignInStatus.AccountNotExist;
    } catch (error) {
        return SignInStatus.CannotConnectToServer;
    }
}