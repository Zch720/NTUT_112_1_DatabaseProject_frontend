import { useEffect, useState } from "react";
import "./AccountOrders.css";
import "../../utils/SearchBox.css";
import SearchBox from "../../utils/SearchBox";
import PageChooser from "../../utils/PageChooser";
import GetAccountOrdersListController from "../../controller/GetAccountOrdersListController";
import GetAccountOrdersListCountController from "../../controller/GetAccountOrdersListCountController";
import { OrderListData } from "../../mapper/OrderMapper";
import { useCookies } from "react-cookie";

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

function OrderRow({ order } : { order: OrderListData }) {
    return (
        <tr key={order.id}>
            <td><a href={`/user/order?orderId=${order.id}`}>{order.id}</a></td>
            <td>{order.date}</td>
            <td>{order.content}</td>
            <td>{order.price}</td>
        </tr>
    );
}

function OrdersTable({ orders }: { orders: OrderListData[] }) {
    return (
        <div className="eletable">
            <table>
                <thead>
                    <OrderTableHeaderRow />
                </thead>
                <tbody>
                    {orders.map((order) => <OrderRow order={order} />)}
                </tbody>
            </table>
        </div>
    );
}

function OrdersList() {
    const [ordersCount, setOrdersCount] = useState<number>(0);
    const [orders, setOrders] = useState<OrderListData[]>([]);
    const [cookies] = useCookies(["accountId"]);
    const prePage = 20;
    const setOrdersOfPage = async (page: number) => {
        await GetOrders(cookies.accountId, page, prePage, ordersCount, setOrders);
    };
    useEffect(() => {
        GetOrdersCount(cookies.accountId, setOrdersCount);
    }, []);
    useEffect(() => {
        GetOrders(cookies.accountId, 1, prePage, ordersCount, setOrders);
    }, [ordersCount]);

    return (
        <div className="order-list-container">
            <OrdersTable orders={orders} />
            <div className="page-chooser-box">
                <PageChooser maxPage={Math.ceil(ordersCount / prePage)} onPageChange={setOrdersOfPage} />
            </div>
        </div>
    );
}

export default function AccountOrders() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <div className="default-search-box-container"><SearchBox hasBorder={true} /></div>
            <OrdersList />
        </div>
    );
}

async function GetOrders(
    userId: string,
    index: number,
    prePage: number,
    ordersCount: number,
    setOrders: (orders: OrderListData[]) => void
) {
    if (index <= 0 || index >= Math.ceil(ordersCount / prePage)) {
        return;
    }
    const start = (index - 1) * prePage;
    const end = Math.min(index * prePage, ordersCount - 1);
    setOrders(await GetAccountOrdersListController(userId, start, end));
}

async function GetOrdersCount(
    userId: string,
    setOrdersCount: (count: number) => void
) {
    const count = await GetAccountOrdersListCountController(userId);
    setOrdersCount(count);
}