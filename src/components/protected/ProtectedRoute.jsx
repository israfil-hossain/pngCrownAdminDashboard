import React from 'react'
import { Navigate  } from "react-router-dom"; 
import MainLayout from '../layouts/MainLayout';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token"); 
 return token ? (
  <MainLayout>{children}</MainLayout>
 ): <Navigate to="/login" /> ; 
}

export default ProtectedRoute;
