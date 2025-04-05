"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import CategoryFilter from "@/components/category-filter"

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Datos de ejemplo para demostración
  useEffect(() => {
    // Simular carga de datos desde la API
    setTimeout(() => {
      const demoCategories = [
        { id: 1, nombre: "Electrónica Sostenible" },
        { id: 2, nombre: "Hogar Ecológico" },
        { id: 3, nombre: "Moda Sustentable" },
        { id: 4, nombre: "Alimentación Orgánica" },
        { id: 5, nombre: "Cuidado Personal" },
      ]

      const demoProducts = [
        {
          id: 1,
          nombre: "Cargador Solar Portátil",
          descripcion: "Cargador solar para dispositivos móviles, fabricado con materiales reciclados.",
          precio: 29990,
          categoria_id: 1,
          categoria: "Electrónica Sostenible",
          imagen: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 2,
          nombre: "Set de Utensilios de Bambú",
          descripcion: "Juego de utensilios de cocina hechos de bambú 100% biodegradable.",
          precio: 15990,
          categoria_id: 2,
          categoria: "Hogar Ecológico",
          imagen: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 3,
          nombre: "Camiseta de Algodón Orgánico",
          descripcion: "Camiseta fabricada con algodón orgánico certificado, teñido natural.",
          precio: 19990,
          categoria_id: 3,
          categoria: "Moda Sustentable",
          imagen: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 4,
          nombre: "Café Orgánico de Comercio Justo",
          descripcion: "Café de especialidad cultivado sin pesticidas, comercio justo certificado.",
          precio: 8990,
          categoria_id: 4,
          categoria: "Alimentación Orgánica",
          imagen: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 5,
          nombre: "Jabón Artesanal Natural",
          descripcion: "Jabón elaborado con ingredientes naturales y aceites esenciales.",
          precio: 5990,
          categoria_id: 5,
          categoria: "Cuidado Personal",
          imagen: "/placeholder.svg?height=300&width=300",
        },
        {
          id: 6,
          nombre: "Audífonos Reciclados",
          descripcion: "Audífonos fabricados con plástico reciclado y materiales sostenibles.",
          precio: 45990,
          categoria_id: 1,
          categoria: "Electrónica Sostenible",
          imagen: "/placeholder.svg?height=300&width=300",
        },
      ]

      setCategories(demoCategories)
      setProducts(demoProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria_id === selectedCategory)
    : products

  return (
    <>
      <Navbar />
      <main>
        {/* Banner principal */}
        <div className="bg-primary-custom text-white py-5 mb-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="display-4 fw-bold">EcoMarket</h1>
                <p className="lead">Tu destino para compras sostenibles y responsables con el medio ambiente.</p>
                <Link href="/productos" className="btn btn-light btn-lg mt-3">
                  Explorar Productos
                </Link>
              </div>
              <div className="col-md-6 text-center">
                <img src="/placeholder.svg?height=300&width=500" alt="EcoMarket Banner" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Categorías y Productos */}
        <div className="container mb-5">
          <h2 className="text-primary mb-4">Productos Destacados</h2>

          <div className="row">
            <div className="col-md-3 mb-4">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <div className="col-md-9">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-md-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Beneficios */}
        <div className="bg-light-gray py-5">
          <div className="container">
            <h2 className="text-center text-primary mb-5">¿Por qué elegir EcoMarket?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-leaf fs-1 text-secondary"></i>
                    </div>
                    <h3 className="card-title h5">Productos Sostenibles</h3>
                    <p className="card-text">
                      Todos nuestros productos son seleccionados por su compromiso con la sostenibilidad y el medio
                      ambiente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-shield-check fs-1 text-secondary"></i>
                    </div>
                    <h3 className="card-title h5">Compras Seguras</h3>
                    <p className="card-text">
                      Integración con BancoSimple para garantizar transacciones seguras y protegidas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-truck fs-1 text-secondary"></i>
                    </div>
                    <h3 className="card-title h5">Envío Responsable</h3>
                    <p className="card-text">
                      Utilizamos embalajes reciclables y optimizamos rutas para reducir nuestra huella de carbono.
                    </p>
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

