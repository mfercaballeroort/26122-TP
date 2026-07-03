import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
import { CATEGORIES } from "../../utils/categories";
// import styles from "./Nav.module.css";

export const Nav = () => {
  const { getTotalItems } = useCart();

  const totalItems = getTotalItems();

  return (
    <nav>
      {/* <ul className={styles["nav-list"]}> */}
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.slug}>
            <Link to={`/category/${cat.slug}`}>{cat.label}</Link>
          </li>
        ))}
        <li>
          <Link to={"/carrito"}>
            Carrito
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};