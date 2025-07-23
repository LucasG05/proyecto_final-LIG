import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { toast } from 'react-toastify';

function ProductList() {
    const { addToCart } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { products, loading, error } = useContext(ProductContext);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const productsPerPage = 6;

    const categories = ["Todos", ...new Set(products.map(product => product.category))];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-light"></div></div>;
    if (error) return <div className="alert alert-danger m-3">{error}</div>;

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(
            isLoggedIn
                ? `${product.name} agregado al carrito`
                : `${product.name} agregado al carrito. Inicia sesión para verlo`,
            {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };
    return (
        <div className="container py-4">
            <SEO
                title="Catálogo de Productos"
                description="Explora nuestra selección de productos"
            />

            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === "Todos" ? "Todas las categorías" : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {currentProducts.map(product => (
                    <div key={product.id} className="col">
                        <ProductCard
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                            detailLink={<Link to={`/producto/${product.id}`}>Ver detalles</Link>}
                        />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {currentProducts.length === 0 && (
                <div className="alert alert-info text-center mt-4">
                    No se encontraron productos que coincidan con tu búsqueda.
                </div>
            )}
        </div>
    );
}

export default ProductList;