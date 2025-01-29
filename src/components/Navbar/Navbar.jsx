import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ghost, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import { MdSearch, MdOutlineCancel } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa"; 
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { showIn, setShowIn, auth, logout, cartCount } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dark = theme === "dark";

  const handleLogout = () => {
    logout();  
};
// useEffect(() => {
//   if (!auth?.user) {
//       navigate('/login'); // ✅ Navigates when user logs out
//   }
// }, [auth, navigate]);

  return (
    <div className="sticky z-50 py-2 top-0 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto container flex justify-between items-center h-16 px-4 relative">
        {/* Logo */}
        <h1 className="text-lg font-bold">Logo</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex gap-4 text-base">
            <Link to="/">Home</Link>
            <Link to="/collections">Collection</Link>
            <Link to="#">About</Link>
            <Link to="#">Contact</Link>
          </div>
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button onClick={() => setShowIn(!showIn)} className="flex items-center gap-2">
            <MdSearch size={24} />
          </button>

          {/* Cart Icon */}
          {auth?.user && (
            <div className="relative flex items-center">
              <Link to='/cart' className="text-xl flex items-center justify-center">
                <FiShoppingCart size={18} />
              </Link>
              <span className="absolute -top-4 -right-1 bg-red-600 text-white text-xs font-bold px-1 py-1 rounded-full">
                {cartCount}
              </span>
            </div>
          )}

          {/* Profile & Logout */}
          {auth?.user ? (
            <div className="hidden md:flex md:relative">
              <button onClick={() => setShowProfile(!showProfile)} className="text-base font-semibold">
                <CgProfile />
              </button>
              {/* Profile Dropdown */}
              <div className={`absolute top-10 right-0 bg-white text-black p-2 rounded-md shadow-md transition-transform transform ${showProfile ? "scale-100" : "scale-0"} origin-top-right`}>
                <ul className="flex flex-col gap-2">
                  <li onClick={()=>setShowProfile(false)}><Link to='/dashboard'>Dashboard</Link></li>
                  <li>Orders</li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-base font-semibold">
              <AiOutlineLogin size={24} />
            </Link>
          )}

          
          <div onClick={() => setTheme(dark ? "light" : "dark")} className="flex items-center cursor-pointer transition-transform duration-500">
            {dark ? <Sun className="h-6 w-6 text-yellow-300" /> : <Moon className="h-6 w-6 text-blue-300" />}
          </div>

          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-xl">
            {mobileMenuOpen ? <MdOutlineCancel size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden flex flex-col bg-background p-4 space-y-3 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "block" : "hidden"}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/collections" onClick={() => setMobileMenuOpen(false)}>Collection</Link>
        <Link to="#" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link to="#" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

      
        {auth?.user ? (
          <>
            <Link to='/dashboard' onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <button onClick={() => { logout(); setMobileMenuOpen(false); }}>Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
