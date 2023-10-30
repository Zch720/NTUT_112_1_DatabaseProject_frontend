import React from "react";
import { Outlet } from "react-router-dom";
import "./Account.css";

export enum AccountType {
    Customer,
    Stuff,
    Admin
}

type AccountProps = {
    accountType: AccountType;
}

function CustomerAccount() {
    return (
        <div className="account-menu">
            <h3 className="account-menu-title">帳戶</h3>
            <div className="account-menu-options">
                <a href="/user/profile#">帳戶資訊</a>
                <a href="/user/followed_shops#">追蹤商店</a>
                <a href="/user/orders#">訂單紀錄</a>
                <a href="/user/coupons#">優惠券</a>
            </div>
        </div>
    );
}

export default function Account({ accountType }: AccountProps) {
    let accountPage: JSX.Element = <></>;

    if (accountType == AccountType.Customer) {
        accountPage = CustomerAccount();
    }

    return (
        <React.Fragment>
            {accountPage}
            <Outlet />
        </React.Fragment>
    );
}