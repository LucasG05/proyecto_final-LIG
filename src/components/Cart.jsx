import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SEO from './SEO';

function Cart() {
    const { cartItems, addToCart, removeFromCart: onRemove, clearCart } = useContext(CartContext);

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );

    const onAdd = (productId) => {
        const product = cartItems.find(item => item.id === productId);
        if (product) {
            addToCart(product);
            toast.success('Cantidad actualizada');
        }
    };

    const onDelete = async (productId) => {
        const result = await Swal.fire({
            title: '¿Eliminar producto?',
            text: "¿Estás seguro de eliminar una unidad de este producto del carrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b30000',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#2c2c2c',
            color: '#f5f5f5'
        });

        if (result.isConfirmed) {
            const itemsToRemove = cartItems.filter(item => item.id === productId);
            itemsToRemove.forEach(() => onRemove(productId));
            toast.success('Producto eliminado del carrito');
        }
    };

    const handleClearCart = async () => {
        const result = await Swal.fire({
            title: '¿Vaciar carrito?',
            text: "¿Estás seguro de eliminar todos los productos del carrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b30000',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar',
            background: '#2c2c2c',
            color: '#f5f5f5'
        });

        if (result.isConfirmed) {
            clearCart();
            toast.success('Carrito vaciado');
        }
    };

    return (
        <>
            <SEO
                title="Carrito de Compras"
                description="Revisa y gestiona los productos en tu carrito de compras"
            />

            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-light h2">Carrito de compras</h1>
                    {cartItems.length > 0 && (
                        <button
                            className="btn btn-danger"
                            onClick={handleClearCart}
                        >
                            Vaciar carrito
                        </button>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="alert alert-info">
                        El carrito está vacío.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Unitario</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-light"
                                                    onClick={() => onRemove(item.id)}
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Reducir cantidad de ${item.name}`}
                                                >
                                                    –
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-light"
                                                    onClick={() => addToCart(item)}
                                                    aria-label={`Aumentar cantidad de ${item.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => onDelete(item.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="text-end fw-bold">Total:</td>
                                    <td colSpan="2" className="fw-bold">${total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;