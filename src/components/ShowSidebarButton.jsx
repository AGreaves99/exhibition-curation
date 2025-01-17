import "../styles/showSidebarButton.css";

export function ShowSidebarButton({ setSidebarVisible, sidebarVisible }) {
  function handleClick() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <button class="show-sidebar-button" onClick={handleClick}>
      {sidebarVisible ? "Hide" : "Show"} Collections
    </button>
  );
}
