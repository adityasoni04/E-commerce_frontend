import ProductCard from '../../components/Product/ProductCard';
import { getProducts } from '../../utils/api';

export default async function ProductsPage() {
    let products = [];

    try {
        products = await getProducts(); // Fetch product data during server-side rendering
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Optionally handle the error or provide fallback data
        products = []; // Provide an empty array or fallback data
    }

    return (
        <div>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available at the moment.</p>
                )}
            </div>
        </div>
    );
}
