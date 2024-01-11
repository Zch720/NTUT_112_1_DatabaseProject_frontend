import "../../utils/list_of_entities/ShopList.css"
import "./AccountFollowedShops.css"
import { useEffect, useState, useRef } from "react";
import { ShopListData } from "../../mapper/ShopMapper";
import GetAccountFollowedShopsListCountController from "../../controller/GetAccountFollowedShopsListCountController";
import { useCookies } from "react-cookie";
import GetAccountFollowedShopsListController from "../../controller/GetAccountFollowedShopsListControllere";
import ModifyAccountShopFollowStateController from "../../controller/ModifyAccountShopFollowStateController";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 追蹤商店</h3>
    );
}

function ShopItem(props: ShopListData) {
    const { shopId, shopIcon, shopName } = props;

    return (
        <div className="shop-list-item">
            <a href={`/shop?id=${shopId}`}><img src={shopIcon} /></a>
            <a href={`/shop?id=${shopId}`}><span>{shopName}</span></a>
            <ShopFollowedButton shopId={shopId} buttonId={shopId + "-follow-button"} />
        </div>
    );
}

function ShopFollowedButton (props: {
    shopId: string,
    buttonId: string
}) {
    const { buttonId } = props;
    const [cookies] = useCookies(["accountId"]);
    const followInputRef = useRef<HTMLInputElement>(null);
    const onFollowedButtonClick = () => {
        if (followInputRef.current == null) return;
        ModifyShopFollowedStatus(cookies.accountId, props.shopId, followInputRef.current.checked);
    }

    return(
        <div className="shop-followed-button">
            <input type="checkbox" id={buttonId} ref={followInputRef} onClick={onFollowedButtonClick}/>
            <label htmlFor={buttonId}></label><br/>
        </div>
    );
}

function FollowedShopList (props: {
    shops: ShopListData[]
}) {
    const [shops, setShops] = useState<ShopListData[]>(props.shops);
    useEffect(() => {
        setShops(props.shops);
    }, [props.shops]);

    return(
        <div className="shop-list">
            {shops.map((shop) => (
                <ShopItem key={"shop-list-" + shop.shopId} shopId={shop.shopId} shopIcon={shop.shopIcon} shopName={shop.shopName} />
            ))}
        </div>
    );
}

export default function AccountFollowedShops() {
    const [cookies] = useCookies(["accountId"]);
    const [shopsCount, setShopsCount] = useState(0);
    const [shops, setShops] = useState<ShopListData[]>([]);
    useEffect(() => {
        GetShopsCount(cookies.accountId, setShopsCount);
    }, []);
    useEffect(() => {
        GetShops(cookies.accountId, shopsCount, setShops);
    }, [shopsCount]);

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <FollowedShopList shops={shops} />
        </div>
    );
}

async function GetShopsCount(
    userId: string,
    setShopsCount: (count: number) => void
): Promise<void> {
    const result = await GetAccountFollowedShopsListCountController(userId);
    setShopsCount(result);
}

async function GetShops(
    userId: string,
    shopsCount: number,
    setShops: (shops: ShopListData[]) => void
): Promise<void> {
    const result = await GetAccountFollowedShopsListController(userId, 0, shopsCount - 1);
    setShops(result);
}

async function ModifyShopFollowedStatus(
    userId: string,
    shopId: string,
    followed: boolean
): Promise<void> {
    await ModifyAccountShopFollowStateController(userId, shopId, followed);
}