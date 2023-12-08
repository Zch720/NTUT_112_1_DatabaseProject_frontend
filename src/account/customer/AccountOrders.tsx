import { useState } from "react";
import "./AccountOrders.css";
import "../../utils/SearchBox.css";
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">帳戶 {">"} 訂單紀錄</h3>
    );
}

function OrderTableHeaderRow() {
    return (
        <tr>
            <td style={{width: "16vw"}}>訂單編號</td>
            <td style={{width: "13vw"}}>日期</td>
            <td style={{width: "31vw"}}>商品內容</td>
            <td style={{width: "16vw"}}>訂單金額</td>
        </tr>
    );
}

function OrderRow({ order } : { order: OrderType }) {
    return (
        <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.content}</td>
            <td>{order.cost}</td>
        </tr>
    );
}

function OrdersTable({ orders }: { orders: OrderType[] }) {
    return (
        <table>
            <thead>
                <OrderTableHeaderRow />
            </thead>
            <tbody>
                {orders.map((order) => <OrderRow order={order} />)}
            </tbody>
        </table>
    );
}

function OrdersList(props : { orders: OrderType[], setOrdersOfPage: (page: number) => void }) {
    return (
        <div className="order-list-container">
            <OrdersTable orders={props.orders} />
            {/* TODO: add max page number */}
            <div className="page-chooser-box">
                <PageChooser maxPage={0} onPageChange={props.setOrdersOfPage} />
            </div>
        </div>
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
    const setOrdersOfPage = (page: number) => {
        setOrders([]);
    };

    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="search-box-container"><SearchBox hasBorder={true} /></div>
            <OrdersList orders={orders} setOrdersOfPage={setOrdersOfPage} />
        </div>
    );
}