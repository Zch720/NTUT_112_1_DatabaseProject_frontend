import { useState } from "react";
import "./ShopProducts.css"
import SearchBox from "../../SearchBox";
import PageChooser from "../../PageChooser";

type ProductType = {
    name: string;
    price: number;
    stock: number;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商品管理</h3>
    );
}

function ProductCategorySelector() {
    return (
        <select name="shop-products-category" id="shop-products-category">
            <option value="all">全部</option>
            <option value="category1">分類 1</option>
            <option value="category2">分類 2</option>
        </select>
    );
}

function ProductsListToolbar() {
    return (
        <div className="shop-products-toolbar">
            <div className="search-box-container">
                <SearchBox hasBorder={true} />
            </div>
            <ProductCategorySelector />
            <button className="shop-products-add-new">新增商品</button>
        </div>
    );
}

function ProductTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "35vw"}}>商品名稱</td>
            <td style={{width: "17vw"}}>價錢</td>
            <td style={{width: "17vw"}}>庫存</td>
        </tr>
    );
}

function ProductRow({ product }: { product: ProductType }) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
        </tr>
    );
}

function ProductsTable({ products }: { products: ProductType[] }) {
    return (
        <table>
            <thead>
                <ProductTableHeaderRow />
            </thead>
            <tbody>
                {products.map((product) => <ProductRow product={product} />)}
            </tbody>
        </table>
    );
}

function ShopProductsList({ products }: { products: ProductType[] }) {
    return (
        <div className="shop-products-list">
            <ProductsListToolbar />
            <ProductsTable products={products} />
            {/* TODO: set max page */}
            <PageChooser maxPage={0} onPageChange={() => {}} />
        </div>
    );
}

export default function ShopProducts() {
    // TODO: set products
    const [products, setProducts] = useState<ProductType[]>([]);

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopProductsList products={products} />
        </div>
    );
}