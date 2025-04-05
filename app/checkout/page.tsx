"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Checkout() {
  const [orderInfo, setOrderInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(1)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    region: "",
    codigoPostal: "",
    notasEntrega: "",
    metodoPago: "tarjeta",
    numeroTarjeta: "",
    nombreTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    guardarInfo: false,
  })
  const [errors, setErrors] = useState({})
  const [processingOrder, setProcessingOrder] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Cargar información del pedido desde localStorage
    const orderData = JSON.parse(localStorage.getItem("orderInfo") || "null")

    if (!orderData) {
      router.push("/carrito")
      return
    }

    setOrderInfo(orderData)
    setLoading(false)

    // Cargar información del usuario si existe (simulado)
    const userData = JSON.parse(localStorage.getItem("userData") || "null")

    if (userData) {
      setFormData((prevState) => ({
        ...prevState,
        nombre: userData.nombre || "",
        email: userData.email || "",
        telefono: userData.telefono || "",
        direccion: userData.direccion || "",
        ciudad: userData.ciudad || "",
        region: userData.region || "",
        codigoPostal: userData.codigoPostal || "",
      }))
    }
  }, [router])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio"
    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es obligatoria"
    if (!formData.ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria"
    if (!formData.region.trim()) newErrors.region = "La región es obligatoria"
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = "El código postal es obligatorio"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (formData.metodoPago === "tarjeta") {
      if (!formData.numeroTarjeta.trim()) newErrors.numeroTarjeta = "El número de tarjeta es obligatorio"
      if (!formData.nombreTarjeta.trim()) newErrors.nombreTarjeta = "El nombre en la tarjeta es obligatorio"
      if (!formData.fechaExpiracion.trim()) newErrors.fechaExpiracion = "La fecha de expiración es obligatoria"
      if (!formData.cvv.trim()) newErrors.cvv = "El código de seguridad es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (activeStep === 1) {
      if (validateStep1()) {
        setActiveStep(2)
      }
    } else if (activeStep === 2) {
      if (validateStep2()) {
        setActiveStep(3)
      }
    }
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const completeOrder = () => {
    setProcessingOrder(true)

    // Simulación de procesamiento de pedido
    setTimeout(() => {
      // Generar número de orden aleatorio
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
      setOrderNumber(randomOrderNumber)

      // Guardar información del usuario si se seleccionó la opción
      if (formData.guardarInfo) {
        const userData = {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          region: formData.region,
          codigoPostal: formData.codigoPostal,
        }

        localStorage.setItem("userData", JSON.stringify(userData))
      }

      // Limpiar carrito
      localStorage.removeItem("cart")
      localStorage.removeItem("orderInfo")

      setProcessingOrder(false)
      setOrderComplete(true)
    }, 2000)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="py-5">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando información del pedido...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4 p-md-5 text-center">
                    <div className="mb-4">
                      <div
                        className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <i className="bi bi-check-lg fs-1"></i>
                      </div>
                    </div>

                    <h2 className="text-primary mb-3">¡Pedido Completado!</h2>
                    <p className="mb-4">Tu pedido ha sido procesado correctamente.</p>

                    <div className="card bg-light mb-4">
                      <div className="card-body">
                        <h5 className="mb-3">
                          Número de Pedido: <span className="text-primary">{orderNumber}</span>
                        </h5>
                        <p className="mb-0">
                          Hemos enviado un correo electrónico con los detalles de tu compra a{" "}
                          <strong>{formData.email}</strong>
                        </p>
                      </div>
                    </div>

                    <p className="mb-4">
                      Gracias por comprar en EcoMarket. Puedes seguir el estado de tu pedido en la sección "Mis
                      Pedidos".
                    </p>

                    <div className="d-grid gap-3">
                      <button className="btn btn-primary py-2" onClick={() => router.push("/mis-pedidos")}>
                        Ver Mis Pedidos
                      </button>
                      <button className="btn btn-outline-primary py-2" onClick={() => router.push("/")}>
                        Volver a Inicio
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <h1 className="text-primary mb-4">Finalizar Compra</h1>

          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep >= 1 ? "bg-primary" : "bg-light"}`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className={activeStep >= 1 ? "text-white" : "text-muted"}>1</span>
                      </div>
                      <span className="ms-2 fw-bold">Información de Envío</span>
                    </div>
                    <div
                      className="d-none d-md-block"
                      style={{
                        width: "100px",
                        height: "2px",
                        backgroundColor: activeStep >= 2 ? "var(--color-primary)" : "#dee2e6",
                      }}
                    ></div>
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep >= 2 ? "bg-primary" : "bg-light"}`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className={activeStep >= 2 ? "text-white" : "text-muted"}>2</span>
                      </div>
                      <span className="ms-2 fw-bold">Método de Pago</span>
                    </div>
                    <div
                      className="d-none d-md-block"
                      style={{
                        width: "100px",
                        height: "2px",
                        backgroundColor: activeStep >= 3 ? "var(--color-primary)" : "#dee2e6",
                      }}
                    ></div>
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep >= 3 ? "bg-primary" : "bg-light"}`}
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className={activeStep >= 3 ? "text-white" : "text-muted"}>3</span>
                      </div>
                      <span className="ms-2 fw-bold">Revisar y Confirmar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  {activeStep === 1 && (
                    <>
                      <h4 className="mb-4">Información de Envío</h4>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="nombre" className="form-label">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                          />
                          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                        />
                        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">
                          Dirección
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                          id="direccion"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleChange}
                        />
                        {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="ciudad" className="form-label">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.ciudad ? "is-invalid" : ""}`}
                            id="ciudad"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                          />
                          {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
                        </div>

                        <div className="col-md-4 mb-3">
                          <label htmlFor="region" className="form-label">
                            Región
                          </label>
                          <select
                            className={`form-select ${errors.region ? "is-invalid" : ""}`}
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Metropolitana">Metropolitana</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Biobío">Biobío</option>
                            <option value="Otra">Otra</option>
                          </select>
                          {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                        </div>

                        <div className="col-md-2 mb-3">
                          <label htmlFor="codigoPostal" className="form-label">
                            C.P.
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.codigoPostal ? "is-invalid" : ""}`}
                            id="codigoPostal"
                            name="codigoPostal"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                          />
                          {errors.codigoPostal && <div className="invalid-feedback">{errors.codigoPostal}</div>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="notasEntrega" className="form-label">
                          Notas de entrega (opcional)
                        </label>
                        <textarea
                          className="form-control"
                          id="notasEntrega"
                          name="notasEntrega"
                          rows="3"
                          value={formData.notasEntrega}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="guardarInfo"
                          name="guardarInfo"
                          checked={formData.guardarInfo}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="guardarInfo">
                          Guardar esta información para futuras compras
                        </label>
                      </div>
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <h4 className="mb-4">Método de Pago</h4>

                      <div className="mb-4">
                        <div className="form-check mb-3">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="metodoPagoTarjeta"
                            name="metodoPago"
                            value="tarjeta"
                            checked={formData.metodoPago === "tarjeta"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="metodoPagoTarjeta">
                            <i className="bi bi-credit-card me-2"></i>
                            Tarjeta de Crédito/Débito
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="metodoPagoBanco"
                            name="metodoPago"
                            value="banco"
                            checked={formData.metodoPago === "banco"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="metodoPagoBanco">
                            <i className="bi bi-bank me-2 text-banco"></i>
                            BancoSimple
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="metodoPagoTransferencia"
                            name="metodoPago"
                            value="transferencia"
                            checked={formData.metodoPago === "transferencia"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="metodoPagoTransferencia">
                            <i className="bi bi-cash me-2"></i>
                            Transferencia Bancaria
                          </label>
                        </div>
                      </div>

                      {formData.metodoPago === "tarjeta" && (
                        <div className="card border-0 bg-light p-3 mb-3">
                          <div className="mb-3">
                            <label htmlFor="numeroTarjeta" className="form-label">
                              Número de tarjeta
                            </label>
                            <input
                              type="text"
                              className={`form-control ${errors.numeroTarjeta ? "is-invalid" : ""}`}
                              id="numeroTarjeta"
                              name="numeroTarjeta"
                              placeholder="1234 5678 9012 3456"
                              value={formData.numeroTarjeta}
                              onChange={handleChange}
                            />
                            {errors.numeroTarjeta && <div className="invalid-feedback">{errors.numeroTarjeta}</div>}
                          </div>

                          <div className="mb-3">
                            <label htmlFor="nombreTarjeta" className="form-label">
                              Nombre en la tarjeta
                            </label>
                            <input
                              type="text"
                              className={`form-control ${errors.nombreTarjeta ? "is-invalid" : ""}`}
                              id="nombreTarjeta"
                              name="nombreTarjeta"
                              placeholder="NOMBRE APELLIDO"
                              value={formData.nombreTarjeta}
                              onChange={handleChange}
                            />
                            {errors.nombreTarjeta && <div className="invalid-feedback">{errors.nombreTarjeta}</div>}
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="fechaExpiracion" className="form-label">
                                Fecha de expiración
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.fechaExpiracion ? "is-invalid" : ""}`}
                                id="fechaExpiracion"
                                name="fechaExpiracion"
                                placeholder="MM/AA"
                                value={formData.fechaExpiracion}
                                onChange={handleChange}
                              />
                              {errors.fechaExpiracion && (
                                <div className="invalid-feedback">{errors.fechaExpiracion}</div>
                              )}
                            </div>

                            <div className="col-md-6 mb-3">
                              <label htmlFor="cvv" className="form-label">
                                Código de seguridad (CVV)
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                                id="cvv"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleChange}
                              />
                              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.metodoPago === "banco" && (
                        <div className="card border-0 bg-light p-3 mb-3">
                          <div className="text-center">
                            <div className="bg-banco p-2 rounded d-inline-block mb-3">
                              <img src="/placeholder.svg?height=40&width=120" alt="BancoSimple" height="40" />
                            </div>
                            <p>
                              Serás redirigido a la plataforma de BancoSimple para completar el pago de forma segura.
                            </p>
                            <button className="btn btn-banco">
                              <i className="bi bi-bank me-2"></i>
                              Conectar con BancoSimple
                            </button>
                          </div>
                        </div>
                      )}

                      {formData.metodoPago === "transferencia" && (
                        <div className="card border-0 bg-light p-3 mb-3">
                          <h6 className="mb-3">Datos para transferencia:</h6>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-transparent">Banco: Banco de Ejemplo</li>
                            <li className="list-group-item bg-transparent">Tipo de cuenta: Corriente</li>
                            <li className="list-group-item bg-transparent">Número de cuenta: 0000-1111-2222-3333</li>
                            <li className="list-group-item bg-transparent">Titular: EcoMarket SpA</li>
                            <li className="list-group-item bg-transparent">RUT: 76.123.456-7</li>
                            <li className="list-group-item bg-transparent">Email: pagos@ecomarket.com</li>
                          </ul>
                          <p className="mt-3 small text-muted">
                            Una vez realizada la transferencia, envía el comprobante a pagos@ecomarket.com indicando tu
                            número de pedido.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {activeStep === 3 && (
                    <>
                      <h4 className="mb-4">Revisar y Confirmar</h4>

                      <div className="card border-0 bg-light mb-4">
                        <div className="card-body">
                          <h5 className="mb-3">Información de Envío</h5>
                          <p className="mb-1">
                            <strong>Nombre:</strong> {formData.nombre}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong> {formData.email}
                          </p>
                          <p className="mb-1">
                            <strong>Teléfono:</strong> {formData.telefono}
                          </p>
                          <p className="mb-1">
                            <strong>Dirección:</strong> {formData.direccion}
                          </p>
                          <p className="mb-1">
                            <strong>Ciudad:</strong> {formData.ciudad}, {formData.region}, {formData.codigoPostal}
                          </p>
                          {formData.notasEntrega && (
                            <p className="mb-0">
                              <strong>Notas:</strong> {formData.notasEntrega}
                            </p>
                          )}
                          <button className="btn btn-sm btn-outline-primary mt-3" onClick={() => setActiveStep(1)}>
                            Editar
                          </button>
                        </div>
                      </div>

                      <div className="card border-0 bg-light mb-4">
                        <div className="card-body">
                          <h5 className="mb-3">Método de Pago</h5>
                          {formData.metodoPago === "tarjeta" && (
                            <>
                              <p className="mb-1">
                                <strong>Método:</strong> Tarjeta de Crédito/Débito
                              </p>
                              <p className="mb-1">
                                <strong>Número:</strong> **** **** **** {formData.numeroTarjeta.slice(-4)}
                              </p>
                              <p className="mb-1">
                                <strong>Titular:</strong> {formData.nombreTarjeta}
                              </p>
                            </>
                          )}

                          {formData.metodoPago === "banco" && (
                            <p className="mb-1">
                              <strong>Método:</strong> BancoSimple
                            </p>
                          )}

                          {formData.metodoPago === "transferencia" && (
                            <p className="mb-1">
                              <strong>Método:</strong> Transferencia Bancaria
                            </p>
                          )}

                          <button className="btn btn-sm btn-outline-primary mt-3" onClick={() => setActiveStep(2)}>
                            Editar
                          </button>
                        </div>
                      </div>

                      <div className="card border-0 bg-light mb-4">
                        <div className="card-body">
                          <h5 className="mb-3">Productos</h5>
                          {orderInfo.items.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex align-items-center">
                                <img
                                  src={item.imagen || "/placeholder.svg"}
                                  alt={item.nombre}
                                  className="rounded me-3"
                                  width="50"
                                  height="50"
                                  style={{ objectFit: "cover" }}
                                />
                                <div>
                                  <p className="mb-0 fw-bold">{item.nombre}</p>
                                  <small className="text-muted">Cantidad: {item.quantity}</small>
                                </div>
                              </div>
                              <div className="text-end">
                                <p className="mb-0 fw-bold">${(item.precio * item.quantity).toLocaleString("es-CL")}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    {activeStep > 1 ? (
                      <button className="btn btn-outline-secondary" onClick={prevStep}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Anterior
                      </button>
                    ) : (
                      <button className="btn btn-outline-secondary" onClick={() => router.push("/carrito")}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Volver al Carrito
                      </button>
                    )}

                    {activeStep < 3 ? (
                      <button className="btn btn-primary" onClick={nextStep}>
                        Siguiente
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    ) : (
                      <button className="btn btn-primary" onClick={completeOrder} disabled={processingOrder}>
                        {processingOrder ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Procesando...
                          </>
                        ) : (
                          "Confirmar Pedido"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4 sticky-lg-top" style={{ top: "20px" }}>
                <div className="card-header bg-primary-custom text-white py-3">
                  <h5 className="mb-0">Resumen del Pedido</h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    {orderInfo.items.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between mb-2">
                        <span>
                          {item.nombre} x{item.quantity}
                        </span>
                        <span>${(item.precio * item.quantity).toLocaleString("es-CL")}</span>
                      </div>
                    ))}
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${orderInfo.subtotal.toLocaleString("es-CL")}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Envío</span>
                    <span>
                      {orderInfo.envio === 0 ? (
                        <span className="text-success">Gratis</span>
                      ) : (
                        `$${orderInfo.envio.toLocaleString("es-CL")}`
                      )}
                    </span>
                  </div>

                  {orderInfo.descuento > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Descuento</span>
                      <span>-${orderInfo.descuento.toLocaleString("es-CL")}</span>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between mb-0">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold fs-5 text-primary">${orderInfo.total.toLocaleString("es-CL")}</span>
                  </div>
                </div>
              </div>

              {formData.metodoPago === "banco" && (
                <div className="card border-0 shadow-sm bg-banco text-white">
                  <div className="card-body p-3 text-center">
                    <h5 className="mb-2">Beneficio BancoSimple</h5>
                    <p className="mb-0">Obtén un 5% de descuento adicional pagando con BancoSimple</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

