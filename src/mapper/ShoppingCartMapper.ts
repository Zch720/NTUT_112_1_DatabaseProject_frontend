export type ShoppingCartProductType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
    selected: boolean;
}

export type ShoppingCartShopType = {
    shopId: string;
    shopIcon: string;
    shopName: string;
    products: ShoppingCartProductType[];
};

export type ShoppingCartType = {
    shops: ShoppingCartShopType[];
};

export function ToShoppingCartViewModelType(shoppingCartModel: any): ShoppingCartType {
    return {
        shops: shoppingCartModel.shops.map((shop: any) => {
            return {
                shopId: shop.shopId,
                shopIcon: shop.shopIcon,
                shopName: shop.shopName,
                products: shop.products.map((product: any) => {
                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                        stock: product.stock,
                        image: product.image,
                        selected: false
                    };
                })
            };
        })
    }
};