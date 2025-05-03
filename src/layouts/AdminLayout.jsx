import { Outlet } from "react-router";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";


const AdminLayout = () => {

  return (
    <>
      <Sidebar />
      <div className="px-4 lg:ml-64">
        <Header />

        <div className="mt-5">
          <Outlet />   
        </div>
     
       
      </div>

    </>
  );
};
export default AdminLayout;
