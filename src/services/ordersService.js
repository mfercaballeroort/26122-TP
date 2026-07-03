import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const ordersRef = collection(db, "orders");

/* -------------------------------------------------------------------------- */
/*                          CREAR ORDEN (CHECKOUT)                            */
/* -------------------------------------------------------------------------- */
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};