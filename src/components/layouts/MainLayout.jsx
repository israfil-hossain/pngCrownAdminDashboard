import React, { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const { toggleMenu } = useContext(MenuContext);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full overflow-y-auto">
        <Navbar toggleMenu={toggleMenu} />
        <main className="flex-grow ">
          <div className="mx-auto p-6">
          {children}
          </div>
        </main>

      </div>
      
    
      
      
     
    </div>
  );
};

export default MainLayout;
