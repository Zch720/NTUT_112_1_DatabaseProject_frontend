import { useEffect, useState } from "react";
import "./StaffOrderProfile.css";
import "../AccountProfile.css";
import { Collapse } from "react-collapse";

type OrderReciverInfoType = {
    name: string;
    phone: string;
    address: string;
};

type OrderProductType = {
    image: string;
    name: string;
    amount: number;
    price: number;
};

type OrderCostType = {
    productCost: number;
    productDiscount: number;
    shippingCost: number;
    shippingDiscount: number;
    totalCost: number;
};


type OrderInfoType = {
    id: string;
    state: string;
    reciverInfo: OrderReciverInfoType;
    shopIcon: string;
    shopName: string;
    products: OrderProductType[];
    cost: OrderCostType;
    paymentMethod: string;
    orderDate: string;
    shippingDate: string;
};

function AccountPageTitle() {
    return(
        <h3 className="account-page-title">{"帳戶 > 訂單紀錄 > 訂單詳細資訊"}</h3>
    );
}

function getOrderStateLabelState(choosed: boolean) {
    if (choosed)
        return "staff-order-state-label-choosed";
    return "staff-order-state-label";
}

function OrderState(props: { state: string, currentState: string, setCurrentState: (state: string) => void }) {
    const { state, currentState, setCurrentState } = props;
    const [choosed, setChoosed] = useState<boolean>(false);
    useEffect(() => {
        setChoosed(currentState == state);
    }, [currentState]);
    const stateLabelOnClick = () => {
        setCurrentState(state);
        // TODO: update to server
    };

    return (
        <div>
            <button
                className={getOrderStateLabelState(choosed)}
                onClick={stateLabelOnClick}
            >{state}</button>
        </div>
    );
}

function OrderStateList(props: { state: string, setState: (state: string) => void }) {
    const { state, setState } = props;
    return (
        <div className="staff-order-state-list">
            <OrderState state="訂單未成立" currentState={state} setCurrentState={setState}></OrderState>
            <OrderState state="訂單已成立" currentState={state} setCurrentState={setState}></OrderState>
            <OrderState state="未出貨" currentState={state} setCurrentState={setState}></OrderState>
            <OrderState state="已出貨" currentState={state} setCurrentState={setState}></OrderState>
            <OrderState state="買家已取貨" currentState={state} setCurrentState={setState}></OrderState>
            <OrderState state="訂單已完成" currentState={state} setCurrentState={setState}></OrderState>
        </div>
    );
}

function OrderStateSetter(props: { state: string }) {
    const [stateEditing, setStateEditing] = useState<boolean>(false);
    const [state, setState] = useState(props.state);

    return (
        <div className="account-profile-info">
            訂單狀態：{state}
            <input type="checkbox" id="staff-order-state" onClick={() => setStateEditing(!stateEditing)} />
            <label htmlFor="staff-order-state"></label>
            <Collapse isOpened={stateEditing}>
                <OrderStateList state={state} setState={setState}/>
            </Collapse>
        </div>    
    );
}

function OrderInfoHeader(props: { id: string, state: string }) {
    const { id, state } = props;
    
    return (
        <div className="staff-order-infos-header">
            <span>{id}</span>
            {/* <span className="staff-order-infos-state">{state}</span> */}
            <div style={{ height: "0.5rem" }}></div>
            <OrderStateSetter state={state} />
        </div>
    );
}

function OrderReciverInfo(props: { reciverInfo: OrderReciverInfoType }) {
    const { reciverInfo } = props;
    
    return (
        <div className="staff-order-info-container">
            <label className="staff-order-label">收件資訊</label>
            <div className="staff-order-info-box staff-order-recive-infos">
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
        <div className="staff-order-shop-info">
            <img className="staff-order-shop-image" src={shopIcon} />
            {shopName}
        </div>
    );
}

function OrderProductRow(props: { product: OrderProductType }) {
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
                x{product.amount}
            </td>
            <td style={{width: "10%", textAlign: "right" }}>
                ${product.price}
            </td>
        </tr>
    );
}

function OrderContentProductTable(props: { products: OrderProductType[] }) {
    const { products } = props;

    return (
        <table className="staff-order-product-table">
            <tbody>
                {products.map((product, index) => (
                    <OrderProductRow key={"order-product-table-" + index} product={product} />
                ))}
            </tbody>
        </table>
    );
}

function OrderCalculateRow(props: { label: string, value: string }) {
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

function OrderContentCalculateTable(props: { cost: OrderCostType }) {
    const { cost } = props;

    return (
        <table className="staff-order-calculate-table">
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

function OrderContent(props: { shopIcon: string, shopName: string, products: OrderProductType[], cost: OrderCostType }) {
    const { shopIcon, shopName, products, cost } = props;

    return (
        <div className="staff-order-info-container">
            <label className="staff-order-label">訂單內容</label>
            <div className="staff-order-info-box">
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
        <div className="staff-order-other-info">
            <label className="staff-order-label">{label}</label>
            {value}
        </div>
    );
}

function OrderOtherInfos(props: { paymentMethod: string, orderDate: string, shippingDate: string }) {
    const { paymentMethod, orderDate, shippingDate } = props;

    return (
        <div className="staff-order-info-container">
            <OrderOtherInfo label="付款方式" value={paymentMethod} />
            <OrderOtherInfo label="下單日期" value={orderDate} />
            <OrderOtherInfo label="出貨日期" value={shippingDate} />
        </div>
    );
}

function OrderInfos() {
    // TODO: get order info from server
    const order: OrderInfoType = getFakeOrderInfo();

    return (
        <div className="staff-order-infos">
            <OrderInfoHeader id={order.id} state={order.state} />
            <OrderReciverInfo reciverInfo={order.reciverInfo} />
            <OrderContent shopIcon={order.shopIcon} shopName={order.shopName} products={order.products} cost={order.cost} />
            <OrderOtherInfos paymentMethod={order.paymentMethod} orderDate={order.orderDate} shippingDate={order.shippingDate} />
        </div>
    );
}


export default function StaffOrderProfile() {
    return (
        <div className="account-page-content">
            <AccountPageTitle />
            <OrderInfos />
        </div>
    );
}

function getFakeOrderInfo(): OrderInfoType {
    return {
        id: "I5487878787",
        state: "未出貨",
        reciverInfo: {
            name: "幽靈人",
            phone: "091232123123",
            address: "台北市中正區忠孝東路一段100號5樓"
        },
        shopIcon: "/logo.PNG",
        shopName: "巧克力巨獸",
        products: [
            {
                image: "https://i.imgur.com/HgELSyF.png",
                name: "經典巧克力脆片餅乾 - 5 片裝",
                amount: 1,
                price: 80
            },
            {
                image: "https://i.imgur.com/4pPAVIJ.png",
                name: "黑巧夾心餅乾 - 10 片裝",
                amount: 1,
                price: 200
            }
        ],
        cost: {
            productCost: 280,
            productDiscount: 30,
            shippingCost: 60,
            shippingDiscount: 60,
            totalCost: 250
        },
        paymentMethod: "貨到付款",
        orderDate: "2023/10/22",
        shippingDate: "未出貨"
    };
}