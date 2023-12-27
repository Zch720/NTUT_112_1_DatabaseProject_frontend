import React, { useState } from "react";
import "./ShopPage.css";
import ProductsPage from "../product/ProductsPage";

type ShopDataType = {
    logo: string;
    name: string;
    description: string;
    address: string;
    email: string;
    phoneNumber: string;
};

function ShopBannerLogo({ shop }: { shop: ShopDataType }) {
    return (
        <div className="shop-page-banner-logo">
            <img src={shop.logo} alt="shop-logo"/>
        </div>
    );
}

function ShopBannerInfo({ shop }: { shop: ShopDataType }) {
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
                <span>聯絡電話：{shop.phoneNumber}</span>
            </p>
        </div>
    );
}

function ShopFollowButton() {
    const [followed, setFollowed] = useState(getUserFollowed());

    return (
        <div className="shop-page-follow">
            {followed ?
                <button id="unfollow-button" onClick={() => setFollowed(false)}>取消追蹤</button>
            :
                <button id="follow-button" onClick={() => setFollowed(true)}>追蹤</button>
            }
        </div>    
    );
}

function ShopBanner(props: { shop: ShopDataType }) {
    const { shop } = props;

    return (
        <div className="shop-page-banner">
            <ShopBannerLogo shop={shop}/>
            <ShopBannerInfo shop={shop}/>
            {/* <ShopBannerFollowButton /> */}
        </div>
    );
}

export default function ShopPage() {
    // TODO: get shop data from server
    const shop: ShopDataType = getFakeShopData();

    return (
        <React.Fragment>
            <ShopBanner shop={shop}/>
            <ProductsPage shopName={shop.name}/>
        </React.Fragment>
    );
}

function getUserFollowed(): boolean {
    // TODO: get user followed from server
    return false;
}

function getFakeShopData(): ShopDataType {
    return {
        logo: "/logo.PNG",
        name: "旋風奶油",
        description: "致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。致力於做出可以飛的餅乾。",
        address: "苗栗國旋風街 777 巷 6 號",
        email: "whirlwind_cream@gmail.com",
        phoneNumber: "(05) 7777-6666"
    };
}