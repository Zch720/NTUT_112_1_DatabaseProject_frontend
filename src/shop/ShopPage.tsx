import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import ProductsPage from "../product/ProductsPage";
import { ShopPageDataType } from "../mapper/ShopMapper";
import GetShopController from "../controller/GetShopController";
import GetAccountFollowedShopController from "../controller/GetAccountFollowedShopController";
import { useCookies } from "react-cookie";
import ModifyAccountShopFollowStateController from "../controller/ModifyAccountShopFollowStateController";

function ShopBannerLogo({ shop }: { shop: ShopPageDataType }) {
    return (
        <div className="shop-page-banner-logo">
            <img src={shop.icon} alt="shop-logo"/>
        </div>
    );
}

function ShopBannerInfo({ shop }: { shop: ShopPageDataType }) {
    return (
        <div className="shop-page-banner-info">
            <div className="shop-page-banner-info-head">
                <h1>{shop.name}</h1>
                <ShopFollowButton />
            </div>
            <p>{shop.description}</p>
            <div className="w-flex-g1"></div>
            <p>
                <span>地址：{shop.address}</span><br/>
                <span>Email：{shop.email}</span><br/>
                <span>聯絡電話：{shop.phone}</span>
            </p>
        </div>
    );
}

function ShopFollowButton() {
    const [followed, setFollowed] = useState(false);
    const [cookies] = useCookies(["accountId"]);
    useEffect(() => {
        GetUserFollowed(cookies.accountId, GetShopId(), setFollowed);
    }, []);
    const cancelFollow = () => {
        setFollowed(false);
        ModifyShopFollowState(cookies.accountId, GetShopId(), false);
    };
    const follow = () => {
        setFollowed(true);
        ModifyShopFollowState(cookies.accountId, GetShopId(), true);
    };

    return (
        <div className="shop-page-follow">
            {followed ?
                <button id="unfollow-button" onClick={cancelFollow}>取消追蹤</button>
            :
                <button id="follow-button" onClick={follow}>追蹤</button>
            }
        </div>    
    );
}

function ShopBanner(props: { shop: ShopPageDataType }) {
    const { shop } = props;

    return (
        <div className="shop-page-banner">
            <ShopBannerLogo shop={shop}/>
            <ShopBannerInfo shop={shop}/>
        </div>
    );
}

export default function ShopPage() {
    const [shop, setShop] = useState<ShopPageDataType | null>(null);
    useEffect(() => {
        GetShop(GetShopId(), setShop);
    }, []);

    return (
        shop != null
        ?
            <React.Fragment>
                <ShopBanner shop={shop}/>
                <ProductsPage shopId={GetShopId()} shopName={shop.name}/>
            </React.Fragment>
        : null
    );
}

async function GetUserFollowed(
    userId: string,
    shopId: string,
    setFollowed: (followed: boolean) => void
) {
    setFollowed(await GetAccountFollowedShopController(userId, shopId));
}

function GetShopId(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") as string;
}

async function GetShop(
    shopId: string,
    setShop: (shop: ShopPageDataType | null) => void    
) {
    setShop(await GetShopController(shopId));
}

async function ModifyShopFollowState(
    userId: string,
    shopId: string,
    followed: boolean
) {
    await ModifyAccountShopFollowStateController(userId, shopId, followed);
}