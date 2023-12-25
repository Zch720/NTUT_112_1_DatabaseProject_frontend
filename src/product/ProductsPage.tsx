import React from "react";
import { Outlet } from "react-router-dom";
import "./ProductsPage.css"

export type ProductsListOrderChangeHandler = (order: "default" | "price" | "date") => void;
export type ProductsListShowQuantityChangeHandler = (quantity: "12" | "24" | "36") => void;

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

export default function ProductsPage() {
    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                <div className="product-category-menu">
                    <h3 className="product-category-menu-title">商品分類</h3>
                    <div className="product-category-menu-options">
                        <a href="/products#">全部</a>
                    </div>
                </div>
                <Outlet />
            </div>
        </React.Fragment>
    );
}