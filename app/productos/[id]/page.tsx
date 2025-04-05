"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductoDetalle({ params }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    // Simulación de carga de datos desde la API
    setTimeout(() => {
      // Producto de ejemplo
      const demoProduct = {
        id: Number.parseInt(id),
        nombre: "Cargador Solar Portátil",
        descripcion:
          "Cargador solar para dispositivos móviles, fabricado con materiales reciclados. Ideal para viajes y actividades al aire libre. Incluye múltiples conectores para diferentes dispositivos. Capacidad de 10,000mAh.",
        precio: 29990,
        stock: 50,
        categoria_id: 1,
        categoria: "Electrónica Sostenible",
        vendedor: {
          id: 1,
          nombre: "EcoTech Solutions",
          calificacion: 4.8,
        },
        imagenes: [
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500",
          "/placeholder.svg?height=500&width=500",
        ],
        especificaciones: [
          { nombre: "Material", valor: "Plástico reciclado y silicona" },
          { nombre: "Capacidad", valor: "10,000mAh" },
          { nombre: "Entradas", valor: "USB-C, Micro USB" },
          { nombre: "Salidas", valor: "2x USB-A, 1x USB-C" },
          { nombre: "Dimensiones", valor: "14 x 7 x 1.5 cm" },
          { nombre: "Peso", valor: "240g" },
        ],
        calificacion: 4.5,
        numeroReseñas: 28,
      }

      setProduct(demoProduct)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < (product?.stock || 1)) {
      setQuantity(quantity + 1)
    }
  }

  const addToCart = () => {
    setAddingToCart(true)

    // Simulación de agregar al carrito
    setTimeout(() => {
      // Obtener carrito actual
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Verificar si el producto ya está en el carrito
      const existingProductIndex = currentCart.findIndex((item) => item.id === product.id)

      if (existingProductIndex >= 0) {
        // Actualizar cantidad si ya existe
        currentCart[existingProductIndex].quantity += quantity
      } else {
        // Agregar nuevo producto
        currentCart.push({
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagenes[0],
          quantity: quantity,
        })
      }

      // Guardar carrito actualizado
      localStorage.setItem("cart", JSON.stringify(currentCart))

      setAddingToCart(false)

      // Mostrar alerta de éxito
      alert("Producto agregado al carrito")
    }, 800)
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
              <p className="mt-3">Cargando detalles del producto...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="py-5">
          <div className="container">
            <div className="alert alert-warning" role="alert">
              Producto no encontrado
            </div>
            <button className="btn btn-primary mt-3" onClick={() => router.push("/productos")}>
              Volver a Productos
            </button>
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
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Inicio</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/productos">Productos</a>
              </li>
              <li className="breadcrumb-item">
                <a href={`/categorias/${product.categoria_id}`}>{product.categoria}</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.nombre}
              </li>
            </ol>
          </nav>

          <div className="row">
            {/* Galería de imágenes */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <img
                    src={product.imagenes[activeImage] || "/placeholder.svg"}
                    alt={product.nombre}
                    className="img-fluid rounded"
                  />
                </div>
              </div>

              <div className="d-flex mt-3 gap-2">
                {product.imagenes.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border rounded p-1 ${activeImage === index ? "border-primary" : ""}`}
                    onClick={() => setActiveImage(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.nombre} - Imagen ${index + 1}`}
                      className="img-fluid"
                      width="80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="col-md-6">
              <h1 className="text-primary mb-2">{product.nombre}</h1>

              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${i < Math.floor(product.calificacion) ? "bi-star-fill" : i < product.calificacion ? "bi-star-half" : "bi-star"} text-warning`}
                    ></i>
                  ))}
                  <span className="ms-2 text-muted">({product.numeroReseñas} reseñas)</span>
                </div>
                <span className="badge bg-secondary">{product.categoria}</span>
              </div>

              <h2 className="fs-3 fw-bold mb-3">${product.precio.toLocaleString("es-CL")}</h2>

              <p className="mb-4">{product.descripcion}</p>

              <div className="d-flex align-items-center mb-4">
                <div className="me-3">
                  <label htmlFor="quantity" className="form-label mb-0">
                    Cantidad:
                  </label>
                </div>
                <div className="input-group" style={{ width: "150px" }}>
                  <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>
                    <i className="bi bi-dash"></i>
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <div className="ms-3">
                  <span
                    className={`badge ${product.stock > 10 ? "bg-success" : product.stock > 0 ? "bg-warning" : "bg-danger"}`}
                  >
                    {product.stock > 10 ? "En stock" : product.stock > 0 ? "Pocas unidades" : "Agotado"}
                  </span>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex mb-4">
                <button
                  className="btn btn-primary py-2 px-4"
                  onClick={addToCart}
                  disabled={addingToCart || product.stock === 0}
                >
                  {addingToCart ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Agregando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-cart-plus me-2"></i>
                      Agregar al Carrito
                    </>
                  )}
                </button>
                <button className="btn btn-outline-secondary py-2 px-4">
                  <i className="bi bi-heart me-2"></i>
                  Agregar a Favoritos
                </button>
              </div>

              <div className="card border-0 bg-light mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={product.vendedor.nombre}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h5 className="mb-0">{product.vendedor.nombre}</h5>
                      <div>
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span>{product.vendedor.calificacion}</span>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-outline-primary ms-auto">Ver Perfil</button>
                  </div>
                  <button className="btn btn-outline-secondary w-100">
                    <i className="bi bi-chat-dots me-2"></i>
                    Contactar Vendedor
                  </button>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-truck text-secondary me-2 fs-5"></i>
                  <span>Envío a todo el país</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-check text-secondary me-2 fs-5"></i>
                  <span>Garantía de 12 meses</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-arrow-return-left text-secondary me-2 fs-5"></i>
                  <span>Devolución gratuita por 30 días</span>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <span className="me-3">Pagar con:</span>
                <div className="d-flex gap-2">
                  <img src="/placeholder.svg?height=30&width=40" alt="Tarjeta de Crédito" height="30" />
                  <img src="/placeholder.svg?height=30&width=40" alt="Tarjeta de Débito" height="30" />
                  <div className="bg-banco p-1 rounded">
                    <img src="/placeholder.svg?height=30&width=40" alt="BancoSimple" height="30" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Especificaciones y Reseñas */}
          <div className="row mt-5">
            <div className="col-12">
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="specs-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#specs"
                    type="button"
                    role="tab"
                    aria-controls="specs"
                    aria-selected="true"
                  >
                    Especificaciones
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="reviews-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#reviews"
                    type="button"
                    role="tab"
                    aria-controls="reviews"
                    aria-selected="false"
                  >
                    Reseñas
                  </button>
                </li>
              </ul>
              <div className="tab-content p-4 border border-top-0 rounded-bottom" id="productTabsContent">
                <div className="tab-pane fade show active" id="specs" role="tabpanel" aria-labelledby="specs-tab">
                  <h4 className="mb-4">Especificaciones Técnicas</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        {product.especificaciones.map((spec, index) => (
                          <tr key={index}>
                            <th style={{ width: "30%" }}>{spec.nombre}</th>
                            <td>{spec.valor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                  <h4 className="mb-4">Reseñas de Clientes</h4>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <h5 className="mb-0">Calificación General</h5>
                        <div className="fs-1 fw-bold text-primary">{product.calificacion}</div>
                        <div>
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${i < Math.floor(product.calificacion) ? "bi-star-fill" : i < product.calificacion ? "bi-star-half" : "bi-star"} text-warning`}
                            ></i>
                          ))}
                        </div>
                        <div className="text-muted">{product.numeroReseñas} reseñas</div>
                      </div>
                      <div className="ms-auto">
                        <button className="btn btn-primary">Escribir una Reseña</button>
                      </div>
                    </div>
                  </div>

                  {/* Reseñas de ejemplo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex mb-3">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="Usuario"
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h5 className="mb-0">Carlos Mendoza</h5>
                          <div className="text-muted mb-2">Hace 2 semanas</div>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`bi ${i < 5 ? "bi-star-fill" : "bi-star"} text-warning`}></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <h6 className="mb-2">Excelente producto, muy útil</h6>
                      <p>
                        Lo he usado en mis viajes de camping y funciona perfectamente. La batería dura lo que promete y
                        la carga solar es eficiente. Muy recomendable para quienes disfrutan de actividades al aire
                        libre.
                      </p>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex mb-3">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="Usuario"
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h5 className="mb-0">Ana Martínez</h5>
                          <div className="text-muted mb-2">Hace 1 mes</div>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`bi ${i < 4 ? "bi-star-fill" : "bi-star"} text-warning`}></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <h6 className="mb-2">Buena relación calidad-precio</h6>
                      <p>
                        El cargador funciona bien, aunque la carga solar es un poco lenta en días nublados. La capacidad
                        es suficiente para cargar mi teléfono varias veces. Los materiales se sienten de buena calidad.
                      </p>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex mb-3">
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt="Usuario"
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h5 className="mb-0">Miguel Sánchez</h5>
                          <div className="text-muted mb-2">Hace 2 meses</div>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`bi ${i < 3 ? "bi-star-fill" : "bi-star"} text-warning`}></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <h6 className="mb-2">Cumple su función</h6>
                      <p>
                        Es un producto básico que cumple con lo que promete. Me hubiera gustado que incluyera más
                        adaptadores. La carga solar funciona, pero es bastante lenta comparada con la carga por USB.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Paginación de reseñas">
                      <ul className="pagination">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                            Anterior
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Siguiente
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          <div className="mt-5">
            <h3 className="text-primary mb-4">Productos Relacionados</h3>
            <div className="row">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="col-md-3 col-sm-6 mb-4">
                  <div className="card h-100">
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      className="card-img-top product-img"
                      alt={`Producto relacionado ${item}`}
                    />
                    <div className="card-body">
                      <span className="badge category-badge mb-2">Electrónica Sostenible</span>
                      <h5 className="card-title">Producto Relacionado {item}</h5>
                      <p className="card-text text-truncate">Descripción breve del producto relacionado.</p>
                      <p className="fw-bold text-primary">${(19990 + item * 1000).toLocaleString("es-CL")}</p>
                      <div className="d-flex justify-content-between">
                        <a href="#" className="btn btn-primary btn-sm">
                          Ver Detalles
                        </a>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

