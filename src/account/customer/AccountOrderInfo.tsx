import { useEffect, useState } from "react";
import GetAccountOrderController from "../../controller/GetAccountOrderController";
import { OrderCostInfoType, OrderInfoType, OrderProductInfoType, OrderReciverInfoType } from "../../mapper/OrderMapper";
import "./AccountOrderInfo.css";

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">{"帳戶 > 訂單紀錄 > 訂單詳細資訊"}</h3>
    );
}

function OrderInfoHeader(props: {
    id: string,
    state: string
}) {
    const { id, state } = props;
    
    return (
        <div className="account-order-infos-header">
            <span>{id}</span>
            <span className="account-order-infos-state">{state}</span>
        </div>
    );
}

function OrderReciverInfo(props: {
    reciverInfo: OrderReciverInfoType
}) {
    const { reciverInfo } = props;
    
    return (
        <div className="account-order-info-container">
            <label className="account-order-label">收件資訊</label>
            <div className="account-order-info-box account-order-recive-infos">
                {"姓　　名：" + reciverInfo.name}<br/>
                {"手機號碼：" + reciverInfo.phone}<br/>
                {"地　　址：" + reciverInfo.address}<br/>
            </div>
        </div>
    );
}

function OrderContentHeader(props: { shopIcon: string, shopName: string }) {
    const { shopIcon, shopName } = props;

    return (
        <div className="account-order-shop-info">
            <img className="account-order-shop-image" src={shopIcon} />
            {shopName}
        </div>
    );
}

function OrderProductRow(props: {
    product: OrderProductInfoType
}) {
    const { product } = props;

    return (
        <tr>
            <td style={{ width: "10%" }}>
                <img src={product.image} style={{
                    width: "100%",
                    aspectRatio: "1/1"
                }} />
            </td>
            <td>
                {product.name}
            </td>
            <td style={{width: "5%", textAlign: "right" }}>
                x{product.quantity}
            </td>
            <td style={{width: "10%", textAlign: "right" }}>
                ${product.price}
            </td>
        </tr>
    );
}

function OrderContentProductTable(props: {
    products: OrderProductInfoType[]
}) {
    const { products } = props;

    return (
        <table className="account-order-product-table">
            <tbody>
                {products.map((product, index) => (
                    <OrderProductRow key={"order-product-table-" + index} product={product} />
                ))}
            </tbody>
        </table>
    );
}

function OrderCalculateRow(props: {
    label: string,
    value: string
}) {
    return (
        <tr>
            <td>
                {props.label}
            </td>
            <td style={{ width: "15%", textAlign: "right" }}>
                {props.value}
            </td>
        </tr>
    );
}

function OrderContentCalculateTable(props: {
    cost: OrderCostInfoType
}) {
    const { cost } = props;

    return (
        <table className="account-order-calculate-table">
            <tbody>
                <OrderCalculateRow label="商品小計" value={"$" + cost.productCost} />
                {cost.productDiscount != 0 ?
                    <OrderCalculateRow label="商品折扣" value={"-$" + cost.productDiscount} /> : null
                }
                <OrderCalculateRow label="運費" value={"$" + cost.shippingCost} />
                {cost.shippingDiscount != 0 ?
                    <OrderCalculateRow label="運費折扣" value={"-$" + cost.shippingDiscount} /> : null
                }
                <OrderCalculateRow label="總金額" value={"$" + cost.totalCost} />
            </tbody>
        </table>
    );
}

function OrderContent(props: {
    shopIcon: string,
    shopName: string,
    products: OrderProductInfoType[],
    cost: OrderCostInfoType
}) {
    const { shopIcon, shopName, products, cost } = props;

    return (
        <div className="account-order-info-container">
            <label className="account-order-label">訂單內容</label>
            <div className="account-order-info-box">
                <OrderContentHeader shopIcon={shopIcon} shopName={shopName} />
                <OrderContentProductTable products={products} />
                <OrderContentCalculateTable cost={cost} />
            </div>
        </div>
    );
}

function OrderOtherInfo(props: { label: string, value: string }) {
    const { label, value } = props;

    return (
        <div className="account-order-other-info">
            <label className="account-order-label">{label}</label>
            {value}
        </div>
    );
}

function OrderOtherInfos(props: { paymentMethod: string, orderDate: string, shippingDate: string }) {
    const { paymentMethod, orderDate, shippingDate } = props;

    return (
        <div className="account-order-info-container">
            <OrderOtherInfo label="付款方式" value={paymentMethod} />
            <OrderOtherInfo label="下單日期" value={orderDate} />
            <OrderOtherInfo label="出貨日期" value={shippingDate} />
        </div>
    );
}

function OrderInfos() {
    const [order, setOrder] = useState<OrderInfoType | null>(null);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("orderId");
        if (orderId != null)
            GetOrder(orderId, setOrder);
    }, []);

    return (
        order ?
            <div className="account-order-infos">
                <OrderInfoHeader id={order.id} state={order.status} />
                <OrderReciverInfo reciverInfo={order.reciverInfo} />
                <OrderContent shopIcon={order.shopIcon} shopName={order.shopName} products={order.products} cost={order.cost} />
                <OrderOtherInfos paymentMethod={order.paymentMethod} orderDate={order.orderDate} shippingDate={order.shippingDate} />
            </div>
        : null
    );
}

export default function AccountOrderInfo() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <OrderInfos />
        </div>
    );
}

async function GetOrder(
    orderId: string,
    setOrder: (order: OrderInfoType | null) => void
) {
    setOrder(await GetAccountOrderController(orderId));
}
