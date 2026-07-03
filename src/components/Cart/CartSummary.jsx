import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, checkout, checkingOut } = useCart();

  const total = getCartTotal();

  return (
    <>
      <p>TOTAL A PAGAR: 👉 ${total}</p>
      <button
        className="btn bg-success primary"
        onClick={checkout}
        disabled={checkingOut}
      >
        {checkingOut ? "Procesando..." : "FINALIZAR COMPRA"}
      </button>
    </>
  );
};