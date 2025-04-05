export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-secondary mb-3">EcoMarket</h5>
            <p>Tu destino para compras sostenibles y responsables con el medio ambiente.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-youtube fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="text-secondary mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="/productos" className="text-white text-decoration-none">
                  Productos
                </a>
              </li>
              <li className="mb-2">
                <a href="/categorias" className="text-white text-decoration-none">
                  Categorías
                </a>
              </li>
              <li className="mb-2">
                <a href="/vendedores" className="text-white text-decoration-none">
                  Vendedores
                </a>
              </li>
              <li className="mb-2">
                <a href="/sobre-nosotros" className="text-white text-decoration-none">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-secondary mb-3">Ayuda</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/centro-ayuda" className="text-white text-decoration-none">
                  Centro de Ayuda
                </a>
              </li>
              <li className="mb-2">
                <a href="/como-comprar" className="text-white text-decoration-none">
                  Cómo Comprar
                </a>
              </li>
              <li className="mb-2">
                <a href="/envios" className="text-white text-decoration-none">
                  Envíos
                </a>
              </li>
              <li className="mb-2">
                <a href="/devoluciones" className="text-white text-decoration-none">
                  Devoluciones
                </a>
              </li>
              <li className="mb-2">
                <a href="/contacto" className="text-white text-decoration-none">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="text-secondary mb-3">Métodos de Pago</h5>
            <div className="d-flex flex-wrap gap-2">
              <div className="bg-white p-2 rounded">
                <img src="/placeholder.svg?height=30&width=40" alt="Tarjeta de Crédito" height="30" />
              </div>
              <div className="bg-white p-2 rounded">
                <img src="/placeholder.svg?height=30&width=40" alt="Tarjeta de Débito" height="30" />
              </div>
              <div className="bg-banco p-2 rounded">
                <img src="/placeholder.svg?height=30&width=40" alt="BancoSimple" height="30" />
              </div>
            </div>

            <h5 className="text-secondary mb-3 mt-4">Suscríbete</h5>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Tu email" />
              <button className="btn btn-secondary" type="button">
                Enviar
              </button>
            </div>
          </div>
        </div>

        <hr className="mt-4 mb-4 bg-secondary" />

        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">&copy; 2024 EcoMarket. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="/terminos" className="text-white text-decoration-none me-3">
              Términos y Condiciones
            </a>
            <a href="/privacidad" className="text-white text-decoration-none">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

