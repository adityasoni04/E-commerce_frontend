import ProductCard from '../../components/Product/ProductCard';
import { getProducts } from '../../utils/api';

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
