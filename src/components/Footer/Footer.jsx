import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <p>🐾 Hecho con amor para los gatitos</p>
      <nav>
        <ul className="nav-list">
          <li>Whatsapp</li>
          <li>Instagram</li>
          <li>
            <Link to="/admin/login">Admin</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};