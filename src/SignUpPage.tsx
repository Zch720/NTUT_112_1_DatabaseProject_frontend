import "./SignPage.css";
import "./SignUpPage.css"
import React from "react";

function SignUpOption() {
    return (
        <div className="sign-up-option">
            <a style={{color: "#919191"}} href="/user/signin">登入</a>
            <p>註冊</p>
        </div>
    );
}

function SignUpInputs() {
    return (
        <div className="sign-page-inputs">
            <label className="sign-page-input">
                使用者名稱<br/>
                <input type="text"/>
            </label>
            <label className="sign-page-input">
                密碼<br/>
                <input type="password"/>
            </label>
            <label className="sign-page-input">
                密碼確認<br/>
                <input type="password"/>
            </label>
            <label className="sign-page-input">
                姓名<br/>
                <input type="text"/>
            </label>
            <label className="sign-page-input">
                地址<br/>
                <input type="text"/>
            </label>
            <label className="sign-page-input">
                E-mail<br/>
                <input type="email"/>
            </label>
            <button type="submit">註冊</button>
        </div>
    );
}

export default function SignUpPage() {
    return (
        <React.Fragment>
            <SignUpOption />
            <SignUpInputs />
        </React.Fragment>
    );
}