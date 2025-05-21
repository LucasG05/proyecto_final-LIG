import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProductDetail from './pages/ProductDetail'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import Footer from './components/Footer'
import './App.css'
import './styles.css'

const MySwal = withReactContent(Swal)

function AppContent() {
  const navigate = useNavigate()

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  )

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const handleAddToCart = product => {
    if (!isLoggedIn) {
      MySwal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Inicia sesión para añadir productos al carrito.',
        confirmButtonColor: 'var(--main-red)',
        background: 'var(--card-bg)',
        color: 'var(--text-light)'
      })
      return
    }

    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id)
      let newCart
      if (exists) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }]
      }

      MySwal.fire({
        icon: 'success',
        title: '¡Agregado al carrito!',
        text: `"${product.title}" se agregó correctamente.`,
        timer: 2000,
        showConfirmButton: false,
        background: 'var(--card-bg)',
        color: 'var(--text-light)'
      })

      return newCart
    })
  }

  const handleIncreaseQuantity = productId => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const handleDecreaseQuantity = productId => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const handleDeleteItem = productId => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem('loggedIn', 'true')
    navigate('/')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('loggedIn')
    navigate('/login')
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} cart={cart} />

      <main className="pb-5">
        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />

          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />

          <Route
            path="/producto/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProductDetail onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/carrito"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Cart
                  cartItems={cart}
                  onAdd={handleIncreaseQuantity}
                  onRemove={handleDecreaseQuantity}
                  onDelete={handleDeleteItem}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
