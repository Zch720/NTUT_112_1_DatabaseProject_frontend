import React, { useEffect, useState, useRef } from "react";
import { Collapse } from "react-collapse";
import "./AccountProfile.css"
import { AccountProfileViewModel } from "../mapper/AccountMapper";
import { useCookies } from "react-cookie";
import CannotLoadDataPage from "../CannotLoadDataPage";
import { devMode } from "../config.json";
import GetAccountProfileController from "../controller/GetAccountProfileController";
import ModifyAccountNameController from "../controller/ModifyAccountNameController";
import ModifyAccountAddressController from "../controller/ModifyAccountAddressController";
import ModifyAccountEmailController from "../controller/ModifyAccountEmailController";
import ModifyAccountPhoneController from "../controller/ModifyAccountPhoneController";
import ModifyAccountPasswordController from "../controller/ModifyAccountPasswordController";
import SnackbarList, { GetNewSnackbar, SnackbarType } from "../utils/Snackbar";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 帳戶資訊</h3>
    );
}

function PasswordModify(props: {
    oldPasswordRef: React.RefObject<HTMLInputElement>,
    newPasswordRef: React.RefObject<HTMLInputElement>,
    newPasswordConfirmRef: React.RefObject<HTMLInputElement>
}) {
    const { oldPasswordRef, newPasswordRef, newPasswordConfirmRef } = props;

    return (
        <div className="password-editing">
            輸入舊密碼 <br/>
            <input className="account-profile-info-input-editing" type="password" ref={oldPasswordRef}></input><br/>
            輸入新密碼 <br/>
            <input className="account-profile-info-input-editing" type="password" ref={newPasswordRef}></input><br/>
            確認密碼 <br/>
            <input className="account-profile-info-input-editing" type="password" ref={newPasswordConfirmRef}></input>
        </div>
    );
}

function PasswordInfo (props: {
    userId: string,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
}) {
    const { userId, snackbars, setSnackbars } = props;
    const [passwordEditing, setPasswordEditing] = useState<boolean>(false);
    const passwordEditingRef = useRef<HTMLInputElement>(null);
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordConfirmRef = useRef<HTMLInputElement>(null);
    const passwordEditingOnClick = () => {
        if (passwordEditing) {
            const oldPassword = oldPasswordRef.current?.value;
            const newPassword = newPasswordRef.current?.value;
            const newPasswordConfirm = newPasswordConfirmRef.current?.value;

            if (oldPassword === undefined || newPassword === undefined || newPasswordConfirm === undefined) {
            } else if (oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
            } else if (newPassword !== newPasswordConfirm) {
                setSnackbars([...snackbars, GetNewSnackbar("新密碼與確認密碼不符", Date.now())]);
                if (passwordEditingRef.current !== null) {
                    passwordEditingRef.current.checked = true;
                }
                return;
            } else if (oldPassword === newPassword) {
                setSnackbars([...snackbars, GetNewSnackbar("新密碼與舊密碼相同", Date.now())]);
                if (passwordEditingRef.current !== null) {
                    passwordEditingRef.current.checked = true;
                }
                return;
            }
        }
        setPasswordEditing(!passwordEditing);
    }

    useEffect(() => {
        if (!passwordEditing) {
            const oldPassword = oldPasswordRef.current?.value;
            const newPassword = newPasswordRef.current?.value;
            const newPasswordConfirm = newPasswordConfirmRef.current?.value;
            
            if (oldPassword === undefined || newPassword === undefined || newPasswordConfirm === undefined) {
                return;
            }
            if (oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
                return;
            }

            ModifyAccountPassword(
                userId,
                oldPassword,
                newPassword,
                snackbars,
                setSnackbars
            );
        }
    }, [passwordEditing])

    return(
        <div className="account-profile-info">
            密碼
            <input type="checkbox" id="password-modify-button" onClick={passwordEditingOnClick} ref={passwordEditingRef} />
            <label htmlFor="password-modify-button"></label>
            <Collapse isOpened={passwordEditing}>
                <PasswordModify oldPasswordRef={oldPasswordRef} newPasswordRef={newPasswordRef} newPasswordConfirmRef={newPasswordConfirmRef} />
            </Collapse>
        </div>
    );
}

function GetProfileInfoState(canEdit: boolean): string {
    if (canEdit)
        return "account-profile-info-input-editing";
    return "account-profile-info-input";
}

function AccountProfileInfo (props: {
    infoType: string,
    buttonId: string,
    infoValue: string,
    newValueInputs: {
        userId: string,
        userData: AccountProfileViewModel,
        setUserData: (userData: AccountProfileViewModel | null) => void,
        snackbars: SnackbarType[],
        setSnackbars: (snackbars: SnackbarType[]) => void
    }
    setNewValueFunc: (
        userId: string,
        newValue: string,
        userData: AccountProfileViewModel,
        setUserData: (userData: AccountProfileViewModel | null) => void,
        snackbars: SnackbarType[],
        setSnackbars: (snackbars: SnackbarType[]) => void
    ) => void
}) {
    const { infoType, buttonId, setNewValueFunc } = props;
    const { userId, userData, setUserData, snackbars, setSnackbars } = props.newValueInputs;
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    const [infoValue, setInfoValue] = useState<string>(props.infoValue);

    useEffect(() => {
        if (!infoEditing && infoValue !== props.infoValue) {
            setNewValueFunc(
                userId,
                infoValue,
                userData!,
                setUserData,
                snackbars,
                setSnackbars
            );
        }
    }, [infoEditing]);
    useEffect(() => {
        setInfoValue(props.infoValue);
    }, [props.infoValue]);

    return(
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <input
                className={GetProfileInfoState(infoEditing)}
                type="text"
                value={infoValue}
                onChange={(event) => setInfoValue(event.target.value)}
                readOnly={!infoEditing}></input>
        </div>
    );
}

function AccountPageInfos (props: {
    accountData: AccountProfileViewModel,
    setAccountData: (accountData: AccountProfileViewModel | null) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
}) {
    const { loginId, name, address, phone, email } = props.accountData;
    const { accountData, setAccountData, snackbars, setSnackbars } = props;
    const [cookies] = useCookies(["accountId"]);
    const setNewValueInputs: any = {
        userId: cookies.accountId,
        userData: accountData,
        setUserData: setAccountData,
        snackbars: snackbars,
        setSnackbars: setSnackbars
    };

    return(
        <div className="account-profile-infos">
            <h3 className="account-profile-info">{loginId}</h3>
            <PasswordInfo
                userId={cookies.accountId}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
            <AccountProfileInfo
                infoType="姓名"
                buttonId="name-modify-button"
                infoValue={name}
                newValueInputs={setNewValueInputs}
                setNewValueFunc={ModifyAccountName} />
            <AccountProfileInfo
                infoType="地址"
                buttonId="address-modify-button"
                infoValue={address}
                newValueInputs={setNewValueInputs}
                setNewValueFunc={ModifyAccountAddress} />
            <AccountProfileInfo
                infoType="E-mail"
                buttonId="email-modify-button"
                infoValue={email}
                newValueInputs={setNewValueInputs}
                setNewValueFunc={ModifyAccountEmail} />
            <AccountProfileInfo
                infoType="手機號碼"
                buttonId="phone-number-modify-button"
                infoValue={phone}
                newValueInputs={setNewValueInputs}
                setNewValueFunc={ModifyAccountPhone} />
        </div>
    );
}

export default function AccountProfile() {
    const [cookies] = useCookies(["accountId"]);
    const [userData, setUserData] = useState<AccountProfileViewModel | null>(null);
    useEffect(() => {
        GetAccountProfile(cookies.accountId, setUserData);
    }, [cookies.accountId]);
    const [snackbars, setSnackbars] = useState<SnackbarType[]>([]);

    return (
        <div className="account-page-content">
            <SnackbarList snackbarList={snackbars} setSnackbarList={setSnackbars} />
            {
                userData === null ?
                    <CannotLoadDataPage />
                :
                    <React.Fragment>
                        <AccountPageTitle />
                        <AccountPageInfos accountData={userData!} setAccountData={setUserData} snackbars={snackbars} setSnackbars={setSnackbars} />
                    </React.Fragment>
            }
        </div>
    );
}

async function GetAccountProfile(
    userId: string,
    setUserData: (userData: AccountProfileViewModel | null) => void,
) {
    if (devMode) {
        setUserData({
            loginId: "",
            name: "",
            address: "",
            phone: "",
            email: "",
        });
        return;
    }

    const userData = await GetAccountProfileController(userId);
    setUserData(userData);
}

async function ModifyAccountName(
    userId: string,
    newValue: string,
    userData: AccountProfileViewModel,
    setUserData: (userData: AccountProfileViewModel | null) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) {
    const result = await ModifyAccountNameController(userId, newValue);
    if (result) {
        setUserData({
            ...userData,
            name: newValue
        });
        setSnackbars([...snackbars, GetNewSnackbar("姓名已修改", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("姓名修改失敗", Date.now())]);
    }
}

async function ModifyAccountAddress(
    userId: string,
    newValue: string,
    userData: AccountProfileViewModel,
    setUserData: (userData: AccountProfileViewModel | null) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) {
    const result = await ModifyAccountAddressController(userId, newValue);
    if (result) {
        setUserData({
            ...userData,
            address: newValue
        });
        setSnackbars([...snackbars, GetNewSnackbar("地址已修改", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("地址修改失敗", Date.now())]);
    }
}

async function ModifyAccountEmail(
    userId: string,
    newValue: string,
    userData: AccountProfileViewModel,
    setUserData: (userData: AccountProfileViewModel | null) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) {
    const result = await ModifyAccountEmailController(userId, newValue);
    if (result) {
        setUserData({
            ...userData,
            email: newValue
        });
        setSnackbars([...snackbars, GetNewSnackbar("E-mail 已修改", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("E-mail 修改失敗", Date.now())]);
    }
}

async function ModifyAccountPhone(
    userId: string,
    newValue: string,
    userData: AccountProfileViewModel,
    setUserData: (userData: AccountProfileViewModel | null) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) {
    const result = await ModifyAccountPhoneController(userId, newValue);
    if (result) {
        setUserData({
            ...userData,
            phone: newValue
        });
        setSnackbars([...snackbars, GetNewSnackbar("手機號碼已修改", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("手機號碼修改失敗", Date.now())]);
    }
}

async function ModifyAccountPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) {
    const result = await ModifyAccountPasswordController(userId, oldPassword, newPassword);
    if (result) {
        setSnackbars([...snackbars, GetNewSnackbar("密碼已修改", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("密碼修改失敗", Date.now())]);
    }
}