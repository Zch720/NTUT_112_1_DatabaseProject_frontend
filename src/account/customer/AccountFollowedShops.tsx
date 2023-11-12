import "../../ShopList.css"
import "./AccountFollowedShops.css"
import { ShopItemProps } from "../../ShopList";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 追蹤商店</h3>
    );
}

function ShopItem({ shopUrl, image, shopName }: ShopItemProps) {
    return (
        <div className="shop-list-item">
            <a href={shopUrl}><img src={image} /></a>
            <a href={shopUrl}><span>{shopName}</span></a>
            {ShopFollowedButton(shopName + "-followed-button")}
        </div>
    );
}

type ShopListProps = {
    shops: ShopItemProps[];
}

function ShopFollowedButton (buttonId: string) {
    return(
        <div className="shop-followed-button">
            <input type="checkbox" id={buttonId}/>
            <label htmlFor={buttonId}></label><br/>
        </div>
    );
}

function FollowedShopList ({ shops }: ShopListProps) {
    return(
        <div className="shop-list">
            {shops.map((shop) => (
                <ShopItem shopUrl={shop.shopUrl} image={shop.image} shopName={shop.shopName} />
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