import { useState } from "react";
import "./AllProduct.css"
import ProductsList, { ProductListItemType } from "../utils/list_of_entities/ProductsList";
import { GetProductsPageShopId, GetProductsPageShopName, ProductsPageToolbar } from "./ProductsPage";
import PageChooser from "../utils/PageChooser";

function ProductsPageTitle(props: { shopName: string | null }) {
    const { shopName } = props;

    return(
        <h3 className="products-page-title">{shopName ? shopName : "全部商品"}</h3>
    );
}

export default function AllProduct() {
    // TODO: get products from server
    const productsPage = 0;
    const shopId = GetProductsPageShopId();
    const shopName = GetProductsPageShopName();
    const [order, setOrder] = useState<"default" | "price" | "date">("default");
    const [showQuantity, setShowQuantity] = useState<"12" | "24" | "36">("12");
    const [products, setProducts] = useState<ProductListItemType[]>([]);
    const productsSetIndexChange = (index: number) => {
        // TODO: get products from server
        setProducts([]);
    };

    return (
        <div className="products-page-content">
            <ProductsPageTitle shopName={shopName}/>
            <ProductsPageToolbar onOrderChange={setOrder} onShowQuantityChange={setShowQuantity} />
            <ProductsList products={products}/>
            <PageChooser maxPage={productsPage} onPageChange={productsSetIndexChange} />
        </div>
    );
}