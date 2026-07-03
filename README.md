# 🐱 Michi Market

E-commerce de productos para gatos desarrollado como Trabajo Práctico para **Talento Tech**. Permite a cualquier visitante explorar y comprar productos felinos (bebederos, casitas, juguetes, etc.), y a un usuario administrador gestionar el catálogo completo.

## 🔗 Demo en vivo

[https://talento-tech-proyecto-react-mfc26122.netlify.app/ ]

## ✨ Funcionalidades

### Tienda pública

- Catálogo de productos filtrable por categoría (Alimentación, Descanso, Juguetes, Higiene, Accesorios)
- Detalle de producto individual
- Carrito de compras con selector de cantidad por producto
- El carrito persiste en el navegador (no se pierde al recargar la página)
- Checkout que guarda la orden de compra en la base de datos

### Panel de administración (`/admin`)

- Login protegido con Firebase Authentication
- Dashboard con accesos rápidos
- Alta de productos (con carga de imagen)
- Listado, edición y eliminación de productos
- Rutas protegidas: solo un usuario autenticado puede acceder a `/admin`

## 🛠️ Stack tecnológico

- **React 19** + **Vite** — librería UI y bundler
- **React Router 7** — ruteo y rutas protegidas
- **Firebase Authentication** — login del panel de administración
- **Cloud Firestore** — base de datos de productos y órdenes de compra
- **ImgBB API** — hosting de las imágenes de producto
- **Context API** — manejo de estado global (carrito y sesión)

## 📂 Estructura del proyecto
src/
├── components/
│   ├── adminComponents/   # Dashboard, alta/edición/listado de productos
│   ├── Cart/               # Carrito de compras
│   ├── Item, ItemList,     # Tarjetas y listados de producto
│   │   ItemDetail...
│   ├── Login/               # Formulario de login
│   ├── Nav, Header, Footer  # Layout general
│   └── ProtectedRoute/     # Guard de rutas privadas
├── context/                 # AuthContext y CartContext
├── firebase/                # Configuración e inicialización de Firebase
├── layouts/                 # PublicLayout y AdminLayout
├── services/                 # Llamadas a Firestore y a ImgBB
└── utils/                    # Validaciones y categorías

## 🚀 Cómo correrlo localmente

### 1. Cloná el repositorio

```bash
git clone https://github.com/mfercaballeroort/26122-TP.git
cd 26122-TP
```

### 2. Instalá las dependencias

```bash
npm install
```

### 3. Variables de entorno

Creá un archivo `.env` en la raíz del proyecto (junto a `package.json`) con tu propia API key de [ImgBB](https://api.imgbb.com/):
VITE_IMGBB_KEY=tu_api_key_de_imgbb

> Podés usar `.env.example` como referencia.

### 4. Correr en modo desarrollo

```bash
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### 5. Usuario administrador

Para entrar al panel (`/admin/login`) necesitás un usuario creado en **Firebase Authentication** del proyecto. El usuario de prueba solicitado por la cátedra es:
Email:    admin@admin.com
Password: admin123

## ☁️ Despliegue

El proyecto está desplegado en **Netlify**, con despliegue continuo: cada `git push` a la rama `master` dispara automáticamente un build y una publicación nueva.

La variable `VITE_IMGBB_KEY` debe configurarse también en Netlify (**Site configuration → Environment variables**), ya que el archivo `.env` no se sube al repositorio por seguridad.

## 📌 Estado / posibles mejoras a futuro

- Reemplazar los `alert()`/`confirm()` del navegador por notificaciones más prolijas
- Sumar un historial de órdenes visible desde el panel de administración
- Mejorar el diseño visual general (colores, tipografías, imagen de portada)

## 👩‍💻 Autora

Desarrollado por María Fernanda Caballero — Talento Tech, Comisión 26122.

