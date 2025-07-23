import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export function useNavigation() {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    const { logout } = useContext(AuthContext);

    const handleCartClick = (e) => {
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        if (totalItems === 0) {
            toast.info('Tu carrito está vacío');
            return false; 
        }
        navigate('/carrito');
        return false;
    };

    const handleLogout = () => {
        logout();
        toast.success('Has cerrado sesión exitosamente');
        navigate('/');
    };

    return { handleCartClick, handleLogout };
}