import "./ProductsList.css";

export type ProductListItemType = {
    image: string;
    name: string;
    price: number;
};

function ProductItem({ image, name, price  }: { image: string, name: string, price: number  }) {
    return (
        <div className="products-list-item">
            <a href="">
                <img src={image} alt="product" />
            </a>
            <div className="products-list-item-info">
                <a href="">
                    <h3 className="products-list-item-name">{name}</h3>
                </a>
            </div>
            <div className="products-list-item-price">{`\$${price}`}</div>
        </div>
    );
}

export default function ProductsList({ products }: { products: ProductListItemType[] }) {
    return (
        <div className="products-list">
            {products.map((product, index) => (
                <ProductItem key={`products-list-item-${index}`} image={product.image} name={product.name} price={product.price} />
            ))}
        </div>
    );
}