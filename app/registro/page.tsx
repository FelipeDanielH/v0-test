"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    tipo: "comprador",
    terminos: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.email) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Guardar token en localStorage (simulado)
      localStorage.setItem("userToken", "fake-jwt-token")

      // Redireccionar al usuario
      router.push("/")
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      setErrors({ general: "Error al registrar usuario. Intente nuevamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="text-primary fw-bold">Crear Cuenta</h2>
                    <p className="text-muted">Únete a EcoMarket y comienza a comprar de manera sostenible</p>
                  </div>

                  {errors.general && (
                    <div className="alert alert-danger" role="alert">
                      {errors.general}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        placeholder="nombre@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? "is-invalid" : ""}`}
                          id="password"
                          name="password"
                          placeholder="Crea una contraseña"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirmar contraseña
                        </label>
                        <input
                          type="password"
                          className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Tipo de cuenta</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tipo"
                            id="tipoComprador"
                            value="comprador"
                            checked={formData.tipo === "comprador"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="tipoComprador">
                            Comprador
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="tipo"
                            id="tipoVendedor"
                            value="vendedor"
                            checked={formData.tipo === "vendedor"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="tipoVendedor">
                            Vendedor
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 form-check">
                      <input
                        type="checkbox"
                        className={`form-check-input ${errors.terminos ? "is-invalid" : ""}`}
                        id="terminos"
                        name="terminos"
                        checked={formData.terminos}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="terminos">
                        Acepto los{" "}
                        <Link href="/terminos" className="text-decoration-none">
                          términos y condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link href="/privacidad" className="text-decoration-none">
                          política de privacidad
                        </Link>
                      </label>
                      {errors.terminos && <div className="invalid-feedback">{errors.terminos}</div>}
                    </div>

                    <div className="d-grid mb-3">
                      <button type="submit" className="btn btn-primary py-2" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Creando cuenta...
                          </>
                        ) : (
                          "Crear Cuenta"
                        )}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="mb-0">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-decoration-none fw-bold">
                          Iniciar Sesión
                        </Link>
                      </p>
                    </div>
                  </form>
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

