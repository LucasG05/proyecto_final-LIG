import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
import Spinner from 'react-bootstrap/Spinner'
import SEO from '../components/SEO'
import { toast } from 'react-toastify'

export default function ProductDetail() {
    const { addToCart } = useContext(CartContext);
    const { products, loading, error } = useContext(ProductContext);
    const { id } = useParams();

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="light" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger my-5" role="alert">
                <p>Error: {error}</p>
            </div>
        );
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <>
                <SEO
                    title="Producto no encontrado"
                    description="El producto que buscas no existe o ha sido eliminado"
                />
                <div className="text-center text-light my-5" role="alert">
                    <h2>Producto no encontrado</h2>
                    <p>El producto que buscas no existe o ha sido eliminado.</p>
                </div>
            </>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} agregado al carrito`);
    };

    return (
        <>
            <SEO
                title={product.name || 'Detalle de producto'}
                description={product.description || 'Información del producto'}
            />

            <div className="container my-4 my-md-5">
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="card bg-transparent border-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid p-4"
                                style={{
                                    maxHeight: '500px',
                                    objectFit: 'contain',
                                    width: '100%'
                                }}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 text-light">
                        <div className="p-3">
                            <h1 className="h2 mb-4">{product.name}</h1>
                            <div className="mb-4">
                                <p className="mb-2">
                                    <span>Categoría: </span>
                                    {product.category}
                                </p>
                                <h2 className="h4 mb-3" aria-label={`Precio: ${product.price} pesos`}>
                                    ${product.price.toFixed(2)}
                                </h2>
                            </div>

                            <div className="mb-4">
                                <h3 className="h5 mb-3">Descripción:</h3>
                                <p className="lead">{product.description}</p>
                            </div>

                            <button
                                className="btn btn-primary btn-lg w-100 w-md-auto"
                                onClick={handleAddToCart}
                                aria-label={`Agregar ${product.title} al carrito`}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}