import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDarkMode from "../client/hooks/useDarkMode"

const MainLayout = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <Outlet context={{ darkMode, toggleDarkMode }} />
      <ToastContainer />
    </div>
  );
};

export default MainLayout; 
