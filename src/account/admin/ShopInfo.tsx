import React, { useState } from "react";
import "./ShopInfo.css";
import "./../Account.css"
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";

type ProductDataType = {
    productName: string;
    price: number;
    stock: number;
};

type StaffDataType = {
    staffAccount: string;
    staffName: string;
    staffEmail: string;

};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商店管理 {">"} 商店詳細資訊</h3>
    );
}

function ShopInfoToolBar() {
    return (
        <div className="shop-info-tool-bar">
            <button>刪除此商店</button>
        </div>
    );
}

function ShopLineInfo({ name, value }: { name: string, value: string }) {
    return (
        <div className="shop-line-info">
            <label className="shop-info-label">{name}</label>
            <div className="w-flex-g1">
                <span>{value}</span>
            </div>
        </div>
    );
}

function ShopDescriptionInfo({ name, value }: { name: string, value: string }) {
    return (
        <div className="shop-description-info">
            <label className="shop-info-label">{name}</label>
            <div className="w-flex-g1">
                <span>{value}</span>
            </div>
        </div>
    );
}

function ShopProductsTable() {
    // TODO: get products from server
    const productsPage = 0;
    const [products, setProducts] = useState<ProductDataType[]>([]);
    const productSetIndexChange = (newPage: number) => {
        // TODO: get new products from server
        setProducts([]);
    };

    return (
        <React.Fragment>
            <div className="eletable">
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <td style={{ width: "50%" }}>商品名稱</td>
                            <td style={{ width: "25%" }}>價錢</td>
                            <td style={{ width: "25%" }}>庫存</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PageChooser maxPage={productsPage} onPageChange={productSetIndexChange} />
        </React.Fragment>
    );
}

function ShopProductsInfo() {
    return (
        <div>
            <div className="shop-info-products-tool-bar">
                <label className="shop-info-label">上架商品</label>
                <div className="w-flex-g1"></div>
                <select>
                    <option value="all">全部</option>
                </select>
                <div style={{ width: "15rem", marginLeft: "1rem" }}>
                    <SearchBox hasBorder={true} />
                </div>
            </div>
            <ShopProductsTable />
        </div>
    );
}

function ShopStaffsTable() {
    // TODO: get staffs from server
    const staffsPage = 0;
    const [staffs, setStaffs] = useState<StaffDataType[]>([]);
    const staffSetIndexChange = (newPage: number) => {
        // TODO: get new staffs from server
        setStaffs([]);
    };    

    return (
        <React.Fragment>
            <div className="eletable">
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <td style={{ width: "50%" }}>帳戶名稱</td>
                            <td style={{ width: "25%" }}>姓名</td>
                            <td style={{ width: "25%" }}>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map(staff => (
                            <tr>
                                <td>{staff.staffAccount}</td>
                                <td>{staff.staffName}</td>
                                <td>{staff.staffEmail}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PageChooser maxPage={staffsPage} onPageChange={staffSetIndexChange} />
        </React.Fragment>
    );
}

function ShopStaffsInfo() {
    return (
        <div>
            <div className="shop-info-staffs-tool-bar">
                <label className="shop-info-label">上架商品</label>
                <div className="w-flex-g1"></div>
                <div style={{ width: "15rem", marginLeft: "1rem" }}>
                    <SearchBox hasBorder={true} />
                </div>
            </div>
            <ShopStaffsTable />
        </div>
    );
}

function ShopInfos() {
    return (
        <div className="shop-infos">
            <div className="shop-infos-top">
                <div className="shop-infos-top-left">
                    <ShopLineInfo name="商店名稱" value="餅乾故事館" />
                    <ShopDescriptionInfo name="商店敘述" value="我有餅乾，你有故事嗎？" />
                </div>
                <div className="shop-infos-top-right">
                    <label className="shop-info-label">商店圖片</label>
                    <div className="shop-info-image">
                        <img src="https://i.imgur.com/0VX0G7X.png" alt="shop" />
                    </div>
                </div>
            </div>
            <ShopLineInfo name="地址" value="西南" />
            <ShopLineInfo name="Email" value="wooooooooooooooooooo@gmail.com" />
            <ShopLineInfo name="連絡電話" value="(03) 5874-1256" />
            <ShopLineInfo name="建立時間" value="2023/10/21 05:45" />
            <ShopProductsInfo />
            <ShopStaffsInfo />
        </div>
    );
}

export default function ShopManagementInfo() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopInfoToolBar />
            <ShopInfos />
        </div>
    );
}