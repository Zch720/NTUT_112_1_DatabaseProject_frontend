import { useState } from "react";
import "./CheckoutPage.css";
import { Collapse } from "react-collapse";
import { IconContext } from "react-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ProductsPageToolbar } from "../product/ProductsPage";

type CouponType = {
    id: number;
    name: string;
    description: string;
    discount: number;
    startTime: string;
    endTime: string;
}

type CheckoutProductType = {
    productId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

type CheckoutShopType = {
    shopId: number;
    shopName: string;
    products: CheckoutProductType[];
    shippingFee: number;
    shippingCoupon: CouponType | null;
    seasoningCoupon: CouponType | null;
    totalCostWithDiscount: number;
}

type CheckoutInfoType = {
    shops: CheckoutShopType[];
    productTotalCost: number;
    shippingFee: number;
}

LabelValuePair.defaultProps = {
    fontSize: "1.2rem",
    labelColor: "black",
    labelFontWeight: "normal",
    valueColor: "black",
    valueFontWeight: "normal"
}
function LabelValuePair(props: {
    label: string,
    value: string,
    fontSize: string,
    labelColor: string,
    labelFontWeight: string,
    valueColor: string,
    valueFontWeight: string
}) {
    const { label, value, fontSize, labelColor, labelFontWeight, valueColor, valueFontWeight } = props;

    return (
        <div className="label-value-pair" style={{ fontSize: fontSize }}>
            <div style={{ color: labelColor, fontWeight: labelFontWeight }}>{label}</div>
            <div style={{ color: valueColor, fontWeight: valueFontWeight }}>{value}</div>
        </div>
    );
}

function LineInfo(props: {
    label: string,
    value: string,
    valueSetter: (value: string) => void
}) {
    const { label, value, valueSetter } = props;

    return (
        <div className="line-info">
            <div className="line-info-label">{label}</div>
            <input className="line-info-value" value={value} onChange={(e) => valueSetter(e.target.value)}></input>
        </div>
    );
}

function CheckoutPageHeader() {
    return (
        <div className="checkout-page-header">
            <AiOutlineShoppingCart />
            結帳
        </div>
    );
}

function CheckoutInfoProduct(props: {
    product: CheckoutProductType
}) {
    const { product } = props;

    return (
        <div className="checkout-page-product">
            <label>
                <img className="checkout-page-product-image" src={product.image}></img>
            </label>
            <div className="checkout-page-porduct-infos w-flex-g1">
                <div className="checkout-page-product-info">
                    <div className="checkout-page-product-quantity">
                        {product.name}
                        數量：{product.quantity}
                    </div>
                </div>
                <div className="w-flex-g1"></div>
                <div className="checkout-page-product-cost">
                    ${product.price * product.quantity}
                </div>
            </div>
        </div>
    );
}

function CheckoutInfoShopCostCalculate(props: {
    seasoningDiscount: number,
    shippingFee: number,
    shippingDiscount: number,
    totalCostWithDiscount: number
}) {
    const { seasoningDiscount, shippingFee, shippingDiscount, totalCostWithDiscount } = props;

    return (
        <div className="coutckout-page-shop-cost-calculate">
            {(seasoningDiscount != 0) ? <LabelValuePair label="商品折扣" value={"-$" + seasoningDiscount} /> : null}
            <LabelValuePair label="運費" value={"$" + shippingFee} />
            {shippingDiscount ? <LabelValuePair label="運費折扣" value={"-$" + shippingDiscount} /> : null}
            <hr />
            <LabelValuePair label="商品金額" value={`\$${totalCostWithDiscount}`} />
        </div>
    );
}

function GetUsingCoupons(props: {
    shippingCoupon: CouponType | null,
    seasoningCoupon: CouponType | null
}) {
    const { shippingCoupon, seasoningCoupon } = props;

    if (shippingCoupon != null && seasoningCoupon != null) {
        return <span style={{ color: "#A4895C" }}>{shippingCoupon.name}、{seasoningCoupon.name}</span>;
    } else if (shippingCoupon != null) {
        return <span style={{ color: "#A4895C" }}>{shippingCoupon.name}</span>;
    } else if (seasoningCoupon != null) {
        return <span style={{ color: "#A4895C" }}>{seasoningCoupon.name}</span>;
    } else {
        return <span>未使用折價券</span>;
    }
}

function Coupon(props: {
    coupon: CouponType
}) {
    const { coupon } = props;

    return (
        <div className={"checkout-page-coupon-using"}>
            <div className="checkout-page-coupon-name">{coupon.name}</div>
            <div className="checkout-page-coupon-description">{coupon.description}</div>
            <div className="checkout-page-coupon-time">{coupon.startTime} ~ {coupon.endTime}</div>
        </div>
    );
}

function DiscountCoupons(props: {
    seasoningCoupon: CouponType | null,
    shippingCoupon: CouponType | null
}) {
    const { seasoningCoupon, shippingCoupon } = props;
    const usingCoupons = (seasoningCoupon != null) || (shippingCoupon != null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="checkout-page-shop-discount-coupons">
            <div className="checkout-page-shop-discount-coupons-header">
                <IconContext.Provider value={{ color: "#A4895C", style: { width: "1rem", height: "1rem" } }}>
                    <button className="hide-btn" onClick={() => setIsOpen(!isOpen)} disabled={!usingCoupons}>
                        {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    </button>
                    <GetUsingCoupons shippingCoupon={shippingCoupon} seasoningCoupon={seasoningCoupon} />
                </IconContext.Provider>
            </div>
            <Collapse isOpened={isOpen}>
                <div className="checkout-page-coupon-list">
                    {shippingCoupon ? <Coupon coupon={shippingCoupon} /> : null}
                    {seasoningCoupon ? <Coupon coupon={seasoningCoupon} /> : null}
                </div>
            </Collapse>
        </div>
    );
}

function CheckoutInfoShop(props: {
    parentKey: string,
    shop: CheckoutShopType
}) {
    const { parentKey, shop } = props;
    const shippingDiscount = shop.shippingCoupon ? shop.shippingCoupon.discount : 0;
    const seasoningDiscount = shop.seasoningCoupon ? shop.seasoningCoupon.discount : 0;
    const shippingFee = shop.shippingFee;
    const totalCostWithDiscount = shop.totalCostWithDiscount;

    return (
        <div className="checkout-page-shop">
            <div className="checkout-page-shop-header">
                <label>
                    <img src="/logo.PNG"></img>
                    {shop.shopName}
                </label>
            </div>
            <hr />
            {shop.products.map((product) => {
                const key = parentKey + "-product-" + product.productId;
                return <CheckoutInfoProduct key={key} product={product}/>;
            })}
            <hr />
            <CheckoutInfoShopCostCalculate
                seasoningDiscount={seasoningDiscount}
                shippingFee={shippingFee}
                shippingDiscount={shippingDiscount}
                totalCostWithDiscount={totalCostWithDiscount} />
            <DiscountCoupons shippingCoupon={shop.shippingCoupon} seasoningCoupon={shop.seasoningCoupon}/>
        </div>
    );
}

function CheckoutProducts(props: {
    shops: CheckoutShopType[]
}) {
    const { shops } = props;

    return (
        <div className="checkout-page-products">
            <div className="checkout-page-products-header">
                <label>訂單資訊</label>
            </div>
            <div className="checkout-page-shops-container">
                {shops.map((shop) => {
                    const key = "shop-" + shop.shopId;
                    return <CheckoutInfoShop key={key} parentKey={key} shop={shop} />
                })}
            </div>
        </div>
    );
}

function OrderInfos(props: {
    productTotalCost: number,
    shippingFee: number,
}) {
    const { productTotalCost, shippingFee } = props;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [other, setOther] = useState("");

    return (
        <div className="checkout-page-order-infos">
            <label>&ensp;</label>
            <div className="checkout-page-order-infos-container">
                <LabelValuePair label="付款方式" value="貨到付款" />
                <LabelValuePair label="運送方式" value="宅配" />
                <hr />
                <span style={{ color: "#4D4D4D" }}>收件資訊</span>
                <LineInfo label="姓名" value={name} valueSetter={setName} />
                <LineInfo label="手機" value={phone} valueSetter={setPhone} />
                <LineInfo label="地址" value={address} valueSetter={setAddress} />
                <LineInfo label="備註" value={other} valueSetter={setOther} />
                <hr />
                <span style={{ color: "#4D4D4D" }}>付款資訊</span>
                <LabelValuePair label="商品總金額" value={"$" + productTotalCost} />
                <LabelValuePair label="運費總金額" value={"$" + shippingFee} />
                <LabelValuePair label="總金額" value={"$" + (productTotalCost + shippingFee)} fontSize="1.5rem" valueColor="#BD8248" valueFontWeight="bold" />
            </div>
            <div className="checkout-page-control-buttons">
                <button className="checkout-page-pre-step-btn">上一步</button>
                <button className="checkout-page-checkout-btn">結帳</button>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    // TODO: get checkout info from cookie
    const checkoutInfo: CheckoutInfoType = getFakeCheckoutInfo();
    
    return (
        <div className="checkout-page-container">
            <CheckoutPageHeader />
            <div className="checkout-page-infos">
                <CheckoutProducts shops={checkoutInfo.shops}/>
                <OrderInfos productTotalCost={checkoutInfo.productTotalCost} shippingFee={checkoutInfo.shippingFee}/>
            </div>
        </div>
    );
}

function getFakeCheckoutInfo(): CheckoutInfoType {
    return {
        productTotalCost: 1200,
        shippingFee: 0,
        shops: [
            {
                shopId: 1,
                shopName: "麵包店",
                products: [
                    {
                        productId: 1,
                        name: "奶油夾心餅乾（10 入）",
                        image: "/logo.PNG",
                        price: 150,
                        quantity: 2
                    },
                    {
                        productId: 2,
                        name: "黑巧夾心餅乾（10 入）",
                        image: "/logo.PNG",
                        price: 200,
                        quantity: 2
                    }
                ],
                shippingFee: 60,
                shippingCoupon: {
                    id: 1,
                    name: "免運費",
                    description: "滿 300 元免運費",
                    discount: 60,
                    startTime: "2021/01/01",
                    endTime: "2021/12/31"
                },
                seasoningCoupon: {
                    id: 2,
                    name: "滿 500 折 100",
                    description: "滿 500 折 100",
                    discount: 100,
                    startTime: "2021/01/01",
                    endTime: "2021/12/31"
                },
                totalCostWithDiscount: 600
            },
            {
                shopId: 2,
                shopName: "麵包店",
                products: [
                    {
                        productId: 3,
                        name: "奶油夾心餅乾（10 入）",
                        image: "/logo.PNG",
                        price: 150,
                        quantity: 2
                    },
                    {
                        productId: 4,
                        name: "黑巧夾心餅乾（10 入）",
                        image: "/logo.PNG",
                        price: 200,
                        quantity: 2
                    }
                ],
                shippingFee: 60,
                shippingCoupon: {
                    id: 1,
                    name: "免運費",
                    description: "滿 300 元免運費",
                    discount: 60,
                    startTime: "2021/01/01",
                    endTime: "2021/12/31"
                },
                seasoningCoupon: null,
                totalCostWithDiscount: 600
            }
        ]
    };
}