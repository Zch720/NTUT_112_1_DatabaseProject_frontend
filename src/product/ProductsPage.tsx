import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import "./ProductsPage.css"

export type ProductsListOrderChangeHandler = (order: "default" | "price" | "date") => void;
export type ProductsListShowQuantityChangeHandler = (quantity: "12" | "24" | "36") => void;

type ProductsOutletContextType = {
    shopId: string | null;
    shopName: string | null;
};

function ProductsOrderSelector({ onOrderChange }: { onOrderChange: ProductsListOrderChangeHandler }) {
    const orderSelectorRef = React.useRef<HTMLSelectElement>(null);
    orderSelectorRef.current?.addEventListener("change", () => {
        onOrderChange(orderSelectorRef.current?.value as "default" | "price" | "date");
    });

    return (
        <select className="products-order-selector" ref={orderSelectorRef}>
            <option value="default">預設排序</option>
            <option value="price">價格</option>
            <option value="date">日期</option>
        </select>
    );
}

function ProductShowQuantitySelector({ onShowQuantityChange }: { onShowQuantityChange: ProductsListShowQuantityChangeHandler }) {
    const showQuantitySelectorRef = React.useRef<HTMLSelectElement>(null);
    showQuantitySelectorRef.current?.addEventListener("change", () => {
        onShowQuantityChange(showQuantitySelectorRef.current?.value as "12" | "24" | "36");
    });

    return (
        <select className="product-show-quantity-selector" ref={showQuantitySelectorRef}>
            <option value="12">每頁顯示 12 項</option>
            <option value="24">每頁顯示 24 項</option>
            <option value="36">每頁顯示 36 項</option>
        </select>
    );
}

export function ProductsPageToolbar({ onOrderChange, onShowQuantityChange }: { onOrderChange: ProductsListOrderChangeHandler, onShowQuantityChange: ProductsListShowQuantityChangeHandler }) {
    return (
        <div className="products-page-toolbar">
            <ProductsOrderSelector onOrderChange={onOrderChange} />
            <ProductShowQuantitySelector onShowQuantityChange={onShowQuantityChange} />
        </div>
    );
}

export function GetProductsPageShopId() {
    const context = useOutletContext<ProductsOutletContextType>();
    return context.shopId;
}

export function GetProductsPageShopName() {
    const context = useOutletContext<ProductsOutletContextType>();
    return context.shopName;
}

ProductsPage.defaultProps = { shopId: null, shopName: null };
export default function ProductsPage(props : { shopId: string, shopName: string }) {
    const { shopId, shopName } = props;
    const urlPrefix = shopId == null ? "/products" : "/shop";
    const urlParams = shopId == null ? "" : `?id=${shopId}`;

    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                <div className="product-category-menu">
                    <h3 className="product-category-menu-title">商品分類</h3>
                    <div className="product-category-menu-options">
                        <a href={`${urlPrefix}${urlParams}#`}>全部</a>
                        <a href={`${urlPrefix}/chocolate-cookie${urlParams}#`}>巧克力餅乾</a>
                        <a href={`${urlPrefix}/butter-cookie${urlParams}#`}>奶油餅乾</a>
                        <a href={`${urlPrefix}/sandwich-cookie${urlParams}#`}>夾心餅乾</a>
                        <a href={`${urlPrefix}/cookies${urlParams}#`}>曲奇餅乾</a>
                        <a href={`${urlPrefix}/soft-cookie${urlParams}#`}>美式軟餅乾</a>
                        <a href={`${urlPrefix}/roll-puff-pastry${urlParams}#`}>捲心酥</a>
                        <a href={`${urlPrefix}/egg-roll${urlParams}#`}>蛋捲</a>
                        <a href={`${urlPrefix}/other${urlParams}#`}>其他</a>
                    </div>
                </div>
                <Outlet context={{ shopId: shopId, shopName: shopName }}/>
            </div>
        </React.Fragment>
    );
}