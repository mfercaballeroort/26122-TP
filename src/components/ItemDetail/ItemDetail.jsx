import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";
import { Count } from "../Count/Count";

export const ItemDetail = ({ item }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Item {...item}>
      <Count
        quantity={quantity}
        onIncrement={increment}
        onDecrement={decrement}
        min={1}
      />
      <button className="btn bg-primary primary" onClick={() => addItem(item, quantity)}>
        Agregar al carrito
      </button>
    </Item>
  );
};