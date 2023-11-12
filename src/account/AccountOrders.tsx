import { useState } from "react";
import "./AccountOrders.css";
import "../SearchBox.css";
import SearchBox from "../SearchBox";
import PageChooser from "../PageChooser";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 訂單紀錄</h3>
    );
}

function OrderTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "15vw"}}>訂單編號</td>
            <td style={{width: "12vw"}}>日期</td>
            <td style={{width: "30vw"}}>商品內容</td>
            <td style={{width: "15vw"}}>訂單金額</td>
        </tr>
    );
}

function OrderRow({ order } : { order: OrderType }) {
    return (
        <tr key={order.id}>
            <td style={{textAlign: "center"}}>{order.id}</td>
            <td style={{textAlign: "center"}}>{order.date}</td>
            <td style={{paddingLeft: "3rem", paddingRight: "3rem"}}>{order.content}</td>
            <td style={{textAlign: "center"}}>{order.cost}</td>
        </tr>
    );
}

function OrdersTable({ orders }: { orders: OrderType[] }) {
    return (
        <table style={{margin: "0 2rem"}}>
            <thead>
                <OrderTableHeaderRow />
            </thead>
            <tbody>
                {orders.map((order) => <OrderRow order={order} />)}
            </tbody>
        </table>
    );
}

export type OrderType = {
    id: string;
    date: string;
    content: string;
    cost: number;
};

export default function AccountOrders() {
    // TODO: set orders
    const [orders, setOrders] = useState<OrderType[]>([]);
    const getOrdersOfPage = (page: number) => {
        setOrders([]);
    };

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="search-box-container"><SearchBox hasBorder={true} /></div>
            <OrdersTable orders={orders} />
            {/* TODO: add max page number */}
            <div className="page-chooser-box">
                <PageChooser maxPage={0} onPageChange={getOrdersOfPage} />
            </div>
        </div>
    );
}