import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/productsService";
import "./ProductListAdmin.css";

export const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `¿Seguro que querés eliminar "${name}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Hubo un error al eliminar el producto");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="product-list-admin">
      <header className="product-list-admin-header">
        <h2>Gestionar productos</h2>
        <div className="header-actions">
          <Link className="btn primary" to="/admin/products/new">
            ➕ Cargar nuevo
          </Link>
          <Link className="btn" to="/admin/dashboard">
            ⬅ Volver al panel
          </Link>
        </div>
      </header>

      {loading && <p>Cargando productos...</p>}

      {!loading && products.length === 0 && (
        <p>Todavía no hay productos cargados.</p>
      )}

      <div className="product-list-admin-grid">
        {products.map((product) => (
          <article className="product-admin-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="category">{product.category}</p>

            <div className="product-admin-actions">
              <Link className="btn" to={`/admin/products/edit/${product.id}`}>
                ✏️ Modificar
              </Link>
              <button
                className="btn bg-delete"
                type="button"
                onClick={() => handleDelete(product.id, product.name)}
                disabled={deletingId === product.id}
              >
                {deletingId === product.id ? "Eliminando..." : "🗑️ Eliminar"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};