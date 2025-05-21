// src/components/Cart.jsx
import React from 'react';

function Cart({ cartItems, onAdd, onRemove, onDelete }) {
    // Total general
    const total = cartItems.reduce(
        (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
        0
    );

    return (
        <div className="container my-4">
            <h2 className="text-light">Carrito de compras</h2>

            {cartItems.length === 0 ? (
                <p className="text-light">El carrito está vacío.</p>
            ) : (
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
                        {cartItems.map((item, index) => {
                            const price = item.price ?? 0;
                            const qty = item.quantity ?? 0;
                            const subtotal = price * qty;

                            return (
                                <tr key={`${item.id}-${index}`}>
                                    <td>{item.title}</td>
                                    <td>${price.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            onClick={() => onRemove(item.id)}
                                            disabled={qty <= 1}
                                        >
                                            –
                                        </button>
                                        {qty}
                                        <button
                                            className="btn btn-sm btn-secondary ms-2"
                                            onClick={() => onAdd(item.id)}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>${subtotal.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => onDelete(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end fw-bold text-light">
                                Total:
                            </td>
                            <td colSpan="2" className="fw-bold text-light">
                                ${total.toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default Cart;
