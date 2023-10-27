import "./ShopList.css"

export type ShopItemProps = {
    shopUrl: string;
    image: string;
    shopName: string;
}

function ShopItem({ shopUrl, image, shopName }: ShopItemProps) {
    return (
        <div className="shop-list-item">
            <a href={shopUrl}><img src={image} /></a>
            <a href={shopUrl}><span>{shopName}</span></a>
        </div>
    );
}

type ShopListProps = {
    shops: ShopItemProps[];
}

export default function ShopList({ shops }: ShopListProps) {
    return (
        <div className="shop-list">
            {shops.map((shop) => (
                <ShopItem shopUrl={shop.shopUrl} image={shop.image} shopName={shop.shopName} />
            ))}
        </div>
    );
}