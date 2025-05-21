import { Link } from 'react-router-dom';
import { Home, ShoppingCart, LogIn, LogOut } from 'lucide-react'
import logo from '../../public/icon.png'

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
                <Link className="navbar-brand text-light fw-bold" to="/">Tienda Red</Link>

                <div className="d-flex ms-auto">
                    <Link to="/" className="btn btn-outline-light me-3 d-flex align-items-center">
                        <Home size={16} className="me-1" />
                        Home
                    </Link>
                    {isLoggedIn && (
                        <Link to="/carrito" className="btn btn-outline-light me-3 d-flex align-items-center position-relative">
                            <ShoppingCart size={16} className="me-1" />
                            Carrito
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {isLoggedIn
                        ? <button
                            className="btn btn-outline-light me-3 d-flex align-items-center"
                            onClick={onLogout}
                        >
                            <LogOut size={16} className="me-1" />
                            Cerrar sesión
                        </button>
                        : <Link
                            to="/login"
                            className="btn btn-outline-light me-3 d-flex align-items-center"
                        >
                            <LogIn size={16} className="me-1" />
                            Iniciar sesión
                        </Link>
                    }


                </div>
            </div>
        </nav>
    );
}

export default Navbar;
