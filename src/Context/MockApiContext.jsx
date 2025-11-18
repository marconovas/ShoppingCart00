import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "https://69162abea7a34288a27c8e98.mockapi.io/products";

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product) => {
        const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
        });
        const newProduct = await res.json();
        setProducts([...products, newProduct]);
    };

    const updateProduct = async (id, updatedData) => {
        await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        });
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setProducts(products.filter((p) => p.id !== id));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
        value={{ products, loading, error, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
