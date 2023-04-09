import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./page/User";
import Dashboard from "./page/Dashboard";
import Activity from "./page/Activity";
import Slider from "./page/Slider";
import Category from "./page/Category";
import Image from "./page/Image";

import Signin from "./page/Signin";
import ProtectedRoute from "./components/protected/ProtectedRoute";




const App = () => {
  return (
    
      <Routes>
        
        {/* Dashboard */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />

        <Route path="/login" element={<Signin /> } />

        {/* Slider */}
        <Route path="/slider" element={<ProtectedRoute><Slider /></ProtectedRoute>} />
        <Route path="/slider/:id" element={<ProtectedRoute><Slider /></ProtectedRoute>} />

        {/* Category */}
        <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />

        {/* Image */}
        <Route path="/addimage" element={<ProtectedRoute><Image /></ProtectedRoute>} />
        <Route path="/addimage/add" element={<ProtectedRoute><Image /></ProtectedRoute>} />
        <Route path="/addimage/edit/:id" element={<ProtectedRoute><Image /></ProtectedRoute>} />

        {/* Users */}
        <Route path="/users" element={<ProtectedRoute><User/></ProtectedRoute>} />
        <Route path="/users/edit" element={<ProtectedRoute><User/></ProtectedRoute>} />
 
        {/* Activity */}
        <Route path="/activity" element={<ProtectedRoute><Activity/></ProtectedRoute>} />

        {/* Quiz */}
        {/* <Route path="/quiz" element={<Quiz/>} /> */}

        
      </Routes>
   
  );
};

export default App;
