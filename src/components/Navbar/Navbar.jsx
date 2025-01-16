import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import { MdSearch } from "react-icons/md";
import { Input } from '../ui/input';
import { MdOutlineCancel } from "react-icons/md";
import { FaSliders } from 'react-icons/fa6';
import { AuthContext } from '../../context';


const Navbar = () => {
    const {theme, setTheme} = useTheme();
    const [showIn, setShowIn] = useState(false);
    const {auth, logout} = useContext(AuthContext);
   console.log(auth,'auth');
    const dark = theme === "dark"
    return (
        <div className="sticky z-50 py-2 top-0 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto container flex justify-between items-center h-16 px-4 relative">
            {/* Left Section: Logo */}
            <Link to="/">
                <img src="/public/logo.png" className="h-16 w-16 rounded-full" alt="img" />
            </Link>
    
            {/* Middle Section: Navigation Links */}
            <div className="flex-1 flex justify-center items-center">
                <div className="flex gap-4 justify-between items-center text-base">
                    <Link to="#">Home</Link>
                    <Link to="#">Collection</Link>
                    <Link to="#">About</Link>
                    <Link to="#">Contact</Link>
                </div>
            </div>
    
            {/* Right Section: Search and Auth */}
            <div className="flex items-center gap-4 ">
                <div className={`${showIn?"flex items-center gap-2 relative":"hidden"}`} >
                    <Input type="text" placeholder="search" className="" />
                    <button className="flex items-center absolute right-2 top-1/2 -translate-y-1/2">
                        <MdSearch size={24} />
                    </button>
                </div>
                <button onClick={()=>setShowIn(true)} className={`${showIn?"hidden":"flex items-center gap-2"}`}>
                        <MdSearch  size={24} />
                    </button>
                    <button onClick={()=>setShowIn(false)} className={`${!showIn?"hidden":"flex items-center gap-2"}`}>
                        <MdOutlineCancel  size={24} />
                    </button>
                {auth?.user ? (
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard" className="text-base font-semibold">
                            <CgProfile />
                        </Link>
                        <button onClick={logout} className="text-base font-semibold">
                            Logout
                        </button>
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

export default Navbar