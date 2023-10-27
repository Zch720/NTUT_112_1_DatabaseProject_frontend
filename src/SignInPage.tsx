import "./SignPage.css";
import "./SignInPage.css"
import React from "react";

function SignInOption() {
    return (
        <div className="sign-in-option">
            <p>登入</p>
            <a style={{color: "#919191"}} href="">註冊</a>
        </div>
    );
}

function SignInInputs() {
    return (
        <div className="sign-in-inputs">
            <label className="sign-page-input">
                使用者名稱 / email<br/>
                <input type="text"/>
            </label>
            <label className="sign-page-input">
                密碼<br/>
                <input type="password"/>
            </label>
            <button type="submit">登入</button>
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