import React from "react";
import { useCookies } from "react-cookie";
import "../SignPage.css";
import "./SignInPage.css"
import SignInController from "../../controller/SignInController"

function SignInOption() {
    return (
        <div className="sign-in-option">
            <p>登入</p>
            <a style={{color: "#919191"}} href="/user/signup">註冊</a>
        </div>
    );
}

function SignInInputs() {
    const [cookies, setCookie, removeCookie] = useCookies(["accountId"]);

    const setCookiesAccountId = (accountId: string) => {
        setCookie("accountId", accountId, { path: "/" });
    }

    return (
        <div className="sign-page-inputs">
            <label className="sign-page-input">
                使用者名稱 / E-mail<br/>
                <input type="text" id="user-account-input"/>
            </label>
            <label className="sign-page-input">
                密碼<br/>
                <input type="password" id="password-input"/>
            </label>
            <button type="submit" onClick={() => SignIn(setCookiesAccountId)}>登入</button>
        </div>
    );
}

export default function SignInPage() {
    return (
        <React.Fragment>
            <SignInOption />
            <SignInInputs />
        </React.Fragment>
    );
}

async function SignIn(setCookiesAccountId: (accountId: string) => void) {
    const userAccount = (document.getElementById("user-account-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;
    var success = await SignInController(userAccount, password, setCookiesAccountId);
    if (success) {
        location.href = "/home#";
    }
}