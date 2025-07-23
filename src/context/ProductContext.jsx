import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

const API_URL = "https://6877f642dba809d901f1924d.mockapi.io/products/products"; 

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setProducts(res.data);
        } catch (err) {
            setError("Error al obtener productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        await axios.post(API_URL, product);
        fetchProducts();
    };

    const updateProduct = async (id, updatedProduct) => {
        await axios.put(`${API_URL}/${id}`, updatedProduct);
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
