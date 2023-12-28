import { useState } from "react";
import { Collapse } from "react-collapse";
import "./AccountProfile.css"

export type AccountInfoType = {
    userLoginId: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userPhoneNumber: string;
}

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 帳戶資訊</h3>
    );
}

function PasswordModify() {
    return (
        <div className="password-editing">
            輸入舊密碼 <br/>
            <input className="account-profile-info-input-editing" type="password"></input><br/>
            輸入新密碼 <br/>
            <input className="account-profile-info-input-editing" type="password"></input><br/>
            確認密碼 <br/>
            <input className="account-profile-info-input-editing" type="password"></input>
        </div>
    );
}

function PasswordInfo () {
    const [passwordEditing, setPasswordEditing] = useState<boolean>(false);
    return(
        <div className="account-profile-info">
            密碼
            <input type="checkbox" id="password-modify-button" onClick={() => setPasswordEditing(!passwordEditing)}/>
            <label htmlFor="password-modify-button"></label>
            <Collapse isOpened={passwordEditing}>
                <PasswordModify/>
            </Collapse>
        </div>
    );
}

function GetProfileInfoState(canEdit: boolean): string {
    if (canEdit)
        return "account-profile-info-input-editing";
    return "account-profile-info-input";
}

function AccountProfileInfo (infoType: string, buttonId: string, infoValue: string) {
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    // TODO: input bug
    return(
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <input className={GetProfileInfoState(infoEditing)} type="text" value={infoValue} readOnly></input>
        </div>
    );
}

function AccountPageInfos ({ userLoginId, userName, userAddress, userEmail, userPhoneNumber }: AccountInfoType) {
    return(
        <div className="account-profile-infos">
            <h3 className="account-profile-info">{userLoginId}</h3>
            <PasswordInfo />
            {AccountProfileInfo("姓名", "name-modify-button", userName)}
            {AccountProfileInfo("地址", "address-modify-button", userAddress)}
            {AccountProfileInfo("E-mail", "email-modify-button", userEmail)}
            {AccountProfileInfo("手機號碼", "phone-number-modify-button", userPhoneNumber)}
        </div>
    );
}

export default function AccountProfile() {
    const userInfo: AccountInfoType = getFakeUserInfo();

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <AccountPageInfos userLoginId={userInfo.userLoginId} userName={userInfo.userName} userAddress={userInfo.userAddress} userEmail={userInfo.userEmail} userPhoneNumber={userInfo.userPhoneNumber}/>
        </div>
    );
}

function getFakeUserInfo(): AccountInfoType {
    return {
        userLoginId: "fakeUser",
        userName: "fakeUserName",
        userAddress: "fakeUserAddress",
        userEmail: "fakeUserEmail",
        userPhoneNumber: "fakeUserPhoneNumber"
    };
}