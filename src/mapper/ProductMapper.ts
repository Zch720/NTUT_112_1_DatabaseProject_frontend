export type ProductListDataType = {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: string;
};

export type ProductPageDataType = {
    images: string[];
    name: string;
    price: number;
    stock: number;
    description: string;
    category: string;
    shopId: string;
    shopName: string;
    shopLogo: string;
    shopDescription: string;
};

export function ToProductListViewModel(productModel: any): ProductListDataType {
    return {
        id: productModel.id,
        name: productModel.name,
        price: productModel.price,
        image: productModel.image,
        stock: productModel.stock
    };
}

export function ToProductPageViewModel(productModel: any): ProductPageDataType {
    return {
        images: productModel.images,
        name: productModel.name,
        price: productModel.price,
        stock: productModel.stock,
        description: productModel.description,
        category: productModel.category,
        shopId: productModel.shopId,
        shopName: productModel.shopName,
        shopLogo: productModel.shopLogo,
        shopDescription: productModel.shopDescription
    };
}