import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";
import { Count } from "../Count/Count";

export const CartItem = ({ item }) => {
  const { removeItem, incrementQuantity, decrementQuantity } = useCart();
  return (
    <Item {...item}>
      <Count
        quantity={item.quantity}
        onIncrement={() => incrementQuantity(item.id)}
        onDecrement={() => decrementQuantity(item.id)}
        min={1}
      />
      <p className="cart-item-subtotal">
        Subtotal: ${item.price * item.quantity}
      </p>
      <button
        className="btn bg-delete primary"
        onClick={() => removeItem(item.id)}
      >
        Eliminar
      </button>
    </Item>
  );
};