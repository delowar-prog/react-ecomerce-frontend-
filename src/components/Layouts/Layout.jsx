import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { AppSidebar } from "../Home/AppSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { useState } from "react";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (

      <div className="bg-gradient-to-br from-background to-muted min-h-screen flex flex-col">
        {/* Navbar with Sidebar Trigger */}
        <Navbar />

    

          {/* Main Content */}
          <div className=" container mx-auto px-4 py-8">
            {children }
          </div>

          <Footer/>
        </div>
  
  );
};

export default Layout;
