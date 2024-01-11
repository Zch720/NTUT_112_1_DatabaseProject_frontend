import { useEffect, useRef, useState } from "react";
import "./ShopProducts.css"
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";
import { ProductListDataType, ProductPageDataType } from "../../mapper/ProductMapper";
import StaffGetShopProductsListCount from "../../controller/StaffGetShopProductsListCountController";
import StaffGetShopProductsList from "../../controller/StaffGetShopProductsListController";
import { useCookies } from "react-cookie";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商品管理</h3>
    );
}

function ProductCategorySelector(props: {
    categorySelectorRef: React.RefObject<HTMLSelectElement>,
    selectorChangedHandler: () => void
}) {
    const { categorySelectorRef, selectorChangedHandler } = props;
    return (
        <select name="shop-products-category" id="shop-products-category" ref={categorySelectorRef} onChange={selectorChangedHandler}>
            <option value="all">全部</option>
            <option value="chocolate-cookie">巧克力餅乾</option>
            <option value="butter-cookie">奶油餅乾</option>
            <option value="sandwich-cookie">三明治餅乾</option>
            <option value="cookies">曲奇餅乾</option>
            <option value="soft-cookie">美式軟餅乾</option>
            <option value="roll-puff-pastry">捲心酥</option>
            <option value="egg-roll">蛋捲</option>
            <option value="other">其他</option>
        </select>
    );
}

function ProductsListToolbar(props: {
    categorySelectorRef: React.RefObject<HTMLSelectElement>,
    selectorChangedHandler: () => void
}) {
    const { categorySelectorRef, selectorChangedHandler } = props;
    return (
        <div className="shop-products-toolbar">
            <div style={{ marginRight: "0.5vw" }}>
                <SearchBox hasBorder={true} />
            </div>
            <ProductCategorySelector categorySelectorRef={categorySelectorRef} selectorChangedHandler={selectorChangedHandler} />
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

function ProductRow({ product }: { product: ProductListDataType }) {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
        </tr>
    );
}

function ProductsTable(props : { products: ProductListDataType[] }) {
    const [products, setProducts] = useState<ProductListDataType[]>(props.products);
    useEffect(() => {
        setProducts(props.products);
    }, [props.products]);
    return (
        <div className="eletable">
            <table>
                <thead>
                    <ProductTableHeaderRow />
                </thead>
                <tbody>
                    {products.map((product, idx) => <ProductRow key={"product-list-" + idx} product={product} />)}
                </tbody>
            </table>
        </div>
    );
}

function ShopProductsList() {
    const [productsCount, setProductsCount] = useState(0);
    const [products, setProducts] = useState<ProductListDataType[]>([]);
    const categorySelectorRef = useRef<HTMLSelectElement>(null);
    const [cookies] = useCookies(['accountId']);
    useEffect(() => {
        GetProductsCount("all", cookies.accountId, setProductsCount);
    }, []);
    useEffect(() => {
        if (categorySelectorRef == null) {
            GetProducts("all" as any, cookies.accountId, 0, 10, productsCount, setProducts);
        } else {
            GetProducts(categorySelectorRef.current!.value as any, cookies.accountId, 1, 10, productsCount, setProducts);
        }
    }, [productsCount])
    const selectorChangedHandler = () => {
        GetProductsCount(categorySelectorRef.current!.value as any, cookies.accountId, setProductsCount);
    }
    const pageChangedHandler = (index: number) => {
        GetProducts(categorySelectorRef.current!.value as any, cookies.accountId, index, 10, productsCount, setProducts);
    }

    return (
        <div className="shop-products-list">
            <ProductsListToolbar categorySelectorRef={categorySelectorRef} selectorChangedHandler={selectorChangedHandler} />
            <ProductsTable products={products} />
            <PageChooser maxPage={Math.ceil(productsCount / 10)} onPageChange={pageChangedHandler} />
        </div>
    );
}

export default function ShopProducts() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopProductsList />
        </div>
    );
}

async function GetProductsCount(
    productType: "all" | "chocolate-cookie" | "butter-cookie" | "sandwich-cookie" | "cookies" | "soft-cookie" | "roll-puff-pastry" | "egg-roll" | "other",
    userId: string,
    setProductsCount: (count: number) => void
) {
    setProductsCount(await StaffGetShopProductsListCount(userId, productType));
}

async function GetProducts(
    productType: "all" | "chocolate-cookie" | "butter-cookie" | "sandwich-cookie" | "cookies" | "soft-cookie" | "roll-puff-pastry" | "egg-roll" | "other",
    userId: string,
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
    setProducts(await StaffGetShopProductsList(userId, productType, start, end));
}