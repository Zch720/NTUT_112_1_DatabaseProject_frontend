import "./HomePage.css";
import React from "react";
import Banner from "./Banner";
import ShopList from "../utils/list_of_entities/ShopList";
import { ShopListData } from "../mapper/ShopMapper"

function HomePageAboutUs() {
    return (
        <React.Fragment>
            <h3 className="home-page-title">關於我們</h3>
            <div className="home-page-about-us">
                <div id="home-page-about-us-img"></div>
                <p>
                    歡迎來到我們的餅乾商店！<br />
                    我們是熱情的餅乾愛好者，致力於為您提供最美味的手工餅乾。我們深信，優質成分和烘焙技巧是創造絕妙味道的關鍵。無論是巧克力餅乾、燕麥餅乾還是曲奇餅，我們提供多樣選擇，滿足您的味蕾。<br />
                    我們關注餅乾味道，也重視包裝和客戶體驗。感謝您的支持，讓我們與您分享這份熱情。如果有問題或建議，隨時聯絡我們。期待為您提供美味餅乾，成為您的首選。<br />
                    謝謝您的光臨！
                </p>
            </div>
        </React.Fragment>
    );
}

function HomePageRecommendedShops() {
    return (
        <React.Fragment>
            <h3 className="home-page-title">推薦商店</h3>
            {/* TODO: add shop list */}
            <ShopList shops={fakeShops} />
        </React.Fragment>
    );
}

export default function HomePage() {
    return (
        <React.Fragment>
            <Banner />
            <HomePageAboutUs />
            <HomePageRecommendedShops />
        </React.Fragment>
    );
}

const fakeShops: ShopListData[] = [
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    },
    {
        shopId: "",
        shopIcon: "logo.PNG",
        shopName: "shop",
    }
];