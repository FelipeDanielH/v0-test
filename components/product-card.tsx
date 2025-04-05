import Link from "next/link"

export default function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img src={product.imagen || "/placeholder.svg"} className="card-img-top product-img" alt={product.nombre} />
      <div className="card-body">
        <span className="badge category-badge mb-2">{product.categoria}</span>
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text text-truncate">{product.descripcion}</p>
        <p className="fw-bold text-primary">${product.precio.toLocaleString("es-CL")}</p>
        <div className="d-flex justify-content-between">
          <Link href={`/productos/${product.id}`} className="btn btn-primary">
            Ver Detalles
          </Link>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

