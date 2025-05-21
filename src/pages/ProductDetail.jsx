import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { translateCategory } from '../utils/categoryTranslator'
import Spinner from 'react-bootstrap/Spinner'

export default function ProductDetail({ onAddToCart }) {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('No se encontró el producto')
                return res.json()
            })
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="light" />
            </div>
        )
    }
    if (error) {
        return (
            <div className="text-center text-danger my-5">
                <p>Error: {error}</p>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row g-4">
                <div className="col-md-5">
                    <div className="card" style={{ backgroundColor: 'var(--card-bg)' }}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="card-img-top p-4"
                            style={{ objectFit: 'contain', height: '350px' }}
                        />
                    </div>
                </div>
                <div className="col-md-7 text-light">
                    <h2 className="mb-3">{product.title}</h2>
                    <p>Categoría: {translateCategory(product.category)}</p>
                    <h4 className="mb-3">${product.price.toFixed(2)}</h4>
                    <p>{product.description}</p>

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => onAddToCart(product)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}
