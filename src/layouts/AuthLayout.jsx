import { Outlet, useOutletContext } from "react-router-dom";

const AuthLayout = () => {
  const { darkMode } = useOutletContext();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
