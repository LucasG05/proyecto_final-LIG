import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

function ProductCard({ product, onAddToCart, detailLink }) {
    return (
        <Card className="h-100 bg-dark text-light">
            <div className="position-relative" style={{ paddingTop: '100%' }}>
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        objectFit: 'contain',
                        padding: '1rem',
                        backgroundColor: '#343a40'
                    }}
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="h5 text-truncate">{product.name}</Card.Title>
                <Card.Text className="text-muted small mb-2">
                    {product.category}
                </Card.Text>
                <Card.Text className="h5 text-primary mb-3">
                    ${product.price.toLocaleString('es-AR')}
                </Card.Text>
                <div className="mt-auto d-flex flex-column gap-2">
                    {detailLink}
                    <Button
                        variant="primary"
                        onClick={onAddToCart}
                        className="d-flex align-items-center justify-content-center gap-2"
                    >
                        <FaShoppingCart size={16} />
                        <span>Agregar al carrito</span>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    detailLink: PropTypes.node.isRequired
};

export default ProductCard;