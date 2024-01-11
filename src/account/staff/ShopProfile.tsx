import React, { useEffect, useState } from "react";
import "./ShopProfile.css";
import "../AccountProfile.css";
import { ShopPageDataType } from "../../mapper/ShopMapper";
import { useCookies } from "react-cookie";
import CannotLoadDataPage from "../../CannotLoadDataPage";
import StaffGetShopProfileController from "../../controller/StaffGetShopProfileController";
import ModifyShopNameController from "../../controller/ModifyShopNameController";
import ModifyShopAddressController from "../../controller/ModifyShopAddressController";
import ModifyShopPhoneController from "../../controller/ModifyShopPhoneController";
import ModifyShopEmailController from "../../controller/ModifyShopEmailController";
import SnackbarList, { GetNewSnackbar, SnackbarType } from "../../utils/Snackbar";
import ModifyShopDescriptionController from "../../controller/ModifyShopDescriptionController";

type ModifyInfoFunc = (
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
) => void;

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

function OneLineInfo (props: {
    infoType: string,
    buttonId: string,
    infoValue: string,
    shopId: string,
    modifyInfo: ModifyInfoFunc,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
}) {
    const { infoType, shopId, buttonId, info, setInfo, snackbars, setSnackbars } = props;
    const [infoValue, setInfoValue] = useState<string>(props.infoValue);
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    const [cookies] = useCookies(['accountId']);
    useEffect(() => {
        if (!infoEditing && infoValue !== props.infoValue) {
            props.modifyInfo(cookies.accountId, shopId, infoValue, info, setInfo, snackbars, setSnackbars);
        }
    }, [infoEditing]);

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
                readOnly={!infoEditing}
            ></input>
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

function DescriptionInfo(props: {
    infoType: string,
    buttonId: string,
    infoValue: string,
    shopId: string,
    modifyInfo: ModifyInfoFunc,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
}) {
    const { infoType, buttonId, shopId, modifyInfo, info, setInfo, snackbars, setSnackbars } = props;
    const [infoValue, setInfoValue] = useState<string>(props.infoValue);
    const [infoEditing, setInfoEditing] = useState<boolean>(false);
    const [cookies] = useCookies(['accountId']);
    useEffect(() => {
        if (!infoEditing && infoValue !== props.infoValue) {
            modifyInfo(cookies.accountId, shopId, infoValue, info, setInfo, snackbars, setSnackbars);
        }
    }, [infoEditing]);

    return (
        <div className="account-profile-info">
            {infoType}
            <input type="checkbox" id={buttonId} onClick={() => setInfoEditing(!infoEditing)}/>
            <label htmlFor={buttonId}></label><br/>
            <textarea
                className={GetProfileInfoState(infoEditing)}
                rows={5}
                cols={50}
                value={infoValue}
                onChange={(event) => setInfoValue(event.target.value)}
                readOnly={!infoEditing}
            ></textarea>
        </div>
    );
}

function setIconImage() {
    const input = document.getElementById("shop-icon") as HTMLInputElement;
    const icon = document.getElementById("shop-profile-icon-img") as HTMLImageElement;
    
    if (!input.files || !input.files[0]) return;
    icon.src = URL.createObjectURL(input.files[0]);
}

function ShopProfileInputs(props: {
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
}) {
    const { info, setInfo, snackbars, setSnackbars } = props;
    return (
        <div className="shop-profile-inputs">
            <OneLineInfo
                infoType="商店名稱"
                buttonId="shop-name"
                shopId={info.id}
                infoValue={info.name}
                modifyInfo={ModifyShopName}
                info={info} setInfo={setInfo}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
            <IconInfo />
            <DescriptionInfo
                infoType="商店描述"
                buttonId="shop-description"
                infoValue={info.description}
                shopId={info.id}
                modifyInfo={ModifyShopDescription}
                info={info} setInfo={setInfo}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
            <OneLineInfo
                infoType="地址"
                buttonId="shop-address"
                shopId={info.id}
                infoValue={info.address}
                modifyInfo={ModifyShopAddress}
                info={info}
                setInfo={setInfo}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
            <OneLineInfo
                infoType="Email"
                buttonId="shop-email"
                shopId={info.id}
                infoValue={info.email}
                modifyInfo={ModifyShopEmail}
                info={info}
                setInfo={setInfo}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
            <OneLineInfo
                infoType="聯絡電話"
                buttonId="shop-phone"
                shopId={info.id}
                infoValue={info.phone}
                modifyInfo={ModifyShopPhone}
                info={info}
                setInfo={setInfo}
                snackbars={snackbars}
                setSnackbars={setSnackbars} />
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

function ShopProfiles(props: { shop: ShopPageDataType, setShop: (shop: ShopPageDataType) => void }) {
    const [snackbars, setSnackbars] = useState<SnackbarType[]>([]);

    return (
        <React.Fragment>
            <SnackbarList snackbarList={snackbars} setSnackbarList={setSnackbars} />
            <div className="account-profile-infos" style={{flexDirection: "row"}}>
                <ShopProfileInputs info={props.shop} setInfo={props.setShop} snackbars={snackbars} setSnackbars={setSnackbars} />
                <ShopProfileIcon icon={props.shop.icon} />
            </div>
        </React.Fragment>
    );
}

export default function ShopProfile() {
    const [shop, setShop] = useState<ShopPageDataType | null>(null);
    const [cookies] = useCookies(['accountId']);
    useEffect(() => {
        GetShop(cookies.accountId, setShop);
    }, []);

    if (shop === null)
        return (
            <CannotLoadDataPage />
        );
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopProfiles shop={shop} setShop={setShop} />
        </div>
    );
}

async function GetShop(
    userId: string,
    setShop: (shop: ShopPageDataType | null) => void
): Promise<void> {
    setShop(await StaffGetShopProfileController(userId));
}

async function ModifyShopName(
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
): Promise<void> {
    const response = await ModifyShopNameController(userId, shopId, value);
    if (response) {
        setInfo({
            ...info,
            name: value
        });
        setSnackbars([...snackbars, GetNewSnackbar("修改成功", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("修改失敗", Date.now())]);
    }
}

async function ModifyShopAddress(
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
): Promise<void> {
    const response  = await ModifyShopAddressController(userId, shopId, value);
    if (response) {
        setInfo({
            ...info,
            address: value
        });
        setSnackbars([...snackbars, GetNewSnackbar("修改成功", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("修改失敗", Date.now())]);
    }
}

async function ModifyShopPhone(
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
): Promise<void> {
    const response = await ModifyShopPhoneController(userId, shopId, value);
    if (response) {
        setInfo({
            ...info,
            phone: value
        });
        setSnackbars([...snackbars, GetNewSnackbar("修改成功", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("修改失敗", Date.now())]);
    }
}

async function ModifyShopEmail(
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
): Promise<void> {
    const resposne = await ModifyShopEmailController(userId, shopId, value);
    if (resposne) {
        setInfo({
            ...info,
            email: value
        });
        setSnackbars([...snackbars, GetNewSnackbar("修改成功", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("修改失敗", Date.now())]);
    }
}

async function ModifyShopDescription(
    userId: string,
    shopId: string,
    value: string,
    info: ShopPageDataType,
    setInfo: (info: ShopPageDataType) => void,
    snackbars: SnackbarType[],
    setSnackbars: (snackbars: SnackbarType[]) => void
): Promise<void> {
    const resposne = await ModifyShopDescriptionController(userId, shopId, value);
    if (resposne) {
        setInfo({
            ...info,
            description: value
        });
        setSnackbars([...snackbars, GetNewSnackbar("修改成功", Date.now())]);
    } else {
        setSnackbars([...snackbars, GetNewSnackbar("修改失敗", Date.now())]);
    }
}
