import React, { useState } from "react"
import "../Account.css"
import "./AccountManage.css"
import Search from "../../utils/SearchBox"
import PageChooser from "../../utils/PageChooser"

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 一般帳戶管理</h3>
    );
}

type AccountDataType = {
    accountName: string,
    name: string,
    email: string

}

function AccountTableRow(props: {user: AccountDataType}) {
    return (
        <tr>
            <td>{props.user.accountName}</td>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
        </tr>
    
    );
}

function AccountTable({ users }: { users: AccountDataType[] }) {
    return (
        <div className="eletable w-fit">
            <table>
                <thead>
                    <tr>
                        <td style={{ width: "17vw" }}>帳戶名稱</td>
                        <td style={{ width: "17vw" }}>姓名</td>
                        <td style={{ width: "30vw" }}>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <AccountTableRow user={user} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

function AccountList() {
    // TODO: get users from server
    const usersPage = 0;
    const [currentUsers, setCurrentUsers] = useState<AccountDataType[]>([]);
    const changeUserSetIndex = (newPage: number) => {
        // TODO: get users from server
        setCurrentUsers([]);
    }

    return (
        <div className="w-fit">
            <div className="account-manage-search-container">
                <div className="default-search-box-container ">
                    <Search hasBorder={true}/>
                </div>
            </div>
            <AccountTable users={currentUsers}/>
            <PageChooser maxPage={0} onPageChange={changeUserSetIndex} />
        </div>
    );
}

export default function AccountManage() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <AccountList />
        </div>
    );
}