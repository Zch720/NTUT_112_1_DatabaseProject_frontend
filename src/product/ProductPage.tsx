import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import ImagesViewer from "../utils/ImagesViewer";
import { ProductPageDataType } from "../mapper/ProductMapper";
import GetAccountFollowedShopController from "../controller/GetAccountFollowedShopController";
import GetProductController from "../controller/GetProductController";
import { useCookies } from "react-cookie";
import SnackbarList, { GetNewSnackbar, SnackbarType } from "../utils/Snackbar";
import SetShoppingCartProduct from "../controller/SetShoppingCartProductController";
import { devMode } from "../config.json";

function ProductInfo(props: {
    accountId: string,
    product: ProductPageDataType,
    snackbarList: SnackbarType[],
    setSnackbarList: (snackbarList: SnackbarType[]) => void
}) {
    const { accountId, product, snackbarList, setSnackbarList } = props;
    const [quantity, setQuantity] = useState(0);
    const quantityAdd = () => {
        if (quantity < product.stock)
            setQuantity(quantity + 1);
    }
    const quantityMinus = () => {
        if (quantity > 0)
            setQuantity(quantity - 1);
    }
    const AddToShoppingCartOnClick = () => {
        AddProductToShoppingCart(accountId, GetProductId()!, quantity, snackbarList, setSnackbarList);
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
                <button className="add-to-shopping-cart-button" onClick={AddToShoppingCartOnClick}>加入購物車</button>
            </div>
        </div>
    );
}

function ProductShopInfo(props: {
    accountId: string,
    product: ProductPageDataType
}) {
    const { accountId, product } = props;
    const [followed, setFollowed] = useState(false);
    useEffect(() => {
        GetUserFollowedShop(accountId, product.shopId, setFollowed);
    });

    return (
        <div className="product-page-shop-info">
            <div className="product-page-shop-logo">
                <img src={product.shopLogo}/>
            </div>
            <div className="product-page-shop-infos">
                <div className="product-page-shop-info-header">
                    <h3>{product.shopName}</h3>
                    <div className="product-page-shop-follow">
                        {followed ?
                            <button id="unfollow-button" onClick={() => setFollowed(false)}>取消追蹤</button>
                        :
                            <button id="follow-button" onClick={() => setFollowed(true)}>追蹤</button>
                        }
                    </div>
                </div>
                <p>{product.shopDescription}</p>
                <div className="w-flex-g1"></div>
            </div>
        </div>
    );
}

function ProductDescription(props: { product: ProductPageDataType }) {
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
    const [product, setProduct] = useState<ProductPageDataType | null>(null);
    const [snackBars, setSnackBars] = useState<SnackbarType[]>([]);
    const [cookies] = useCookies(["accountId"]);
    useEffect(() => {
        const productId = GetProductId();
        if (productId != null)
            GetProduct(productId, setProduct);
    }, []);

    return (
        product != null
        ?
            <React.Fragment>
                <SnackbarList snackbarList={snackBars} setSnackbarList={setSnackBars} />
                <ProductInfo accountId={cookies.accountId} product={product} snackbarList={snackBars} setSnackbarList={setSnackBars}/>
                <ProductShopInfo accountId={cookies.accountId} product={product} />
                <ProductDescription product={product} />
            </React.Fragment>
        : null
    );
}

async function GetUserFollowedShop(
    userId: string,
    shopId: string,
    setFollowed: (followed: boolean) => void
) {
    setFollowed(await GetAccountFollowedShopController(userId, shopId));
}

function GetProductId() {
    if (devMode)
        return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("productId");
}

async function GetProduct(
    productId: string,    
    setProduct: (product: ProductPageDataType | null) => void
) {
    if (devMode) {
        setProduct({
            images: [],
            name: "fake product",
            price: 100,
            stock: 10000,
            description: "This is a fake product",
            category: "category1, category2",
            shopId: "",
            shopName: "",
            shopLogo: "",
            shopDescription: ""
        });
        return;
    }

    setProduct(await GetProductController(productId));
}

async function AddProductToShoppingCart(
    userId: string,
    productId: string,
    quantity: number,
    snackbarList: SnackbarType[],
    setSnackbarList: (snackbarList: SnackbarType[]) => void
) {
    const response = await SetShoppingCartProduct(userId, productId, quantity);
    if (response) {
        setSnackbarList([...snackbarList, GetNewSnackbar("已加入購物車", Date.now())])
    } else {
        setSnackbarList([...snackbarList, GetNewSnackbar("加入購物車失敗", Date.now())])
    }
}