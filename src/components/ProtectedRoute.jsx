import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        MySwal.fire({
            icon: "warning",
            title: "Acceso denegado",
            text: "Debes iniciar sesión para acceder a esta sección.",
            confirmButtonColor: "#b30000",
            background: "#2c2c2c",
            color: "#f5f5f5"
        });

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
