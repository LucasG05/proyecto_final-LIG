import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    const handleQuickAccess = () => {
        setUsername(adminCredentials.username);
        setPassword(adminCredentials.password);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            if (username === adminCredentials.username && 
                password === adminCredentials.password) {
                localStorage.setItem('isAdmin', 'true');
            }
            
            login();
            toast.success(`¡Bienvenido ${username}!`);
            navigate('/');          
        } else {
            toast.error('Por favor ingresa usuario y contraseña.');
        }
    };

    return (
        <>
            <SEO 
                title="Iniciar Sesión"
                description="Accede a tu cuenta para realizar compras y gestionar productos"
            />

            <div className="container mt-5" style={{ maxWidth: '400px' }}>
                <h1 className="text-center mb-4 text-light h2">Iniciar Sesión</h1>
                
                <div className="card bg-dark text-light p-4 mb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label 
                                htmlFor="username" 
                                className="form-label"
                            >
                                Usuario
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                aria-label="Nombre de usuario"
                            />
                        </div>
                        <div className="mb-3">
                            <label 
                                htmlFor="password" 
                                className="form-label"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                aria-label="Contraseña"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 mb-3"
                        >
                            Iniciar Sesión
                        </button>
                        
                        <button 
                            type="button"
                            className="btn btn-outline-light w-100"
                            onClick={handleQuickAccess}
                            aria-label="Acceso rápido para administradores"
                        >
                            Acceso Rápido (Admin)
                        </button>
                    </form>
                </div>

                <div className="alert alert-info" role="alert">
                    <small>
                        <strong>Nota para profe:</strong> Usa el botón de "Acceso Rápido" 
                        para ingresar como administrador y ver la gestión de productos.
                    </small>
                </div>
            </div>
        </>
    );
}