import "./ShopList.css"
import { ShopListData } from "../../mapper/ShopMapper";

function ShopItem({ shopId, shopIcon, shopName }: ShopListData) {
    return (
        <div className="shop-list-item">
            <a href={`/shop?id=${shopId}`}><img src={shopIcon} /></a>
            <a href={`/shop?id=${shopId}`}><span>{shopName}</span></a>
        </div>
    );
}

export default function ShopList({ shops }: { shops: ShopListData[] }) {
    return (
        <div className="shop-list">
            {shops.map((shop, idx) => (
                <ShopItem key={"shop-list-" + idx} shopId={shop.shopId} shopIcon={shop.shopIcon} shopName={shop.shopName} />
            ))}
        </div>
    );
}