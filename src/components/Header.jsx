import { useLocation } from "preact-iso";
import "../styles/header.css";

export function Header() {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <a href="/" class={url == "/" && "active"}>
          Home
        </a>
        <a href="/collections" class={url == "/collections" && "active"}>
          My Collections
        </a>
      </nav>
    </header>
  );
}
