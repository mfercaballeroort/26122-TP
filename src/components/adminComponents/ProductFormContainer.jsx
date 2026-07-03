import { useNavigate, useParams } from "react-router-dom";
import "./ProductFormContainer.css";
import { useEffect, useState } from "react";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../services/productsService";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditMode);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // Si venimos a editar, traemos el producto y precargamos el formulario
  useEffect(() => {
    if (!isEditMode) return;

    getProductById(id).then((data) => {
      if (!data) {
        setErrors({ general: "No se encontró el producto a editar" });
        setLoadingProduct(false);
        return;
      }
      setProduct({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        description: data.description || "",
      });
      setExistingImage(data.image || null);
      setLoadingProduct(false);
    });
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //modificamos los estados para el "loading mientras se procesa"
    setErrors({});
    setLoading(true);

    //validar (existingImage permite que en edición no sea obligatorio subir una imagen nueva)
    const newErrors = validateProduct({ ...product, file, existingImage });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      //si eligió una imagen nueva la subimos, sino mantenemos la que ya tenía
      const imageUrl = file ? await uploadImage(file) : existingImage;

      //armar el producto completo
      const productData = {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };

      if (isEditMode) {
        //modificación
        await updateProduct(id, productData);
        navigate("/admin/products", { replace: true });
      } else {
        //alta
        const newId = await createProduct(productData);

        //vaciar
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);
        navigate(`/admin/products/success/${newId}`, { replace: true });
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) return <p>Cargando producto...</p>;

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      isEditMode={isEditMode}
      existingImage={existingImage}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};