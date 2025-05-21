import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from 'react-router-dom';
import { translateCategory } from "../utils/categoryTranslator";

function ProductList({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        const url =
            selectedCategory === "all"
                ? "https://fakestoreapi.com/products"
                : `https://fakestoreapi.com/products/category/${selectedCategory}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar productos");
                setLoading(false);
            });
    }, [selectedCategory]);

    return (
        <div className="container mt-4">
            <div className="mb-4">
                <label className="form-label fw-bold text-light">Filtrar por categoría:</label>
                <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">Todas</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {translateCategory(cat)}
                        </option>))}
                </select>
            </div>

            <div className="row" style={{ minHeight: "400px" }}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-danger text-center mt-5">{error}</div>
                ) : (
                    products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                                detailLink={
                                    <Link
                                        to={`/producto/${product.id}`}
                                        className="btn btn-outline-light btn-sm"
                                    >
                                        Ver detalles
                                    </Link>
                                }
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );


}

export default ProductList;
