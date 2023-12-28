import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Account.css";
import GetAccountTypeController, { AccountType } from "../controller/GetAccountTypeController";
import { useCookies } from "react-cookie";
import { devMode } from "../config.json";

function CustomerAccount() {
    return (
        <div className="account-menu">
            <h3 className="account-menu-title">帳戶</h3>
            <div className="account-menu-options">
                <a href="/user/profile#">帳戶資訊</a>
                <a href="/user/followed-shops#">追蹤商店</a>
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
                <a href="/user/shop/profile#">商店管理</a>
                <a href="/user/shop/products#">商品管理</a>
                <a href="/user/shop/coupons#">優惠券管理</a>
                <a href="/user/shop/report#">銷售報表</a>
            </div>
        </div>
    );
}

function AdminAccount() {
    return (
        <div className="account-menu">
            <h3 className="account-menu-title">帳戶</h3>
            <div className="account-menu-options">
                <a href="/user/profile#">帳戶資訊</a>
                <a href="/user/admin/account-manage#">一般帳戶管理</a>
                <a href="/user/admin/shop-manage#">商品管理</a>
            </div>
        </div>
    );
}

function AccountPageMenu(props: {
    accountType: AccountType
}) {
    if (devMode)
        return CustomerAccount();
    switch (props.accountType) {
        case AccountType.Customer:
            return CustomerAccount();
        case AccountType.Staff:
            return StaffAccount();
        case AccountType.Admin:
            return AdminAccount();
    }
}

export default function Account() {
    const [cookies] = useCookies(["accountId"]);
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    useEffect(() => {
        GetUserAccountType(cookies.accountId, setAccountType);
    }, [cookies.accountId]);

    return (
        <React.Fragment>
            {
                (accountType || devMode) ?
                    <div style={{display: "flex"}}>
                        <AccountPageMenu accountType={accountType!} />
                        <Outlet />
                    </div>
                :
                    null
            }
        </React.Fragment>
    );
}

async function GetUserAccountType(
    userId: string,
    setAccountType: (accountType: AccountType) => void
): Promise<void> {
    const result = await GetAccountTypeController(userId);
    if (result === AccountType.None) {
        if (!devMode)
            location.href = "/user/signin#";
    } else {
        setAccountType(result);
    }
}