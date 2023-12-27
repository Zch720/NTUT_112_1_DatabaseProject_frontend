import { useState, useEffect } from "react";
import PageChooser from "../../utils/PageChooser";
import SearchBox from "../../utils/SearchBox";
import "./ShopOrders.css";

type OrderType = {
    id: string;
    date: string;
    products: string[];
    price: number;

};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">{"帳戶 > 訂單管理"}</h3>
    );
}

function OrdersListToolBar() {
    return (
        <div className="shop-orders-toolbar">
            <div>
                <SearchBox hasBorder={true} />
            </div>
        </div>
    );
}

function OrdersTableHeaderRow() {
    return (
        <tr>
            <td style={{ width: "16%" }}>
                訂單編號
            </td>
            <td style={{ width: "16%" }}>
                日期
            </td>
            <td>
                訂單內容
            </td>
            <td style={{ width: "15%" }}>
                訂單狀態
            </td>
        </tr>
    );
}

function OrdersTableRow(props: { order: OrderType }) {
    const { order } = props;

    return (
        <tr>
            <td>
                {order.id}
            </td>
            <td>
                {order.date}
            </td>
            <td>
                <span style={{ whiteSpace: "pre-wrap" }}>
                    {order.products.join("\n")}
                </span>
            </td>
            <td>
                ${order.price}
            </td>
        </tr>    
    );
}

function OrdersTable(props: { orders: OrderType[] }) {
    const [orders, setOrders] = useState<OrderType[]>(props.orders);
    useEffect(() => {
        setOrders(props.orders);
    }, [props.orders]);

    return (
        <div className="eletable">
            <table className="w-100-per">
                <thead>
                    <OrdersTableHeaderRow />
                </thead>
                <tbody>
                    {orders.map((order, index) =>
                        <OrdersTableRow key={"shop-orders-table-row-" + index} order={order} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

function ShopOrdersList() {
    // TODO: get orders from server
    const ordersPage = 0;
    const [orders, setOrders] = useState<OrderType[]>(getFakeOrders());
    const orderSetIndexChange = (index: number) => {
        // TODO: get orders from server
        setOrders(getFakeOrders());
    };

    return (
        <div className="shop-orders-list">
            <div style={{ height: "1rem" }}></div>
            <OrdersListToolBar />
            <OrdersTable orders={orders} />
            <PageChooser maxPage={ordersPage} onPageChange={orderSetIndexChange}/>
        </div>
    );
}

export default function ShopOrders() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <ShopOrdersList />
        </div>
    );
}

function getFakeOrders(): OrderType[] {
    return [
        {
            id: "I5487878787",
            date: "2023/10/22",
            products: ["旋風飛天餅乾", "旋風遁地餅乾", "宇宙好吃到爆炸巧克力豆軟餅乾"],
            price: 520
        },
        {
            id: "I5487878786",
            date: "2023/10/22",
            products: ["旋風飛天餅乾", "旋風遁地餅乾", "宇宙好吃到爆炸巧克力豆軟餅乾"],
            price: 520
        }

    ];
}