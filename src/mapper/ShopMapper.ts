export type ShopListData = {
    shopId: string;
    shopIcon: string;
    shopName: string;
}

export type ShopPageDataType = {
    id: string;
    icon: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
}

export function ToShopListViewModel(shopModel: any): ShopListData {
    return {
        shopId: shopModel.id,
        shopIcon: shopModel.icon,
        shopName: shopModel.name
    };
}

export function ToShopPageViewModel(shopModel: any): ShopPageDataType {
    return {
        id: shopModel.id,
        icon: shopModel.icon,
        name: shopModel.name,
        description: shopModel.description,
        address: shopModel.address,
        phone: shopModel.phoneNumber,
        email: shopModel.email
    };
}