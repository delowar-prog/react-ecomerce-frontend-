import { Outlet } from "react-router-dom"
import Navber from "../Navber/Navber"

const Layout = () => {
  return (
    <div>
        <Navber></Navber>
        <Outlet></Outlet>
    </div>
  )
}

export default Layout