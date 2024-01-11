import SignUpController, { SignUpInput, SignUpStatus } from "../../controller/SignUpController";
import WarningWindow from "../../utils/WarningWindow";
import "../SignPage.css";
import "./SignUpPage.css"
import React, { useState, useRef } from "react";

function SignUpOption() {
    return (
        <div className="sign-up-option">
            <a style={{color: "#919191"}} href="/user/signin">登入</a>
            <p>註冊</p>
        </div>
    );
}

function SignUpInputs(props: {
    showWarningMessage: (message: string) => void
}) {
    const { showWarningMessage } = props;
    const loginIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const signup = async () => {
        const signUpAttrs = {
            loginId: loginIdRef.current?.value,
            password: passwordRef.current?.value,
            passwordConfirm: passwordConfirmRef.current?.value,
            name: nameRef.current?.value,
            address: addressRef.current?.value,
            email: emailRef.current?.value
        };
        SignUp(signUpAttrs, showWarningMessage);
    }

    return (
        <div className="sign-page-inputs">
            <label className="sign-page-input">
                使用者名稱<br/>
                <input type="text" ref={loginIdRef} />
            </label>
            <label className="sign-page-input">
                密碼<br/>
                <input type="password" ref={passwordRef} />
            </label>
            <label className="sign-page-input">
                密碼確認<br/>
                <input type="password" ref={passwordConfirmRef} />
            </label>
            <label className="sign-page-input">
                姓名<br/>
                <input type="text" ref={nameRef} />
            </label>
            <label className="sign-page-input">
                地址<br/>
                <input type="text" ref={addressRef} />
            </label>
            <label className="sign-page-input">
                E-mail<br/>
                <input type="email" ref={emailRef} />
            </label>
            <button type="submit" onClick={signup} >註冊</button>
        </div>
    );
}

export default function SignUpPage() {
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const showWarningMessage = (message: string) => {
        setMessage(message);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <WarningWindow message={message} open={open} resetOpen={() => setOpen(false)} />
            <SignUpOption />
            <SignUpInputs showWarningMessage={showWarningMessage} />
        </React.Fragment>
    );
}

type SignUpAttrs = {
    loginId: string | undefined,
    password: string | undefined,
    passwordConfirm: string | undefined,
    name: string | undefined,
    address: string | undefined,
    email: string | undefined
}

async function SignUp(
    signUpAttrs: SignUpAttrs,
    showWarningMessage: (message: string) => void
) {
    if (signUpAttrs.loginId === undefined || signUpAttrs.loginId === "") {
        showWarningMessage("請輸入使用者名稱");
        return;
    }
    if (signUpAttrs.password === undefined || signUpAttrs.password === "") {
        showWarningMessage("請輸入密碼");
        return;
    }
    if (signUpAttrs.passwordConfirm === undefined || signUpAttrs.passwordConfirm === "") {
        showWarningMessage("請輸入密碼確認");
        return;
    }
    if (signUpAttrs.password !== signUpAttrs.passwordConfirm) {
        showWarningMessage("密碼與密碼確認不符");
        return;
    }
    if (signUpAttrs.name === undefined || signUpAttrs.name === "") {
        showWarningMessage("請輸入姓名");
        return;
    }
    if (signUpAttrs.address === undefined || signUpAttrs.address === "") {
        showWarningMessage("請輸入地址");
        return;
    }
    if (signUpAttrs.email === undefined || signUpAttrs.email === "") {
        showWarningMessage("請輸入E-mail");
        return;
    }

    const signUpInput: SignUpInput = {
        LoginId: signUpAttrs.loginId,
        Password: signUpAttrs.password,
        Name: signUpAttrs.name,
        Address: signUpAttrs.address,
        Email: signUpAttrs.email
    };
    const result: SignUpStatus = await SignUpController(signUpInput);
    if (result === SignUpStatus.Success) {
        window.location.href = "/user/signin";
    } else if (result === SignUpStatus.CannotConnectToServer) {
        showWarningMessage("無法連接到伺服器");
    } else if (result === SignUpStatus.AccountAlreadyExist) {
        showWarningMessage("使用者名稱已被使用");
    } else if (result === SignUpStatus.ServerError) {
        showWarningMessage("伺服器錯誤");
    }
}