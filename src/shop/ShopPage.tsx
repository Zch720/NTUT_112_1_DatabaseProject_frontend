import { useState, useRef } from "react";
import "./ShopPage.css";

type ShopDataType = {
    logo: string;
    name: string;
    description: string;
    address: string;
    email: string;
    phoneNumber: string;
};

export default function ShopPage() {
    // TODO: get shop data from server
    const [followed, setFollowed] = useState(getUserFollowed());
    const shopData: ShopDataType = getFakeShopData();

    return (
        <div className="shop-page-banner">
            <div className="shop-page-banner-logo">
                <img src={shopData.logo} alt="shop-logo"/>
            </div>
            <div className="shop-page-banner-info">
                <h1>{shopData.name}</h1>
                <p>{shopData.description}</p>
                <div className="w-flex-g1"></div>
                <p>
                    <span>地址：{shopData.address}</span><br/>
                    <span>Email：{shopData.email}</span><br/>
                    <span>聯絡電話：{shopData.phoneNumber}</span>
                </p>
            </div>
            <div className="w-flex-g1"></div>
            <div className="shop-page-banner-follow">
                {followed ?
                    <button id="unfollow-button" onClick={() => setFollowed(false)}>取消追蹤</button>
                :
                    <button id="follow-button" onClick={() => setFollowed(true)}>追蹤</button>
                }
            </div>
        </div>
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