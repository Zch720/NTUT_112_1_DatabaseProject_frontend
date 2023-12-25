import React, { useState } from "react";
import "./AccountInfo.css";
import PageChooser from "../../utils/PageChooser";
import { collapseClasses } from "@mui/material";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 一般帳戶管理 {">"} 帳戶詳細資訊</h3>
    );
}

function AccountInfoToolBar() {
    return (
        <div className="account-info-tool-bar">
            <button>刪除此帳戶</button>
        </div>
    );
}

function AccountInfo({ name, value }: { name: string, value: string  }) {
    return (
        <div className="account-info">
            <label>{name}</label>
            <div>
                <span>{value}</span>
            </div>
        </div>
    );
}

type OrderDataType = {
    orderId: string,
    orderTime: string,
    orderProducts: string,
    orderTotalPrice: number
};

function AccountOrderTableRow(props: { order: OrderDataType }) {
    return (
        <tr>
            <td>{props.order.orderId}</td>
            <td>{props.order.orderTime}</td>
            <td>{props.order.orderProducts}</td>
            <td>{props.order.orderTotalPrice}</td>
        </tr>    
    );
}

function AccountOrdersInfo() {
    // TODO: get orders from server
    const ordersPages = 0;
    const [orders, setOrders] = useState<OrderDataType[]>([]);
    const orderSetIndexChange = (newPage: number) => {
        // TODO: get new orders from server
        setOrders([]);
    };

    return (
        <div className="account-orders-info">
            <label>訂單紀錄</label>
            <div className="eletable">
                <table>
                    <thead>
                        <tr>
                            <td style={{ width: "17%" }}>訂單編號</td>
                            <td style={{ width: "17%" }}>日期</td>
                            <td style={{ width: "51%" }}>商品內容</td>
                            <td style={{ width: "15%" }}>訂單金額</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>
                            <AccountOrderTableRow order={order} />
                        )}
                    </tbody>
                </table>
            </div>
            <PageChooser maxPage={ordersPages} onPageChange={orderSetIndexChange} />
        </div>
    );
}

function AccountInfos() {
    return (
        <React.Fragment>
            <div className="account-infos">
                <AccountInfo name="帳戶名稱" value="gost87" />
                <AccountInfo name="姓名" value="幽靈人" />
                <AccountInfo name="地址" value="忠孝北路" />
                <AccountInfo name="Email" value="woooooooooooooooo@gmail.com" />
                <AccountInfo name="建立時間" value="2023/10/21 20:08" />
                <AccountOrdersInfo />
            </div>
        </React.Fragment>
    );
}

export default function AccountManagementInfo() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <AccountInfoToolBar />
            <AccountInfos />
        </div>
    );
}