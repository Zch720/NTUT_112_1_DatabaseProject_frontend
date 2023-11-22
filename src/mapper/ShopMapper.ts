export type ShopListData = {
    shopId: string;
    shopIcon: string;
    shopName: string;
}

export function ToShopListViewModel(shopModel: any): ShopListData {
    return {
        shopId: shopModel.Id,
        shopIcon: shopModel.Icon,
        shopName: shopModel.Name
    };
}