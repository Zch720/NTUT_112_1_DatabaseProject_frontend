import React from "react";
import { useCookies } from "react-cookie";
import "../SignPage.css";
import "./SignInPage.css"
import SignInController, { SignInStatus } from "../../controller/SignInController"
import WarningWindow from "../../utils/WarningWindow";

function SignInOption() {
    return (
        <div className="sign-in-option">
            <p>登入</p>
            <a style={{color: "#919191"}} href="/user/signup">註冊</a>
        </div>
    );
}

function SignInInputs(props: {
    showWarningMessage: (message: string) => void
}) {
    const { showWarningMessage } = props;
    const [cookies, setCookie, removeCookie] = useCookies(["accountId"]);

    const setCookiesAccountId = (accountId: string) => {
        setCookie("accountId", accountId, { path: "/" });
    }
    const signin = async () => {
        SignIn(setCookiesAccountId, showWarningMessage);
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
            <button type="submit" onClick={signin}>登入</button>
        </div>
    );
}

export default function SignInPage() {
    const [message, setMessage] = React.useState<string>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const showWarningMessage = (message: string) => {
        setMessage(message);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <WarningWindow message={message} open={open} resetOpen={() => setOpen(false)}/>
            <SignInOption />
            <SignInInputs showWarningMessage={showWarningMessage}/>
        </React.Fragment>
    );
}

async function SignIn(
    setCookiesAccountId: (accountId: string) => void,
    showWarningMessage: (message: string) => void
) {
    const userAccount = (document.getElementById("user-account-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;
    if (userAccount === "") {
        showWarningMessage("請輸入使用者名稱 / E-mail");
        return;
    }
    if (password === "") {
        showWarningMessage("請輸入密碼");
        return;
    }

    const result: SignInStatus = await SignInController(userAccount, password, setCookiesAccountId);
    if (result === SignInStatus.Success) {
        location.href = "/home#";
    } else if (result === SignInStatus.AccountNotExist) {
        showWarningMessage("帳號或密碼錯誤");
    } else if (result === SignInStatus.CannotConnectToServer) {
        showWarningMessage("無法連接到伺服器");
    }
}