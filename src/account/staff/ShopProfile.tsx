import { useState } from "react";
import "./ShopProfile.css";
import "../AccountProfile.css";
import AccountProfile from "../AccountProfile";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商店管理</h3>
    );
}

function GetProfileInfoState(canEdit: boolean): string {
    if (canEdit)
        return "account-profile-info-input-editing";
    return "account-profile-info-input";
}

function OneLineInfo (props: { infoType: string, buttonId: string, infoValue: string }) {
    const { infoType, buttonId, infoValue } = props;
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

function IconInfo() {
    return (
        <div className="account-profile-info">
            商店圖片
            <input type="file" accept="image/*" id={"shop-icon"} onChange={setIconImage} hidden/>
            <label htmlFor={"shop-icon"}></label><br/>
        </div>
    );
}

function DescriptionInfo(props: { infoType: string, buttonId: string, infoValue: string }) {
    const { infoType, buttonId, infoValue } = props;
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    return (
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <textarea className={GetProfileInfoState(infoEditing)} rows={5} cols={50} value={infoValue} readOnly></textarea>
        </div>
    );
}

function setIconImage() {
    const input = document.getElementById("shop-icon") as HTMLInputElement;
    const icon = document.getElementById("shop-profile-icon-img") as HTMLImageElement;
    
    if (!input.files || !input.files[0]) return;
    icon.src = URL.createObjectURL(input.files[0]);
}

type ShopProfileInfos = {
    name: string;
    icon: string;
    description: string;
    address: string;
    email: string;
    phone: string;
};

function ShopProfileInputs(props: { info: ShopProfileInfos }) {
    return (
        <div className="shop-profile-inputs">
            <OneLineInfo infoType="商店名稱" buttonId="shop-name" infoValue={props.info.name} />
            <IconInfo />
            <DescriptionInfo infoType="商店描述" buttonId="shop-description" infoValue={props.info.description} />
            <OneLineInfo infoType="地址" buttonId="shop-address" infoValue={props.info.address} />
            <OneLineInfo infoType="Email" buttonId="shop-email" infoValue={props.info.email} />
            <OneLineInfo infoType="聯絡電話" buttonId="shop-phone" infoValue={props.info.phone} />
        </div>
    );
}

function ShopProfileIcon(props: { icon: string }) {
    return (
        <div className="shop-profile-icon">
            <img id="shop-profile-icon-img" src={props.icon} />
        </div>
    );
}

function ShopProfiles(props: { info: ShopProfileInfos}) {
    return (
        <div className="account-profile-infos" style={{flexDirection: "row"}}>
            <ShopProfileInputs info={props.info} />
            <ShopProfileIcon icon={props.info.icon} />
        </div>
    );
}

export default function ShopProfile() {
    // TODO: replace with real data
    let info: ShopProfileInfos = getFakeShopProfileInfos();

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopProfiles info={info} />
        </div>
    );
}

function getFakeShopProfileInfos() {
    return {
        name: "Fake Shop",
        icon: "",
        description: "",
        address: "",
        email: "",
        phone: "",
    }
}