import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            localStorage.setItem('loggedIn', 'true');
            onLogin(true);

            MySwal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: `Hola ${username}`,
                confirmButtonColor: 'var(--main-red)',
                background: 'var(--card-bg)',
                color: 'var(--text-light)'
            });

            navigate('/');          
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingresa usuario y contraseña.',
                confirmButtonColor: 'var(--main-red)',
                background: 'var(--card-bg)',
                color: 'var(--text-light)'
            });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4 text-light">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label text-light">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label text-light">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Entrar
                </button>
            </form>
        </div>
    );
}
