import { useLocation } from "preact-iso";
import "../styles/header.css";

export const Header = () => {
  const { url } = useLocation();

  return (
    <header class="header">
      <nav class="nav">
        <a href="/" class={url == "/" && "active"}>
          Home
        </a>
        <h1 class="header-title">Exhibition Curation</h1>
        <a href="/collections" class={url == "/collections" && "active"}>
          My Collections
        </a>
      </nav>
    </header>
  );
};
