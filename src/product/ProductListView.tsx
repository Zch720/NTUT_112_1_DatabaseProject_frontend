import { useEffect, useState } from "react";
import ProductsList from "../utils/list_of_entities/ProductsList";
import { GetProductsPageShopId, GetProductsPageShopName, ProductsPageToolbar } from "./ProductsPage";
import PageChooser from "../utils/PageChooser";
import GetProductsListCount from "../controller/GetProductsListCountController";
import GetProductsList from "../controller/GetProductsListController";
import GetShopProductsListCount from "../controller/GetShopProductsListCountController";
import GetShopProductsList from "../controller/GetShopProductsListController";
import { ProductListDataType } from "../mapper/ProductMapper";

function ProductsPageTitle(props: { shopName: string | null }) {
    const { shopName } = props;

    return(
        <h3 className="products-page-title">{shopName ? shopName : "全部商品"}</h3>
    );
}

export default function AllProduct(props: {
    productType: "all" | "chocolate-cookie" | "butter-cookie" | "sandwich-cookie" | "cookies" | "soft-cookie" | "roll-puff-pastry" | "egg-roll" | "other";
}) {
    const { productType } = props;
    const [productsCount, setProductsCount] = useState<number>(0);
    const shopId = GetProductsPageShopId();
    const shopName = GetProductsPageShopName();
    const [order, setOrder] = useState<"default" | "price" | "date">("default");
    const [showQuantity, setShowQuantity] = useState<"12" | "24" | "36">("12");
    const [products, setProducts] = useState<ProductListDataType[]>([]);
    const productsSetIndexChange = (index: number) => {
        GetProducts(productType, shopId, index, Number.parseInt(showQuantity), productsCount, setProducts);
    };
    useEffect(() => {
        GetProductsCount(productType, shopId, setProductsCount);
    }, []);
    useEffect(() => {
        GetProducts(productType, shopId, 1, Number.parseInt(showQuantity), productsCount, setProducts);
    }, [productsCount, order, showQuantity]);

    return (
        <div className="products-page-content">
            <ProductsPageTitle shopName={shopName}/>
            <ProductsPageToolbar onOrderChange={setOrder} onShowQuantityChange={setShowQuantity} />
            <ProductsList products={products}/>
            <div style={{ margin: "1.2rem 0" }}>
                <PageChooser maxPage={productsCount / Number.parseInt(showQuantity)} onPageChange={productsSetIndexChange} />
            </div>
        </div>
    );
}

async function GetProductsCount(
    productType: "all" | "chocolate-cookie" | "butter-cookie" | "sandwich-cookie" | "cookies" | "soft-cookie" | "roll-puff-pastry" | "egg-roll" | "other",
    shopId: string | null,
    setProductsCount: (count: number) => void
) {
    if (shopId == null)
        setProductsCount(await GetProductsListCount(productType));
    else
        setProductsCount(await GetShopProductsListCount(shopId, productType));
}

async function GetProducts(
    productType: "all" | "chocolate-cookie" | "butter-cookie" | "sandwich-cookie" | "cookies" | "soft-cookie" | "roll-puff-pastry" | "egg-roll" | "other",
    shopId: string | null,
    index: number,
    prePage: number,
    productsCount: number,
    setProducts: (products: ProductListDataType[]) => void
) {
    if (index <= 0 || index > Math.ceil(productsCount / prePage)) {
        return;
    }
    const start = (index - 1) * prePage;
    const end = Math.min(index * prePage, productsCount - 1);
    if (shopId == null)
        setProducts(await GetProductsList(productType, start, end));
    else
        setProducts(await GetShopProductsList(shopId, productType, start, end));
}
