"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está logueado (simulado)
    const userToken = localStorage.getItem("userToken")
    if (userToken) {
      setIsLoggedIn(true)
    }

    // Obtener cantidad de items en el carrito (simulado)
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userToken")
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <img src="/placeholder.svg?height=30&width=30" alt="EcoMarket Logo" className="me-2" width="30" height="30" />
          <span className="fw-bold text-secondary">
            Eco<span className="text-white">Market</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/productos" className="nav-link">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/categorias" className="nav-link">
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/vendedores" className="nav-link">
                Vendedores
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/sobre-nosotros" className="nav-link">
                Sobre Nosotros
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar productos..."
                aria-label="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center">
            <Link href="/carrito" className="btn btn-outline-light position-relative me-2">
              <i className="bi bi-cart"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  Mi Cuenta
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link href="/perfil" className="dropdown-item">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link href="/mis-pedidos" className="dropdown-item">
                      Mis Pedidos
                    </Link>
                  </li>
                  <li>
                    <Link href="/favoritos" className="dropdown-item">
                      Favoritos
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link href="/login" className="btn btn-outline-light me-2">
                  Iniciar Sesión
                </Link>
                <Link href="/registro" className="btn btn-secondary">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

