export type OrderListData = {
    id: string;
    date: string;
    content: string;
    price: number;
}

export type OrderReciverInfoType = {
    name: string;
    phone: string;
    address: string;
}

export type OrderProductInfoType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type OrderCostInfoType = {
    productCost: number;
    productDiscount: number;
    shippingCost: number;
    shippingDiscount: number;
    totalCost: number;
}

export type OrderInfoType = {
    id: string;
    status: string;
    reciverInfo: OrderReciverInfoType;
    shopIcon: string;
    shopName: string;
    products: OrderProductInfoType[];
    cost: OrderCostInfoType;
    paymentMethod: string;
    orderDate: string;
    shippingDate: string;
}

export function ToOrderListViewModel(orderModel: any): OrderListData {
    return {
        id: orderModel.Id,
        date: orderModel.OrderTime,
        content: orderModel.OrderConsistsOf.map((item: any) => item.Name).join("\n"),
        price: orderModel.OrderConsistsOf.reduce((sum: number, item: any) => sum + item.Quantity * item.UnitPrice, 0)
    };
}

export function ToOrderInfoViewModel(orderModel: any): OrderInfoType {
    const productCost = orderModel.OrderConsistsOf.reduce((sum: number, item: any) => sum + item.Quantity * item.UnitPrice, 0);
    const productDiscount = orderModel.SeasoningCoupon.DiscountRate;
    const shippingCost = 0;
    const shippingDiscount = orderModel.ShippingCoupon.DiscountRate;
    return {
        id: orderModel.Id,
        status: orderModel.Status,
        reciverInfo: {
            name: orderModel.Name,
            phone: orderModel.Phone,
            address: orderModel.Address
        },
        shopIcon: orderModel.Shop.Icon,
        shopName: orderModel.Shop.Name,
        products: orderModel.OrderConsistsOf.map((item: any) => {
            return {
                id: item.Id,
                name: orderModel.Products.find((product: any) => product.Id === item.Id).Name,
                price: item.UnitPrice,
                quantity: item.Quantity,
                image: orderModel.Products.find((product: any) => product.Id === item.Id).Images[0].Image
            }
        }),
        cost: {
            productCost: productCost,
            productDiscount: productDiscount,
            shippingCost: shippingCost,
            shippingDiscount: shippingDiscount,
            totalCost: productCost - productDiscount + shippingCost - shippingDiscount
        },
        paymentMethod: "貨到付款",
        orderDate: orderModel.OrderTime,
        shippingDate: orderModel.ShipTime,
    }
}