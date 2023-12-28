import axios from "axios";
import { backendUrl } from "./config.json";

export enum SignUpStatus {
    Success,
    CannotConnectToServer,
    ServerError,
    AccountAlreadyExist,
}

export type SignUpInput = {
    loginId: string;
    password: string;
    name: string;
    address: string;
    email: string;
};

export default async function SignUp(
    signUpInput: SignUpInput
): Promise<SignUpStatus> {
    const body = {...signUpInput};

    try {
        const response = await axios.post(`${backendUrl}/api/user/signup`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status == 200) {
            if (response.data == "account exist")
                return SignUpStatus.AccountAlreadyExist;
            else
                return SignUpStatus.Success;
        }
        return SignUpStatus.ServerError;
    } catch (error) {
        return SignUpStatus.CannotConnectToServer;
    }
}