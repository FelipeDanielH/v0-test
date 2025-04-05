"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Carrito() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [subtotal, setSubtotal] = useState(0)
  const [envio, setEnvio] = useState(0)
  const [total, setTotal] = useState(0)
  const [cupon, setCupon] = useState("")
  const [descuento, setDescuento] = useState(0)
  const [cuponAplicado, setCuponAplicado] = useState(false)
  const [cuponError, setCuponError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Cargar items del carrito desde localStorage
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(cart)
      setLoading(false)

      // Calcular subtotal
      const subtotalValue = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0)
      setSubtotal(subtotalValue)

      // Calcular envío (gratis si el subtotal es mayor a 50000)
      const envioValue = subtotalValue > 50000 ? 0 : 3990
      setEnvio(envioValue)

      // Calcular total
      setTotal(subtotalValue + envioValue - descuento)
    }

    loadCart()
  }, [descuento])

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Recalcular subtotal
    const subtotalValue = updatedCart.reduce((acc, item) => acc + item.precio * item.quantity, 0)
    setSubtotal(subtotalValue)

    // Recalcular envío
    const envioValue = subtotalValue > 50000 ? 0 : 3990
    setEnvio(envioValue)

    // Recalcular total
    setTotal(subtotalValue + envioValue - descuento)
  }

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Recalcular subtotal
    const subtotalValue = updatedCart.reduce((acc, item) => acc + item.precio * item.quantity, 0)
    setSubtotal(subtotalValue)

    // Recalcular envío
    const envioValue = subtotalValue > 50000 ? 0 : 3990
    setEnvio(envioValue)

    // Recalcular total
    setTotal(subtotalValue + envioValue - descuento)
  }

  const aplicarCupon = () => {
    // Simulación de validación de cupón
    if (cupon.toLowerCase() === "eco10") {
      const descuentoValue = Math.round(subtotal * 0.1) // 10% de descuento
      setDescuento(descuentoValue)
      setCuponAplicado(true)
      setCuponError("")
    } else {
      setCuponError("Cupón inválido o expirado")
      setDescuento(0)
      setCuponAplicado(false)
    }
  }

  const procederPago = () => {
    // Guardar información del pedido en localStorage para usarla en checkout
    const orderInfo = {
      items: cartItems,
      subtotal,
      envio,
      descuento,
      total,
    }

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo))

    // Redireccionar a checkout
    router.push("/checkout")
  }

  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <h1 className="text-primary mb-4">Carrito de Compras</h1>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando carrito...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-cart-x text-muted" style={{ fontSize: "5rem" }}></i>
              </div>
              <h3>Tu carrito está vacío</h3>
              <p className="text-muted mb-4">Parece que aún no has agregado productos a tu carrito</p>
              <Link href="/productos" className="btn btn-primary">
                Explorar Productos
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th scope="col" className="ps-4">
                              Producto
                            </th>
                            <th scope="col" className="text-center">
                              Precio
                            </th>
                            <th scope="col" className="text-center">
                              Cantidad
                            </th>
                            <th scope="col" className="text-center">
                              Subtotal
                            </th>
                            <th scope="col" className="text-center pe-4">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id}>
                              <td className="ps-4">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={item.imagen || "/placeholder.svg"}
                                    alt={item.nombre}
                                    className="rounded me-3"
                                    width="80"
                                    height="80"
                                    style={{ objectFit: "cover" }}
                                  />
                                  <div>
                                    <h6 className="mb-1">{item.nombre}</h6>
                                    <small className="text-muted">ID: {item.id}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center align-middle">${item.precio.toLocaleString("es-CL")}</td>
                              <td className="text-center align-middle">
                                <div className="d-flex justify-content-center">
                                  <div className="input-group" style={{ width: "120px" }}>
                                    <button
                                      className="btn btn-outline-secondary btn-sm"
                                      type="button"
                                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                      <i className="bi bi-dash"></i>
                                    </button>
                                    <input
                                      type="number"
                                      className="form-control form-control-sm text-center"
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)
                                      }
                                      min="1"
                                    />
                                    <button
                                      className="btn btn-outline-secondary btn-sm"
                                      type="button"
                                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                      <i className="bi bi-plus"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center align-middle fw-bold">
                                ${(item.precio * item.quantity).toLocaleString("es-CL")}
                              </td>
                              <td className="text-center align-middle pe-4">
                                <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id)}>
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <Link href="/productos" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Continuar Comprando
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setCartItems([])
                      localStorage.setItem("cart", "[]")
                      setSubtotal(0)
                      setEnvio(0)
                      setTotal(0)
                      setDescuento(0)
                      setCuponAplicado(false)
                    }}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Vaciar Carrito
                  </button>
                </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-primary-custom text-white py-3">
                    <h5 className="mb-0">Resumen de Compra</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal</span>
                      <span className="fw-bold">${subtotal.toLocaleString("es-CL")}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span>Envío</span>
                      <span className="fw-bold">
                        {envio === 0 ? (
                          <span className="text-success">Gratis</span>
                        ) : (
                          `$${envio.toLocaleString("es-CL")}`
                        )}
                      </span>
                    </div>

                    {descuento > 0 && (
                      <div className="d-flex justify-content-between mb-3 text-success">
                        <span>Descuento</span>
                        <span className="fw-bold">-${descuento.toLocaleString("es-CL")}</span>
                      </div>
                    )}

                    <hr />

                    <div className="d-flex justify-content-between mb-4">
                      <span className="fw-bold">Total</span>
                      <span className="fw-bold fs-5 text-primary">${total.toLocaleString("es-CL")}</span>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="cupon" className="form-label">
                        Cupón de descuento
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className={`form-control ${cuponError ? "is-invalid" : cuponAplicado ? "is-valid" : ""}`}
                          id="cupon"
                          placeholder="Ingresa tu cupón"
                          value={cupon}
                          onChange={(e) => setCupon(e.target.value)}
                          disabled={cuponAplicado}
                        />
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={aplicarCupon}
                          disabled={cuponAplicado || !cupon}
                        >
                          Aplicar
                        </button>
                      </div>
                      {cuponError && <div className="text-danger small mt-1">{cuponError}</div>}
                      {cuponAplicado && <div className="text-success small mt-1">Cupón aplicado correctamente</div>}
                    </div>

                    <div className="d-grid">
                      <button className="btn btn-primary py-2" onClick={procederPago}>
                        Proceder al Pago
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="text-banco mb-3">Paga con BancoSimple</h5>
                    <p className="text-muted small mb-3">Obtén un 5% de descuento adicional pagando con BancoSimple</p>
                    <div className="d-grid">
                      <button className="btn btn-banco">
                        <i className="bi bi-bank me-2"></i>
                        Pagar con BancoSimple
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

