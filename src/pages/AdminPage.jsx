import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SEO from '../components/SEO';

function AdminPage() {
    const { products, addProduct, deleteProduct, updateProduct, loading, error } = useContext(ProductContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingProduct, setEditingProduct] = useState(null);
    const productsPerPage = 6;

    const initialProductState = {
        name: "",
        price: "",
        description: "",
        image: "",
        category: ""
    };

    const [newProduct, setNewProduct] = useState(initialProductState);

    const categories = ["Todas", "Camisetas", "Pelotas", "Calzado", "Accesorios", "Shorts", "Retro", "Infantiles"];

    const validateForm = () => {
        if (!newProduct.name.trim()) {
            toast.error('El nombre es obligatorio');
            return false;
        }
        if (!newProduct.price || newProduct.price <= 0) {
            toast.error('El precio debe ser mayor a 0');
            return false;
        }
        if (newProduct.description.length < 10) {
            toast.error('La descripción debe tener al menos 10 caracteres');
            return false;
        }
        if (!newProduct.category) {
            toast.error('Debes seleccionar una categoría');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, newProduct);
                toast.success('Producto actualizado exitosamente');
                setEditingProduct(null);
            } else {
                await addProduct(newProduct);
                toast.success('Producto agregado exitosamente');
            }
            setNewProduct(initialProductState);
        } catch (error) {
            toast.error(editingProduct ?
                'Error al actualizar el producto' :
                'Error al agregar el producto'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || '' : value
        }));
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            category: product.category
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b30000',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#2c2c2c',
            color: '#f5f5f5'
        });

        if (result.isConfirmed) {
            try {
                await deleteProduct(id);
                toast.success('Producto eliminado exitosamente');
            } catch (error) {
                toast.error('Error al eliminar el producto');
            }
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setNewProduct(initialProductState);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <>
            <SEO
                title="Panel de Administración"
                description="Gestión de productos de la tienda"
            />

            <div className="container my-4">
                <h1 className="text-light mb-4">Panel de Administración</h1>

                <div className="card bg-dark text-light mb-4">
                    <div className="card-body">
                        <h2 className="h4 mb-3">
                            {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del producto"
                                        name="name"
                                        value={newProduct.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Precio"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <textarea
                                        className="form-control"
                                        placeholder="Descripción"
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="URL de la imagen"
                                        name="image"
                                        value={newProduct.image}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={newProduct.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Guardando...' :
                                            editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                                    </button>
                                    {editingProduct && (
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <div className="d-flex flex-column flex-sm-row gap-2">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {totalPages > 1 && (
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
}

export default AdminPage;