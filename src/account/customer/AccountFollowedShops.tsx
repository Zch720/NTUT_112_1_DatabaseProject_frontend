import "../../utils/list_of_entities/ShopList.css"
import "./AccountFollowedShops.css"
import { ShopListData } from "../../mapper/ShopMapper";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 追蹤商店</h3>
    );
}

function ShopItem({ shopId, shopIcon, shopName }: ShopListData) {
    return (
        <div className="shop-list-item">
            <a href={`/shop?id=${shopId}`}><img src={shopIcon} /></a>
            <a href={`/shop?id=${shopId}`}><span>{shopName}</span></a>
            {ShopFollowedButton(shopName + "-followed-button")}
        </div>
    );
}

function ShopFollowedButton (buttonId: string) {
    return(
        <div className="shop-followed-button">
            <input type="checkbox" id={buttonId}/>
            <label htmlFor={buttonId}></label><br/>
        </div>
    );
}

function FollowedShopList ({ shops }: { shops: ShopListData[] }) {
    return(
        <div className="shop-list">
            {shops.map((shop) => (
                <ShopItem shopId={shop.shopId} shopIcon={shop.shopIcon} shopName={shop.shopName} />
            ))}
        </div>
    );
}

export default function AccountFollowedShops() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <FollowedShopList shops={[]} />
        </div>
    );
}