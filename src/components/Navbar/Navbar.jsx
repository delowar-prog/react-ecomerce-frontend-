import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ghost, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import { MdSearch } from "react-icons/md";
import { Input } from "../ui/input";
import { MdOutlineCancel } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { FaSliders } from "react-icons/fa6"; 
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../context/AuthProvider";
import { SidebarTrigger } from "../ui/sidebar"; 
import { Button } from "../ui/button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const {showIn, setShowIn, auth, logout,cartCount} = useContext(AuthContext);
  const[showProfile, setShowProfile] = useState(false);

  const dark = theme === "dark";

  return (
    <div className="sticky z-50 py-2 top-0 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto container flex justify-between items-center h-16 px-4 relative">
        <h1>logo</h1>
    
        <div className="flex-1 flex justify-center items-center">
          <div className="flex gap-4 justify-between items-center text-base">
            <Link to="/">Home</Link>
            <Link to="/collections">Collection</Link>
            <Link to="#">About</Link>
            <Link to="#">Contact</Link>
          </div>
        </div>

       
        <div className="flex items-center gap-4">
         
          <button
            onClick={() => setShowIn(!showIn)}
            className={ "flex items-center gap-2"}
          >
            <MdSearch size={24} />
          </button>
          
          {auth?.user ? (
          <div className="flex items-center gap-2 relative">
          <div className="relative flex items-center">
            <Link to='/cart' className="text-xl flex items-center justify-center">
              <FiShoppingCart size={18} />
            </Link>
            {/* Badge */}
            <span className="absolute -top-4 -right-1 bg-red-600 text-white text-xs font-bold px-1 py-1 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="text-base font-semibold"
          >
            <CgProfile />
          </button>
          <div
            className={`${
              showProfile
                ? "flex flex-col gap-2 absolute top-10 right-0 bg-white text-black p-2 rounded-md shadow-md"
                : "hidden"
            }`}
          >
            <ul>
              <li><Link to='/dashboard'>dashboard</Link></li>
              <li>order</li>
              <li>
                <button onClick={logout}>logout</button>
              </li>
            </ul>
          </div>
        </div>
        
          ) : (
            <Link to="/login" className="text-base font-semibold">
              <AiOutlineLogin size={24} />
            </Link>
          )}

        
          <div
            onClick={() => setTheme(dark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              dark ? `rotate-180` : `rotate-0`
            }`}
          >
            {dark ? (
              <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
              <Moon className="h-6 w-6 text-blue-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
