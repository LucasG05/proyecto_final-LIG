import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '../hooks/useNavigation';

function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const { handleCartClick, handleLogout } = useNavigation();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--main-red)' }}>
            <div className="container">
                <NavLink className="navbar-brand text-light fw-bold d-flex align-items-center" to="/">
                    <div className="bg-light rounded me-2 p-1">
                        <img src="/icon.png" alt="Logo Tienda Red" width="35" height="35"
                            className="d-inline-block align-text-top" />
                    </div>
                    Tienda Red
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="ms-auto d-flex align-items-center">
                        <NavLink to="/" className={({ isActive }) =>
                            `btn me-2 d-flex align-items-center ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`}>
                            <FaHome className="me-1" />
                            <span className="d-none d-sm-inline">Inicio</span>
                        </NavLink>

                        {isLoggedIn && isAdmin && (
                            <NavLink to="/admin" className={({ isActive }) =>
                                `btn me-2 d-flex align-items-center ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`}>
                                <FaCog className="me-1" />
                                <span className="d-none d-sm-inline">Admin</span>
                            </NavLink>
                        )}

                        {isLoggedIn && (
                            <NavLink
                                to="/carrito"
                                onClick={handleCartClick}
                                className={({ isActive }) =>
                                    `btn me-2 d-flex align-items-center position-relative ${isActive ? 'btn-light text-dark' : 'btn-outline-light'
                                    }`
                                }
                            >
                                <FaShoppingCart className="me-1" />
                                <span className="d-none d-sm-inline">Carrito</span>
                                {totalItems > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>
                        )}

                        {isLoggedIn ? (
                            <button className="btn btn-outline-light d-flex align-items-center"
                                onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" />
                                <span className="d-none d-sm-inline">Salir</span>
                            </button>
                        ) : (
                            <NavLink to="/login" className={({ isActive }) =>
                                `btn d-flex align-items-center ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`}>
                                <FaSignInAlt className="me-1" />
                                <span className="d-none d-sm-inline">Ingresar</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;