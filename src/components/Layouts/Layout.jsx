import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"

const Layout = ({children}) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
        <Navbar/>
       <div className="container mx-auto min-h-screen px-4 py-8">
        {children}
       </div>
    </div>
  )
}

export default Layout