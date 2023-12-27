import React, { useState } from "react";
import "./ProductPage.css";
import ImagesViewer from "../utils/ImagesViewer";

type ProductDataType = {
    images: string[];
    name: string;
    price: number;
    stock: number;
    description: string;
    category: string;
    shopId: string;
    shop: string;
    shopLogo: string;
    shopDescription: string;
};

function ProductInfo(props: { product: ProductDataType }) {
    const { product } = props;
    const [quantity, setQuantity] = useState(0);
    const quantityAdd = () => {
        if (quantity < product.stock)
            setQuantity(quantity + 1);
    }
    const quantityMinus = () => {
        if (quantity > 0)
            setQuantity(quantity - 1);
    }
    
    return (
        <div className="product-page-info">
            <div className="product-page-images">
                <ImagesViewer images={product.images}/>
            </div>
            <div className="product-page-infos">
                <h1>{product.name}</h1>
                <h1>${product.price}</h1>
                <div className="w-flex-g1"></div>
                <div className="product-page-quantity">
                    數量
                    <div className="product-page-quantity-selector">
                        <button onClick={quantityMinus}><img src="/images/product_quantity_selector_minus.svg"/></button>
                        <div>{quantity}</div>
                        <button onClick={quantityAdd}><img src="/images/product_quantity_selector_add.svg"/></button>
                    </div>
                    <span className="product-page-stock">庫存 {product.stock} 件</span>
                </div>
                <button className="add-to-shopping-cart-button">加入購物車</button>
            </div>
        </div>
    );
}

function ProductShopInfo(props: { product: ProductDataType }) {
    const { product } = props;
    const [followed, setFollowed] = useState(getUserFollowedShop());

    return (
        <div className="product-page-shop-info">
            <div className="product-page-shop-logo">
                <img src="/logo.PNG"/>
            </div>
            <div className="product-page-shop-infos">
                <h3>{product.shop}</h3>
                <p>{product.shopDescription}</p>
                <div className="w-flex-g1"></div>
                <div className="product-page-shop-follow">
                    {followed ?
                        <button id="unfollow-button" onClick={() => setFollowed(false)}>取消追蹤</button>
                    :
                        <button id="follow-button" onClick={() => setFollowed(true)}>追蹤</button>
                    }
                </div>
            </div>
        </div>
    );
}

function ProductDescription(props: { product: ProductDataType }) {
    const { product } = props;

    return (
        <div className="product-page-description">
            <h2>{"商品分類 > " + product.category}</h2>
            <div style={{ height: "0.5rem" }}></div>
            <h1>商品敘述</h1>
            <p>{product.description}</p>
        </div>
    );
}

export default function ProductPage() {
    // TODO: get product data from server
    const product = getFakeProductData();

    return (
        <React.Fragment>
            <ProductInfo product={product} />
            <ProductShopInfo product={product} />
            <ProductDescription product={product} />
        </React.Fragment>
    );
}

function getUserFollowedShop(): boolean {
    // TODO: get user followed from server
    return false;
}

function getFakeProductData(): ProductDataType {
    return {
        images: [
            "https://i.imgur.com/HgELSyF.png",
            "https://i.imgur.com/4pPAVIJ.png",
            "https://i.imgur.com/9yplM34.png"
        ],
        name: "宇宙好吃到爆炸巧克力豆軟餅乾",
        price: 80,
        stock: 30,
        description: "迎接全新的美味冒險，品味宇宙好吃到爆炸的巧克力豆軟餅乾！這款特別的餅乾將帶你飛向無垠的星際宇宙，每一口都是一場宇宙之旅的絕佳體驗。無論是單獨享用，或搭配你最愛的飲料，都能為你的味蕾帶來無限的喜悅。",
        category: "軟餅乾",
        shopId: "1",
        shop: "旋風奶油",
        shopLogo: "/logo.PNG",
        shopDescription: "致力於做出可以飛的奶油餅乾。"
    }
}