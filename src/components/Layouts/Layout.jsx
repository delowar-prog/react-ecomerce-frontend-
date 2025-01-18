import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { AppSidebar } from "../Home/AppSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="bg-gradient-to-br from-background to-muted min-h-screen flex flex-col">
        {/* Navbar with Sidebar Trigger */}
        <Navbar />

        {/* Content Section */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div >
          <AppSidebar className="" />
          </div>

          {/* Main Content */}
          <div className="flex-1 container mx-auto px-4 py-8">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
