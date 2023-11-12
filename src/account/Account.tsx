import React from "react";
import { Outlet } from "react-router-dom";
import "./Account.css";

export enum AccountType {
    Customer,
    Staff,
    Admin
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

function StaffAccount() {
    return (
        <div className="account-menu">
            <h3 className="account-menu-title">帳戶</h3>
            <div className="account-menu-options">
                <a href="/user/profile#">帳戶資訊</a>
                <a href="/user/shop-profile#">商店管理</a>
                <a href="/user/shop-products#">商品管理</a>
                <a href="/user/shop-coupons#">優惠券管理</a>
                <a href="/user/shop-report#">銷售報表</a>
            </div>
        </div>
    );
}

export default function Account() {
    // TODO: get account type from server
    let accountType: AccountType = getFakeAccountType("staff");
    let accountPage: JSX.Element = <></>;

    if (accountType === AccountType.Customer) {
        accountPage = CustomerAccount();
    } else if (accountType == AccountType.Staff) {
        accountPage = StaffAccount();
    }

    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                {accountPage}
                <Outlet />
            </div>
        </React.Fragment>
    );
}

function getFakeAccountType(type: string): AccountType {
    switch (type) {
        case "customer":
            return AccountType.Customer;
        case "staff":
            return AccountType.Staff;
        case "admin":
            return AccountType.Admin;
    }
    return AccountType.Customer;
}