"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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

    if (!formData.email) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulación de login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Guardar token en localStorage (simulado)
      localStorage.setItem("userToken", "fake-jwt-token")

      // Redireccionar al usuario
      router.push("/")
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      setErrors({ general: "Error al iniciar sesión. Intente nuevamente." })
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
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="text-primary fw-bold">Iniciar Sesión</h2>
                    <p className="text-muted">Accede a tu cuenta de EcoMarket</p>
                  </div>

                  {errors.general && (
                    <div className="alert alert-danger" role="alert">
                      {errors.general}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
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

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Recordar mi sesión
                      </label>
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
                            Iniciando sesión...
                          </>
                        ) : (
                          "Iniciar Sesión"
                        )}
                      </button>
                    </div>

                    <div className="text-center mb-3">
                      <Link href="/recuperar-password" className="text-decoration-none">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <div className="text-center">
                      <p className="mb-0">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/registro" className="text-decoration-none fw-bold">
                          Regístrate
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card mt-4 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="text-banco mb-3">Paga con BancoSimple</h5>
                    <p className="text-muted mb-3">Disfruta de beneficios exclusivos al pagar con BancoSimple</p>
                    <button className="btn btn-banco">
                      <i className="bi bi-bank me-2"></i>
                      Conectar con BancoSimple
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

