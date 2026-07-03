import { Link, useParams } from "react-router-dom";

export const ProductSuccess = () => {
  const { id } = useParams();

  return (
    <section className="success-page">
      <div className="success-icon">✅</div>

      <h2>Producto cargado con exito</h2>
      <p>ID de producto: {id}</p>
      <p>¿Qué querés hacer ahora?</p>

      <div className="success-actions">
        <Link className="btn bg-primary primary" to="/admin/products/new">
          ➕ Agregar otro producto
        </Link>
        <Link className="btn primary" to="/admin/products">
          📋 Ver productos
        </Link>
        <Link className="btn primary" to="/admin/dashboard">
          🏠 Volver al panel
        </Link>
      </div>
    </section>
  );
};