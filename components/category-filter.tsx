"use client"

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-primary-custom text-white">
        <h5 className="mb-0">Categorías</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          <button
            className={`list-group-item list-group-item-action ${selectedCategory === null ? "active bg-secondary text-white" : ""}`}
            onClick={() => onSelectCategory(null)}
          >
            Todas las categorías
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={`list-group-item list-group-item-action ${selectedCategory === category.id ? "active bg-secondary text-white" : ""}`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

