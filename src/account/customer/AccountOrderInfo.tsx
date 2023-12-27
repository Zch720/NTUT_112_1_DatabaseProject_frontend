import "./AccountOrderInfo.css";

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

function OrderInfoHeader(props: { id: string, state: string }) {
    const { id, state } = props;
    
    return (
        <div className="account-order-infos-header">
            <span>{id}</span>
            <span className="account-order-infos-state">{state}</span>
        </div>
    );
}

function OrderReciverInfo(props: { reciverInfo: OrderReciverInfoType }) {
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
        <table className="account-order-product-table">
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

function OrderContent(props: { shopIcon: string, shopName: string, products: OrderProductType[], cost: OrderCostType }) {
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
    // TODO: get order info from server
    const order: OrderInfoType = getFakeOrderInfo();

    return (
        <div className="account-order-infos">
            <OrderInfoHeader id={order.id} state={order.state} />
            <OrderReciverInfo reciverInfo={order.reciverInfo} />
            <OrderContent shopIcon={order.shopIcon} shopName={order.shopName} products={order.products} cost={order.cost} />
            <OrderOtherInfos paymentMethod={order.paymentMethod} orderDate={order.orderDate} shippingDate={order.shippingDate} />
        </div>
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