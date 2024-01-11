import { ProductListDataType } from "../../mapper/ProductMapper";
import "./ProductsList.css";

function ProductItem({ id, image, name, price  }: { id: string, image: string, name: string, price: number  }) {
    return (
        <div className="products-list-item">
            <a href={`product?productId=${id}`}>
                <img src={image} alt="product" />
            </a>
            <div className="products-list-item-info">
                <a href={`product?productId=${id}`}>
                    <h3 className="products-list-item-name">{name}</h3>
                </a>
            </div>
            <div className="products-list-item-price">{`\$${price}`}</div>
        </div>
    );
}

export default function ProductsList({ products }: { products: ProductListDataType[] }) {
    return (
        <div className="products-list">
            {products.map((product, index) => (
                <ProductItem key={`products-list-item-${index}`} id={product.id} image={product.image} name={product.name} price={product.price} />
            ))}
        </div>
    );
}