import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/ordersService";

/* -------------------------------------------------------------------------- */
/*                              CREAMOS CONTEXTO                              */
/* -------------------------------------------------------------------------- */
const CartContext = createContext();

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM HOOK                                */
/* -------------------------------------------------------------------------- */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

const CART_STORAGE_KEY = "michi-market-cart";

// Lee el carrito guardado en localStorage (si existe) para que no se pierda al recargar la página
const getInitialCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error al leer el carrito guardado:", error);
    return [];
  }
};

/* -------------------------------------------------------------------------- */
/*                                  PROVEEDOR                                 */
/* -------------------------------------------------------------------------- */
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getInitialCart);
  const [checkingOut, setCheckingOut] = useState(false);

  // Cada vez que cambia el carrito, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  //Evalua existencia:  retorna un booleano
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  //Agregar al carrito. Si ya existe, suma la cantidad en vez de bloquear.
  const addItem = (item, quantity = 1) => {
    if (isInCart(item)) {
      setCart((prevCart) =>
        prevCart.map((element) =>
          element.id === item.id
            ? { ...element, quantity: element.quantity + quantity }
            : element,
        ),
      );
      alert("Se actualizó la cantidad en el carrito 🎉");
      return;
    }

    setCart((prevCart) => [...prevCart, { ...item, quantity }]);
    alert("Producto agregado al carrito 🎉");
  };

  //Eliminar del carrito
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((element) => element.id !== id));
    alert("Producto eliminado ✅");
  };

  //Sumar/restar cantidad de un producto ya en el carrito
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((element) =>
        element.id === id
          ? { ...element, quantity: element.quantity + 1 }
          : element,
      ),
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((element) =>
        element.id === id && element.quantity > 1
          ? { ...element, quantity: element.quantity - 1 }
          : element,
      ),
    );
  };

  //Vacia el carrito
  const clearCart = () => {
    setCart([]);
  };

  //Total de unidades en carrito (ahora suma cantidades, no solo productos distintos)
  const getTotalItems = () => {
    return cart.reduce((acc, element) => acc + element.quantity, 0);
  };

  //Total a pagar
  const getCartTotal = () => {
    return cart.reduce(
      (acc, element) => acc + element.price * element.quantity,
      0,
    );
  };

  //Checkout: guarda la orden en Firestore y vacía el carrito
  const checkout = async () => {
    if (cart.length === 0) return;

    setCheckingOut(true);
    try {
      await createOrder({
        items: cart,
        total: getCartTotal(),
      });
      alert("Su compra ha sido realizada 🎉");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Hubo un error al procesar la compra. Intentá de nuevo.");
    } finally {
      setCheckingOut(false);
    }
  };

  const values = {
    cart,
    addItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    getTotalItems,
    getCartTotal,
    clearCart,
    checkout,
    checkingOut,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};