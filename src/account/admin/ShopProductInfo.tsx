import ImagesViewer from "../../utils/ImagesViewer";
import "./ShopProductInfo.css";

type ProductDataType = {
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    onShelfTime: string;
    sold: number;
    images: string[];
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商店管理 {">"} 商店詳細資訊 {">"} 商品詳細資訊</h3>
    );
}

function ProductInfoToolBar() {
    return (
        <div className="product-info-tool-bar">
            <button>刪除此商品</button>
        </div>
    );
}

function ProductLineInfo({ name, value }: { name: string, value: string }) {
    return (
        <div className="product-line-info">
            <label className="product-info-label">{name}</label>
            <div className="w-flex-g1">
                <span>{value}</span>
            </div>
        </div>
    );
}

function ProductDescriptionInfo({ name, value }: { name: string, value: string }) {
    return (
        <div className="product-description-info">
            <label className="product-info-label">{name}</label>
            <div className="w-flex-g1">
                <span>{value}</span>
            </div>
        </div>
    );
}

function ProductInfos() {
    // TODO: get product from server
    const product: ProductDataType = getFakeProduct();

    return (
        <div className="product-infos">
            <div className="product-infos-left w-flex-g1">
                <ProductLineInfo name="商品名稱" value={product.name} />
                <ProductLineInfo name="商品分類" value={product.category} />
                <ProductDescriptionInfo name="商品描述" value={product.description} />
                <ProductLineInfo name="價錢" value={`\$${product.price}`} />
                <ProductLineInfo name="庫存" value={product.stock.toString()} />
                <ProductLineInfo name="上架時間" value={product.onShelfTime} />
                <ProductLineInfo name="售出量" value={product.sold.toString()} />
            </div>
            <div className="product-infos-right">
                <label className="product-info-label">商品圖片</label>
                <div className="product-info-images">
                    <ImagesViewer images={product.images    } />
                </div>
            </div>
        </div>
    );
}

export default function ShopProductManagementInfo() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ProductInfoToolBar />
            <ProductInfos />
        </div>
    );
}

function getFakeProduct(): ProductDataType {
    return {
        name: "特級焦糖格紋餅乾 - 限量暖心珍藏版",
        category: "焦糖餅乾",
        description: "特級焦糖格紋餅乾 - 限量暖心珍藏版 (售完不補,數量有限)\n超級好吃，不買會後悔~",
        price: 999,
        stock: 2,
        onShelfTime: "2023/10/25 09:13",
        sold: 498,
        images: [
            "https://i.imgur.com/HgELSyF.png",
            "https://i.imgur.com/4pPAVIJ.png",
            "https://i.imgur.com/9yplM34.png"
        ]
    }
}