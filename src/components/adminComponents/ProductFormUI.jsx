import { CATEGORIES } from "../../utils/categories";

export const ProductFormUI = ({
  product,
  errors,
  loading,
  isEditMode = false,
  existingImage = null,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEditMode ? "Editar producto" : "Agregar nuevo producto"}</h2>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Categoría:</label>
          <select name="category" value={product.category} onChange={onChange}>
            <option value="">Seleccioná una categoría</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Imagen:</label>
          {isEditMode && existingImage && (
            <div className="current-image-preview">
              <img src={existingImage} alt="Imagen actual" />
              <p>Imagen actual. Elegí un archivo solo si querés reemplazarla.</p>
            </div>
          )}
          <input type="file" accept="image/*" onChange={onFileChange} />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : isEditMode
              ? "Guardar cambios"
              : "Guardar"}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};