import React, { useState } from "react"
import "../Account.css"
import "./ShopManage.css"
import Search from "../../utils/SearchBox"
import PageChooser from "../../utils/PageChooser"

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 商店管理</h3>
    );
}

type ShopDataType = {
    shopName: string,
    address: string,
    email: string

}

function ShopTableRow({ shop }: {shop: ShopDataType}) {
    return (
        <tr>
            <td>{shop.shopName}</td>
            <td>{shop.address}</td>
            <td>{shop.email}</td>
        </tr>
    
    );
}

function ShopTable({ shops }: { shops: ShopDataType[] }) {
    return (
        <div className="eletable w-fit">
            <table>
                <thead>
                    <tr>
                        <td style={{ width: "17vw" }}>商店名稱</td>
                        <td style={{ width: "30vw" }}>地址</td>
                        <td style={{ width: "25vw" }}>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {shops.map(shop =>
                        <ShopTableRow shop={shop} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

function ShopList() {
    // TODO: get shops from server
    const shopPage = 0;
    const [shops, setShops] = useState<ShopDataType[]>([]);
    const shopSetIndexChange = (newPage: number) => {
        // TODO: get shops from server
        setShops([]);
    };

    return (
        <div className="w-fit">
            <div className="shop-manage-search-container">
                <div className="default-search-box-container ">
                    <Search hasBorder={true}/>
                </div>
            </div>
            <ShopTable shops={shops}/>
            <PageChooser maxPage={0} onPageChange={shopSetIndexChange} />
        </div>
    );
}

export default function ShopManage() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopList/>
        </div>
    );
}