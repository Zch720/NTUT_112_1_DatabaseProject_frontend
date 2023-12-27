import { useState, useEffect, useRef } from "react";
import "./ShoppingCart.css";
import { Collapse } from "react-collapse";
import { IconContext } from "react-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

type ShippingCouponType = {
    id: number;
    name: string;
    discount: number;
    description: string;
    startTime: string;
    endTime: string;
};

type SeasoningCouponType = {
    id: number;
    name: string;
    discount: number;
    lowerLimit: number;
    description: string;
    startTime: string;
    endTime: string;
};

type ShoppingCartProductType = {
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productImage: string;
    productStock: number;
    isChoosed: boolean;
};

type ShoppingCartShopType = {
    shopId: number;
    shopName: string;
    shippingFee: number;
    usingShippingCoupon: ShippingCouponType | null;
    usingSeasoningCoupon: SeasoningCouponType | null;
    products: ShoppingCartProductType[];
    shippingCoupons: ShippingCouponType[];
    seasoningCoupons: SeasoningCouponType[];
};

type ShoppingCartType = {
    shops: ShoppingCartShopType[];
};

function ShoppingCartHeader(props: { productQuantity: number }) {
    const { productQuantity } = props;

    return (
        <div className="shopping-cart-header">
            <AiOutlineShoppingCart />
            購物車 ({productQuantity})
        </div>
    );
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

function getNumberList(a: number, b: number) {
    let list = [];
    for(let i = a; i <= b; i++) {
        list.push(i);
    }
    return list;
}

function ShoppingCartProduct(props: {
    parentKey: string,
    parentSelectedAll: boolean,
    product: ShoppingCartProductType,
    reviseProducts: (productsRevised: ShoppingCartProductType) => void
}) {
    const { parentKey, parentSelectedAll, product, reviseProducts } = props;
    const [productQuantity, setProductQuantity] = useState(product.productQuantity);
    const checkBoxRef = useRef<HTMLInputElement>(null);
    const quantitySelectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        if (quantitySelectRef.current) {
            quantitySelectRef.current.value = product.productQuantity.toString();
        }
    }, []);
    useEffect(() => {
        if (checkBoxRef.current) {
            checkBoxRef.current.checked = parentSelectedAll;
        }
        let newProduct = { ...product };
        newProduct.isChoosed = parentSelectedAll;
        reviseProducts(newProduct);
    }, [parentSelectedAll]);
    const onCheckBoxChanged = () => {
        let newProduct = { ...product };
        newProduct.isChoosed = checkBoxRef.current!.checked;
        reviseProducts(newProduct);
    }
    const onQuantitySelectChanged = () => {
        let newProduct = { ...product };
        newProduct.productQuantity = parseInt(quantitySelectRef.current!.value);
        setProductQuantity(newProduct.productQuantity);
        reviseProducts(newProduct);
    };
    const onDeleteBtnClicked = () => {
        let newProduct = { ...product };
        newProduct.productQuantity = 0;
        setProductQuantity(newProduct.productQuantity);
        reviseProducts(newProduct);
    }

    return (
        <div className="shopping-cart-product">
            <input type="checkbox" id="shop-product" className="product-checkbox" ref={checkBoxRef} onChange={onCheckBoxChanged}></input>
            <label htmlFor="shop-product">
                <img className="shopping-cart-product-image" src={product.productImage}></img>
            </label>
            <div className="shopping-cart-porduct-infos w-flex-g1">
                <div className="shopping-cart-product-info">
                    <div className="shopping-cart-product-quantity">
                        {product.productName}
                        <select ref={quantitySelectRef} onChange={onQuantitySelectChanged}>
                            {getNumberList(1, product.productStock).map((num) => {
                                const key = parentKey + "-quantity-" + num;
                                return <option key={key} value={num}>{num}</option>
                            })}
                        </select>
                    </div>
                    <div className="shopping-cart-product-delete">
                        <button onClick={onDeleteBtnClicked}></button>
                    </div>
                </div>
                <div className="w-flex-g1"></div>
                <div className="shopping-cart-product-cost">
                    ${product.productPrice * productQuantity}
                </div>
            </div>
        </div>
    );
}

function ShoppingCartShopCostCalculate(props: {
    totalCost: number,
    shippingFee: number,
    shippingCoupons: ShippingCouponType | null,
    seasoningCoupon: SeasoningCouponType | null
}) {
    const { totalCost, shippingFee, shippingCoupons, seasoningCoupon } = props;
    const shippingDiscount = shippingCoupons ? shippingCoupons.discount : 0;
    const seasoningDiscount = seasoningCoupon ? seasoningCoupon.discount : 0;

    return (
        <div className="shopping-cart-shop-cost-calculate">
            {seasoningCoupon ? <LabelValuePair label="商品折扣" value={"-$" + seasoningDiscount} /> : null}
            <LabelValuePair label="運費" value={"$" + shippingFee} />
            {shippingCoupons ? <LabelValuePair label="運費折扣" value={"-$" + shippingDiscount} /> : null}
            <hr />
            <LabelValuePair label="商品金額" value={`\$${totalCost + Math.max(0, shippingFee - shippingDiscount) - seasoningDiscount}`} />
        </div>
    );
}

function GetUsingCoupons(props: { shippingCoupons: ShippingCouponType | null, seasoningCoupons: SeasoningCouponType | null }) {
    const { shippingCoupons, seasoningCoupons } = props;

    if (shippingCoupons === null && seasoningCoupons === null) {
        return <span>使用優惠券</span>
    } else if (shippingCoupons === null) {
        return <span style={{ color: "#A4895C" }}>{seasoningCoupons!.name}</span>
    } else if (seasoningCoupons === null) {
        return <span style={{ color: "#A4895C" }}>{shippingCoupons!.name}</span>
    } else {
        return <span style={{ color: "#A4895C" }}>{shippingCoupons!.name}、{seasoningCoupons!.name}</span>
    }
}

function ShippingCoupon(props: {
    coupon: ShippingCouponType,
    currentCoupon: ShippingCouponType | null,
    onSelectedCouponChange: (coupon: ShippingCouponType | null) => void
}) {
    const { coupon, currentCoupon, onSelectedCouponChange } = props;
    const [isUsing, setIsUsing] = useState(false);
    useEffect(() => {
        setIsUsing(currentCoupon?.id == coupon.id);
    }, [currentCoupon]);
    const itemOnClick = () => {
        if (isUsing)
            onSelectedCouponChange(null);
        else
            onSelectedCouponChange(coupon);
    };

    return (
        <div className={"shopping-cart-coupon" + (isUsing ? "-using" : "")} onClick={itemOnClick}>
            <div className="shopping-cart-coupon-name">{coupon.name}</div>
            <div className="shopping-cart-coupon-description">{coupon.description}</div>
            <div className="shopping-cart-coupon-time">{coupon.startTime} ~ {coupon.endTime}</div>
        </div>
    );
}

function SeasoningCoupon(props: {
    coupon: SeasoningCouponType,
    currentCoupon: SeasoningCouponType | null,
    onSelectedCouponChange: (coupon: SeasoningCouponType | null) => void
}) {
    const { coupon, currentCoupon, onSelectedCouponChange } = props;
    const [isUsing, setIsUsing] = useState(false);
    useEffect(() => {
        setIsUsing(currentCoupon?.id == coupon.id);
    }, [currentCoupon]);
    const itemOnClick = () => {
        if (isUsing)
            onSelectedCouponChange(null);
        else
            onSelectedCouponChange(coupon);
    };

    return (
        <div className={"shopping-cart-coupon" + (isUsing ? "-using" : "")} onClick={itemOnClick}>
            <div className="shopping-cart-coupon-name">{coupon.name}</div>
            <div className="shopping-cart-coupon-description">{coupon.description}</div>
            <div className="shopping-cart-coupon-time">{coupon.startTime} ~ {coupon.endTime}</div>
        </div>
    );
}

function DiscountCoupons(props: {
    parentKey: string,
    shippingCoupons: ShippingCouponType[],
    seasoningCoupons: SeasoningCouponType[],
    currentShippingCoupon: ShippingCouponType | null,
    setShippingCoupon: (coupon: ShippingCouponType | null) => void,
    currentSeasoningCoupon: SeasoningCouponType | null,
    setSeasoningCoupon: (coupon: SeasoningCouponType | null) => void
}) {
    const { shippingCoupons, seasoningCoupons, currentShippingCoupon, setShippingCoupon, currentSeasoningCoupon, setSeasoningCoupon } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="shopping-cart-shop-discount-coupons">
            <div className="shopping-cart-shop-discount-coupons-header">
                <IconContext.Provider value={{ color: "#A4895C", style: { width: "1rem", height: "1rem" } }}>
                    <button className="hide-btn" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    </button>
                    <GetUsingCoupons shippingCoupons={currentShippingCoupon} seasoningCoupons={currentSeasoningCoupon} />
                </IconContext.Provider>
            </div>
            <Collapse isOpened={isOpen}>
                <div className="shopping-cart-coupon-list">
                    <div className="shopping-cart-shipping-coupon-list">
                        運費優惠券
                        {shippingCoupons.map((coupon) => {
                            const key = props.parentKey + "-shipping-" + coupon.id;
                            return <ShippingCoupon key={key} currentCoupon={currentShippingCoupon} onSelectedCouponChange={setShippingCoupon} coupon={coupon} />
                        })}
                    </div>
                    <hr />
                    <div className="shopping-cart-seasoning-coupon-list">
                        商品優惠券
                        {seasoningCoupons.map((coupon) => {
                            const key = props.parentKey + "-seasoning-" + coupon.id;
                            return <SeasoningCoupon key={key} currentCoupon={currentSeasoningCoupon} onSelectedCouponChange={setSeasoningCoupon} coupon={coupon} />
                        })}
                    </div>
                </div>
            </Collapse>
        </div>
    );
}

function ShoppingCartShop(props: {
    parentKey: string,
    parentSelectedAll: boolean,
    shop: ShoppingCartShopType,
    revisedShops: (shopRevised: ShoppingCartShopType) => void
}) {
    const { parentKey, parentSelectedAll, revisedShops } = props;
    const [shop, setShop] = useState(props.shop);
    const [shippingCoupon, setShippingCoupon] = useState<ShippingCouponType | null>(null);
    const [seasoningCoupon, setSeasoningCoupon] = useState<SeasoningCouponType | null>(null);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedAll, setSelectedAll] = useState(parentSelectedAll);
    const checkBoxRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        let totalCost = 0;
        shop.products.forEach((product) => {
            if (product.isChoosed)
                totalCost += product.productPrice * product.productQuantity;
        });
        setTotalCost(totalCost);
    }, [seasoningCoupon, shippingCoupon, shop]);
    useEffect(() => {
        if (checkBoxRef.current) {
            checkBoxRef.current.checked = parentSelectedAll;
        }
        setSelectedAll(parentSelectedAll);
    }, [parentSelectedAll]);
    const onCheckBoxChanged = () => {
        setSelectedAll(checkBoxRef.current!.checked);
    };
    const reviseShopWithProduct = (productsRevised: ShoppingCartProductType) => {
        let newShop = { ...shop };
        for (let i = 0; i < newShop.products.length; i++) {
            if (newShop.products[i].productId == productsRevised.productId) {
                if (productsRevised.productQuantity == 0)
                    newShop.products.splice(i, 1);
                else
                    newShop.products[i] = productsRevised;
                break;
            }
        }
        setShop(newShop);
        revisedShops(newShop);
    }
    const reviseShopWithShippingCoupon = (coupon: ShippingCouponType | null) => {
        let newShop = { ...shop };
        newShop.usingShippingCoupon = coupon;
        setShop(newShop);
        revisedShops(newShop);
    }
    const reviseShopWithSeasoningCoupon = (coupon: SeasoningCouponType | null) => {
        let newShop = { ...shop };
        newShop.usingSeasoningCoupon = coupon;
        setShop(newShop);
        revisedShops(newShop);
    }
    const onShippingCouponChange = (coupon: ShippingCouponType | null) => {
        reviseShopWithShippingCoupon(coupon);
        setShippingCoupon(coupon);
    };
    const onSeasoningCouponChange = (coupon: SeasoningCouponType | null) => {
        reviseShopWithSeasoningCoupon(coupon);
        setSeasoningCoupon(coupon);
    };

    return (
        <div className="shopping-cart-shop">
            <div className="shopping-cart-shop-header">
                <input type="checkbox" id="shop" className="product-checkbox" ref={checkBoxRef} onChange={onCheckBoxChanged}></input>
                <label htmlFor="shop">
                    <img src="/logo.PNG"></img>
                    {shop.shopName}
                </label>
            </div>
            <hr />
            {shop.products.map((product) => {
                const key = parentKey + "-product-" + product.productId;
                return <ShoppingCartProduct key={key} parentKey={key} parentSelectedAll={selectedAll} product={product} reviseProducts={reviseShopWithProduct} />;
            })}
            <hr />
            <ShoppingCartShopCostCalculate totalCost={totalCost} shippingFee={shop.shippingFee} shippingCoupons={shippingCoupon} seasoningCoupon={seasoningCoupon} />
            <DiscountCoupons
                parentKey={parentKey}
                shippingCoupons={shop.shippingCoupons}
                seasoningCoupons={shop.seasoningCoupons}
                currentShippingCoupon={shippingCoupon}
                setShippingCoupon={onShippingCouponChange}
                currentSeasoningCoupon={seasoningCoupon}
                setSeasoningCoupon={onSeasoningCouponChange} />
        </div>
    );
}

function ShoppingCartProducts(props: { shops: ShoppingCartShopType[], setShops: (shops: ShoppingCartShopType[]) => void }) {
    const { shops } = props;
    const [selectedAll, setSelectedAll] = useState(false);
    const checkBoxRef = useRef<HTMLInputElement>(null);
    const onCheckBoxChanged = () => {
        setSelectedAll(checkBoxRef.current!.checked);
    };
    const revisedShops = (shopRevised: ShoppingCartShopType) => {
        let newShops = [...shops];
        for (let i = 0; i < newShops.length; i++) {
            if (newShops[i].shopId == shopRevised.shopId) {
                if (shopRevised.products.length == 0)
                    newShops.splice(i, 1);
                else
                    newShops[i] = shopRevised;
                break;
            }
        }
        props.setShops(newShops);
    }

    return (
        <div className="shopping-cart-products">
            <div className="shopping-cart-products-header">
                <input type="checkbox" id="check-all-product" className="product-checkbox" ref={checkBoxRef} onChange={onCheckBoxChanged}></input>
                <label htmlFor="check-all-prouct">商品</label>
            </div>
            <div className="shopping-cart-shops-container">
                {shops.map((shop) => {
                    const key = "shop-" + shop.shopId;
                    return <ShoppingCartShop key={key} parentSelectedAll={selectedAll} parentKey={key} shop={shop} revisedShops={revisedShops} />
                })}
            </div>
        </div>
    );
}

function ShoppingCartCostCalculate(props: { shops: ShoppingCartShopType[] }) {
    const { shops } = props;
    const [totalCost, setTotalCost] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    useEffect(() => {
        console.log("shops changed")
        let totalCost = 0;
        let shippingFee = 0;
        shops.forEach((shop) => {
            shop.products.forEach((product) => {
                const shippingDiscount = shop.usingShippingCoupon ? shop.usingShippingCoupon.discount : 0;
                const seasoningDiscount = shop.usingSeasoningCoupon ? shop.usingSeasoningCoupon.discount : 0;
                let shopTotalCost = 0;
                if (product.isChoosed) {
                    shopTotalCost += product.productPrice * product.productQuantity;
                }
                if (shopTotalCost > 0) {
                    totalCost += shopTotalCost;
                    shippingFee += Math.max(0, shop.shippingFee - shippingDiscount);
                    totalCost -= seasoningDiscount;
                }
            });
        });
        setTotalCost(totalCost);
        setShippingFee(shippingFee);
    }, [shops]);

    return (
        <div className="shopping-cart-cost-calculate">
            <span>金額試算</span>
            <div className="shopping-cart-cost-calculate-container">
                <LabelValuePair label="商品總金額" value={"$" + totalCost} />
                <LabelValuePair label="運費總金額" value={"$" + shippingFee} />
                <hr />
                <LabelValuePair label="總金額" value={"$" + (totalCost + shippingFee)} fontSize="1.5rem" valueColor="#BD8248" valueFontWeight="bold" />
            </div>
            <button className="shopping-cart-checkout-btn">結帳</button>
        </div>
    );
}

export default function ShoppingCart() {
    let shopingCart = getFakeShoppingCart();
    const [shops, setShops] = useState<ShoppingCartShopType[]>(shopingCart.shops);

    return (
        <div className="shopping-cart-container">
            <ShoppingCartHeader productQuantity={8}/>
            <div className="shopping-cart-infos">
                <ShoppingCartProducts shops={shops} setShops={setShops}/>
                <ShoppingCartCostCalculate shops={shops}/>
            </div>
        </div>
    );
}

function getFakeShoppingCart(): ShoppingCartType {
    return {
        shops: [
            {
                shopId: 1,
                shopName: "旋風奶油",
                shippingFee: 60,
                usingShippingCoupon: null,
                usingSeasoningCoupon: null,
                products: [
                    {
                        productId: 1,
                        productName: "奶油夾心餅乾（10 入）",
                        productPrice: 300,
                        productQuantity: 1,
                        productImage: "https://i.imgur.com/HgELSyF.png",
                        productStock: 10,
                        isChoosed: false
                    },
                    {
                        productId: 2,
                        productName: "黑巧夾心餅乾（10 入）",
                        productPrice: 300,
                        productQuantity: 3,
                        productImage: "https://i.imgur.com/HgELSyF.png",
                        productStock: 50,
                        isChoosed: false
                    }
                ],
                shippingCoupons: [
                    {
                        id: 1,
                        name: "滿$500免運費",
                        discount: 60,
                        description: "滿$500免運費",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    },
                    {
                        id: 2,
                        name: "滿$250免運費",
                        discount: 60,
                        description: "滿$250免運費",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    }
                ],
                seasoningCoupons: [
                    {
                        id: 3,
                        name: "滿$500折$50",
                        discount: 50,
                        lowerLimit: 500,
                        description: "滿$500折$50",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    },
                    {
                        id: 4,
                        name: "滿$250折$25",
                        discount: 25,
                        lowerLimit: 250,
                        description: "滿$250折$25",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    }
                ]
            },
            {
                shopId: 2,
                shopName: "餅乾故事館",
                shippingFee: 0,
                usingShippingCoupon: null,
                usingSeasoningCoupon: null,
                products: [
                    {
                        productId: 4,
                        productName: "奶油夾心餅乾（12 入）",
                        productPrice: 300,
                        productQuantity: 5,
                        productImage: "https://i.imgur.com/HgELSyF.png",
                        productStock: 30,
                        isChoosed: false
                    },
                    {
                        productId: 5,
                        productName: "黑巧夾心餅乾（12 入）",
                        productPrice: 300,
                        productQuantity: 2,
                        productImage: "https://i.imgur.com/HgELSyF.png",
                        productStock: 20,
                        isChoosed: false
                    }
                ],
                shippingCoupons: [
                    {
                        id: 5,
                        name: "滿$600免運費",
                        discount: 60,
                        description: "滿$600免運費",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    },
                    {
                        id: 6,
                        name: "滿$450免運費",
                        discount: 60,
                        description: "滿$450免運費",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    }
                ],
                seasoningCoupons: [
                    {
                        id: 7,
                        name: "滿$1000折$20",
                        discount: 20,
                        lowerLimit: 1000,
                        description: "滿$500折$50",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    },
                    {
                        id: 8,
                        name: "滿$2000折$100",
                        discount: 100,
                        lowerLimit: 2500,
                        description: "滿$250折$25",
                        startTime: "2021/10/01",
                        endTime: "2021/10/31"
                    }
                ]
            },
        ]
    };
}