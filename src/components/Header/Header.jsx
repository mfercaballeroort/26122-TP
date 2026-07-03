import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";

import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <span className="logo-emoji" role="img" aria-label="gato">
            🐱
          </span>
          <span>Michi Market</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};