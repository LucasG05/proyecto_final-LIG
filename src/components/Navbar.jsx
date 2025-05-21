import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, LogIn, LogOut } from 'lucide-react';
import logo from '../../public/icon.png';

function Navbar({ isLoggedIn, onLogout, cart }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--main-red)' }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                marginLeft: '6px',
                display: 'inline-block'
            }}>
                <img src={logo} alt="Logo" style={{ width: 45, height: 45 }} />
            </div>

            <div className="container-fluid">
                <NavLink className="navbar-brand text-light fw-bold" to="/">Tienda Red</NavLink>

                <div className="d-flex ms-auto">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `btn me-3 d-flex align-items-center ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`
                        }
                    >
                        <Home size={16} className="me-1" />
                        Home
                    </NavLink>

                    {isLoggedIn && (
                        <NavLink
                            to="/carrito"
                            className={({ isActive }) =>
                                `btn me-3 d-flex align-items-center position-relative ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`
                            }
                        >
                            <ShoppingCart size={16} className="me-1" />
                            Carrito
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </NavLink>
                    )}

                    {isLoggedIn ? (
                        <button
                            className="btn btn-outline-light me-3 d-flex align-items-center"
                            onClick={onLogout}
                        >
                            <LogOut size={16} className="me-1" />
                            Cerrar sesión
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `btn me-3 d-flex align-items-center ${isActive ? 'btn-light text-dark' : 'btn-outline-light'}`
                            }
                        >
                            <LogIn size={16} className="me-1" />
                            Iniciar sesión
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
