import React from "react"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import MainLayout from "./layouts/MainLayout";

import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./client/pages/HomePage";
import BusinessPage from "./client/pages/BusinessPage";
import NotFoundPage from "./client/pages/NotFoundPage";
import PersonalPage from "./client/pages/PersonalPage";
import DriverPage from "./client/pages/DriverPage";
import TeamPage from "./client/pages/TeamPage";
import AboutPage from "./client/pages/AboutPage";

import DashboardPage from "./admin/pages/DashboardPage"
import  DeliveriesPage from "./admin/pages/DeliveriesPage"
import DriversPage from "./admin/pages/DriversPage"
import CustomersPage from "./admin/pages/CustomersPage"
import NotificationsPage from "./admin/pages/NotificationsPage"
import ReportingsPage from "./admin/pages/ReportingsPage"
import SettingsPage from "./admin/pages/SettingsPage"
import ProfilePage from "./admin/pages/ProfilePage"
import UserManagementPage from "./admin/pages/UserManagementPage"

import Login from "./auth/Login"
import Register from "./auth/Register"

function App() {
  const router  = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      
      <Route path="/" element={<ClientLayout/>} > 
        <Route index element={<HomePage/>}/>
        <Route path="/business" element={<BusinessPage/>}/>
        <Route path="/personal" element={<PersonalPage/>} />
        <Route path="/driver" element={<DriverPage/>} />
        <Route path="/team" element={<TeamPage/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Route>

      <Route path='/admin' element={<AdminLayout/>}>
        <Route index element={<DashboardPage />}/>
        <Route path="/admin/deliveries" element={<DeliveriesPage />}/>
        <Route path="/admin/drivers" element={<DriversPage />}/>
        <Route path="/admin/customers" element={<CustomersPage />}/>
        <Route path="/admin/notifications" element={<NotificationsPage />}/>
        <Route path="/admin/reportings" element={<ReportingsPage />}/>
        <Route path="/admin/settings" element={<SettingsPage />}/>
        <Route path="/admin/profile" element={<ProfilePage />}/>
        <Route path="/admin/userManagement" element={<UserManagementPage />}/>
        <Route path="/admin/deliveries" element={<DeliveriesPage />}/>
      </Route>

      <Route path="/" element={<AuthLayout />} >
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Route>

      <Route path="*" element={<NotFoundPage/>}/>  
    </Route> 
    

  
    )
  );


  return <RouterProvider router={router} />;
}

export default App
