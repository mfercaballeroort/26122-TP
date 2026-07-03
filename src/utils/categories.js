// Fuente única de verdad para las categorías de productos.
// El "slug" es lo que se guarda en Firestore y se usa en la URL (sin espacios, minúscula, sin tildes).
// El "label" es lo que se muestra al usuario.
export const CATEGORIES = [
  { slug: "alimentacion", label: "Alimentación" },
  { slug: "descanso", label: "Descanso" },
  { slug: "juguetes", label: "Juguetes" },
  { slug: "higiene", label: "Higiene" },
  { slug: "accesorios", label: "Accesorios" },
];