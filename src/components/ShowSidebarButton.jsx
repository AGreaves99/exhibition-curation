import "../styles/showSidebarButton.css";

export const ShowSidebarButton = ({ setSidebarVisible, sidebarVisible }) => {
  const handleClick = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <button class="show-sidebar-button" onClick={handleClick}>
      {sidebarVisible ? "Hide" : "Show"} Collections
    </button>
  );
};
